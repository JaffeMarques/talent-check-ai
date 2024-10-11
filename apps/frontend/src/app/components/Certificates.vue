<template>
  <section class="mb-6">
    <h2 class="text-2xl font-semibold mb-3 text-purple-600">Certificates</h2>
    <ul class="space-y-2">
      <li v-for="(item, index) in certificates" :key="index" class="flex items-center">
        <span class="material-icons mr-2 text-purple-500">verified</span>
        {{ item }}
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'Certificates',
  props: {
    certificates: Array,
  },
};
</script>