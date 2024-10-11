<template>
  <section class="mb-6">
    <h2 class="text-2xl font-semibold mb-3 text-purple-600">Skills</h2>
    <div class="flex flex-wrap gap-2">
      <span v-for="(skill, index) in skills" :key="index" class="px-3 py-1 bg-purple-100 text-purple-700 rounded-full">
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