<template>
  <section class="mb-6">
    <h2 class="text-3xl font-semibold mb-5 text-purple-500">Skills</h2>
    <div class="flex flex-wrap gap-2">
      <span v-for="(skill, index) in skills" :key="index"
        class="px-3 py-1 bg-purple-800 hover:bg-purple-700 text-white rounded-full">
        {{ skill }}
      </span>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Skills',
  props: {
    skills: Array,
  },
};
</script>