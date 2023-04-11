<script setup lang="ts">
defineProps({
    type: String,
    placeholder: String,
    modelValue: String,
})
const emits = defineEmits(["update:modelValue"])

const updateModel = (event: Event) => {
    const target = event.target as HTMLInputElement
    emits("update:modelValue", target.value)
}

</script>

<template>
    <div class="flex gap-4  border-black border rounded-xl p-2 w-[80%] justify-between max-lg:w-full">
        <img src="@/assets/search.svg" alt="loading">
        <input class=" outline-none max-lg:w-4/5 text-gray-400 px-4" 
         :type="type"
         @input="updateModel($event)"
         :placeholder="placeholder"
         :value="modelValue">
         <slot></slot>
    </div>

</template>