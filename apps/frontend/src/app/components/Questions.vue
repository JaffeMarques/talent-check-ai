<template>
  <section class="mb-6">
    <h2 class="text-2xl font-semibold mb-7 text-purple-600">Interview Questions</h2>
    <ol class="list-decimal list-inside space-y-5">
      <li v-for="(question, index) in questions" :key="index"
        class="border border-purple-500 bg-gray-800 hover:bg-purple-700 p-5 rounded-lg shadow-lg text-white">
        {{ question }}
      </li>
    </ol>
  </section>
</template>

<script>
export default {
  name: 'Questions',
  props: {
    questions: Array,
  },
};
</script>