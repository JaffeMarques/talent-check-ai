<template>
  <section class="mb-6">
    <h2 class="text-2xl font-semibold mb-3 text-purple-600">Interview Questions</h2>
    <ol class="list-decimal list-inside space-y-2">
      <li v-for="(question, index) in questions" :key="index" class="text-gray-700">
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