<template>
  <section class="mb-6">
    <h2 class="text-2xl font-semibold mb-3 text-purple-600">Education</h2>
    <ul class="space-y-2">
      <li v-for="(item, index) in education" :key="index" class="flex items-center text-white">
        {{ item }}
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'Education',
  props: {
    education: Array,
  },
};
</script>