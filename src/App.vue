<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue';
import SearchDropDrown from './components/SearchDropDown.vue'
import SearchInput from './components/SearchInput.vue'
import { onMounted, ref, type Ref } from 'vue';
import axios from 'axios'
import { db } from './stores/store'
const type = ref('series')
const selectedGenre = ref("action")
const apiKey = import.meta.env.VITE_APP_API_KEY
const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&s=movie`
const list: Ref<any[]> = ref([])
const title = ref("")
const year = ref("")
const Poster = ref("")
async function getList() {
  try {
    const response = await axios.get(`${apiUrl}`);
    list.value = response.data.Search

    for (let i = 0; i < list.value.length; i++) {
      const element = list.value[i];

      // store in dexie 
      // movies list 

      const id = await db.movies.add({
        Title: element.Title,
        Type: element.Type,
        Poster: element.Poster,
        imdbID: element.imdbID,
        Year: element.Year
      })

    }
  } catch (error) {
    console.error(error);
  }
}

async function searchMovie(p: string) {
  try {
    p = type.value
    const response = await axios.get(`https://www.omdbapi.com/?apikey=${apiKey}&s=${p}`);
    list.value = response.data.Search
  } catch (error) {
    console.error(error);
  }
}

async function searchByGenre(p: string) {
  try {
    p = selectedGenre.value
    const response = await axios.get(`https://www.omdbapi.com/?apikey=${apiKey}&s=${p}`);
    list.value = response.data.Search
  } catch (error) {
    console.error(error);
  }
}

// filter by title

async function filterByTitleAndYear(t: string, y: string) {
  try {
    t = title.value
    y = year.value
    const response = await axios.get(`https://www.omdbapi.com/?apikey=${apiKey}&t=${t}&y=${y}&plot=short`);
    list.value = response.data
    Poster.value = response.data.Poster
    // get the movie poster
  } catch (error) {
    console.error(error);
  }
}


onMounted( async () => {
  await getList()
})
const data = ref(null)
// const error = ref(null)
// fetch(`${apiUrl}`)
//     .then((res) => res.json())
//     .then((json) => (data.value = json))
//     .catch((err) => (error.value = err))
</script>

<template>
  <main class=" flex flex-col justify-center items-center gap-4 max-w-full  max-lg:m-4">
    <Header></Header>
    <!-- search for the movie -->
    <!-- <input class=" border-black border" type="text" v-model="type"> -->

    <div
      class="flex gap-4 justify-evenly flex-wrap items-center py-4 max-lg:flex-col max-md:max-w-full  max-lg:items-start ">
      <!-- search for a specific movie -->
      <SearchInput v-model="type" type="text" placeholder="search" class="text-black w-[40%]">
        <button class="bg-orange-500 px-2 text-white border-none rounded-md" @click="searchMovie(type)">Search</button>
      </SearchInput>

      <!-- <SearchDropDrown /> -->
      <!-- select movie genre  -->
      <section class="flex gap-4 border border-black rounded-xl p-2 w-[40%] justify-between max-lg:w-full ">
        <span>Select genre</span>
        <select v-model="selectedGenre" @click="searchByGenre(selectedGenre)" class="outline-none bg-none">
          <option>action</option>
          <option>Comedy</option>
          <option>Drama</option>
        </select>
      </section>
      <!-- filter movies -->
      <div class=" border w-[88%] justify-between border-black rounded-xl p-2 flex gap-2 max-md:w-full max-lg:flex-col">
        <div class="max-lg:flex flex-col">
          <label class="mx-4"> Filter by Title</label>
          <input type="text" v-model="title" class="outline-none">
        </div>
        <div class="max-lg:flex flex-col">
          <label class=" mx-4">Year</label>
          <input type="text" v-model="year" class="outline-none">
        </div>

        <button class=" bg-orange-500 px-2 text-white border-none rounded-md"
          @click="filterByTitleAndYear(title, year)">find</button>
      </div>

    </div>

    <div class="w-full flex gap-4 flex-wrap justify-evenly">

      <div class=" flex flex-col justify-center items-center gap-4" v-for="series in list" :key="series.imdID">
        <div class="flex gap-2">
          <p class="">{{ series.Title }}</p>
          <span>{{ series.Year }}</span>
        </div>

        <img :src="series.Poster" alt="" class="w-52 max-lg:w-68">
      </div>
      <img v-if="Poster" :src="Poster" alt="loading" class=" absolute left-2">
    </div>
  </main>
</template>

<style scoped></style>
