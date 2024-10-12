<template>
  <section class="mb-6">
    <h2 class="text-2xl font-semibold mb-3 text-purple-600">Contact Information</h2>
    <ul class="space-y-2">
      <li v-for="(item, index) in contact" :key="index" class="flex items-center text-white">
        {{ item }}
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'ContactInfo',
  props: {
    contact: Array,
  },
  methods: {
    getIcon(item) {
      if (item.includes('Email')) return 'Email';
      if (item.includes('Phone')) return 'Phone';
      if (item.includes('LinkedIn')) return 'Link';
      return 'info';
    },
  },
};
</script>