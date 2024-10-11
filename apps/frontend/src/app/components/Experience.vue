<template>
  <section class="mb-6">
    <h2 class="text-2xl font-semibold mb-3 text-purple-600">Experience</h2>

    <!-- Total years of experience -->
    <div class="bg-gradient-to-br from-purple-600 to-purple-800 text-white p-6 rounded-lg shadow-lg mb-6 text-center">
      <h3 class="text-xl font-semibold mb-2">Total Years of Experience</h3>
      <div class="flex items-center justify-center">
        <p class="text-6xl font-bold">{{ getTotalYears().number }} {{ getTotalYears().text }}</p>
      </div>
    </div>

    <!-- Individual skill experience -->
    <h3 class="text-xl font-semibold mt-4 mb-2 text-purple-600">Skills Experience</h3>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <div v-for="(years, tech) in skillExperience" :key="tech"
        class="bg-white p-4 rounded-lg shadow-md border border-purple-200">
        <h4 class="text-lg font-semibold text-purple-600 mb-2">{{ formatTech(tech) }}</h4>
        <div class="flex items-center">
          <span class="material-icons mr-2 text-purple-500">timeline</span>
          <span class="text-2xl font-bold text-gray-700">{{ formatYears(years) }}</span>
        </div>
      </div>
    </div>


    <!-- Work experience -->
    <h3 class="text-xl font-semibold mt-4 mb-2 text-purple-600">Work History</h3>
    <ul class="space-y-2 mb-6">
      <li v-for="(item, index) in experience" :key="index" class="flex items-center bg-white p-3 rounded-lg shadow-sm">
        <span class="material-icons mr-3 text-purple-500">work</span>
        {{ item }}
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'Experience',
  props: {
    experience: Array,
    experienceYears: Object,
  },
  computed: {
    skillExperience() {
      const result = {};
      this.experienceYears.experience.forEach(item => {
        const [tech, years] = item.split(':').map(s => s.trim());
        if (tech.toLowerCase() !== 'total') {
          result[tech] = years;
        }
      });
      return result;
    }
  },
  methods: {
    getTotalYears() {
      const totalYears = this.experienceYears.experience.find(exp => exp.toLowerCase().includes('total'));
      if (totalYears) {
        const years = totalYears.split(':')[1].trim();
        return {
          number: years.split(' ')[0],
          text: 'Years'
        };
      }
      return { number: 'N/A', text: '' };
    },
    formatTech(tech) {
      return tech.charAt(0).toUpperCase() + tech.slice(1);
    },
    formatYears(years) {
      return years.includes('years') ? years : years + ' years';
    },
  },
};
</script>