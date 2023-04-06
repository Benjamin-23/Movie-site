<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue';
import SearchDropDrown from './components/SearchDropDown.vue'
import SearchInput from './components/SearchInput.vue'
import { onMounted, ref, type Ref } from 'vue';
import axios from 'axios'
const type = ref('series')
const selectedGenre = ref("action")
const apiKey = import.meta.env.VITE_APP_API_KEY
const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&s=movie`
const list: Ref<any[]> = ref([])


async function getList() {
  try {
    const response = await axios.get(`${apiUrl}`);
    console.log(response.data.Search);
    
    list.value = response.data.Search
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

async function searchByGenre(p:string) { 
  try {
    p = selectedGenre.value
    const response = await axios.get(`https://www.omdbapi.com/?apikey=${apiKey}&s=${p}`);
    list.value = response.data.Search
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
  <main class="flex flex-col  w-screen justify-center items-center gap-4">
    <Header></Header>
    <!-- search for the movie -->
    <!-- <input class=" border-black border" type="text" v-model="type"> -->
       
    <div class="flex gap-4 justify-center items-center bg-slate-100 w-full py-4">
      <SearchInput  v-model="type" type="text" placeholder="search" class="text-black">
        <button @click="searchMovie(type)">Search</button>
      </SearchInput>
    
      <!-- <SearchDropDrown /> -->
      <section class="flex gap-4 border border-black rounded-xl p-2" >  
        <span>Select genre by</span>
        <select v-model="selectedGenre" @click="searchByGenre(selectedGenre)" >
            <option >action</option>
            <option >Comedy</option>
            <option >Drama</option>
        </select>
    </section>

    </div>

    <div class="w-full flex gap-4 flex-wrap justify-evenly">

      <div class=" flex flex-col justify-center items-center gap-4" v-for="series in list" :key="series.imdID">
        <div class="flex gap-2">
          <p class="">{{ series.Title }}</p>
          <span>{{ series.Year }}</span>
        </div>

        <img :src="series.Poster" alt="" class="w-64">
      </div>

    </div>
  </main>
</template>

<style scoped></style>
