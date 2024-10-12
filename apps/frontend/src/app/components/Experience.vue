<template>
  <section class="mb-6 text-gray-300">
    <h2 class="text-3xl font-semibold mb-5 text-purple-500">Experience</h2>
    <div class="bg-gradient-to-br from-purple-800 to-purple-900 p-6 rounded-lg shadow-lg mb-6 text-center">
      <h3 class="text-xl font-semibold mb-2 text-purple-200">Total Years of Experience</h3>
      <div class="flex items-center justify-center">
        <p class="text-8xl font-bold text-white">{{ getTotalYears().number }} {{ getTotalYears().text }}</p>
      </div>
      <br>
    </div>

    <!-- Individual skill experience -->
    <h3 class="text-3xl font-semibold mt-6 mb-5 text-purple-500">Skills Experience</h3>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <div v-for="(years, tech) in skillExperience" :key="tech"
        class="bg-gray-800 p-4 rounded-lg shadow-md border hover:bg-purple-700 border-purple-700">
        <h4 class="text-lg font-semibold text-purple-300 mb-2">
          {{ formatTech(tech) }}:
          <span class="text-1xl font-bold text-gray-300">{{ formatYears(years) }}</span>
        </h4>
      </div>
    </div>

    <!-- Work experience timeline -->
    <h3 class="text-3xl font-semibold mt-8 mb-4 text-purple-500">Work History</h3>
    <div class="space-y-4">
      <div v-for="(job, index) in workExperience" :key="index" class="relative pl-8 pb-4">
        <div class="absolute left-0 top-0 h-full w-0.5 bg-purple-600"></div>
        <div class="absolute left-0 top-2 w-4 h-4 rounded-full bg-purple-600 border-2 border-purple-300"></div>
        <div class="bg-gray-700 hover:bg-purple-700 p-4 rounded-lg shadow-md">
          <h4 class="text-lg font-semibold text-purple-200">{{ job.company }}</h4>
          <p class="text-sm text-gray-100">{{ job.duration }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Experience',
  props: {
    resume: Object,
    experience: Object,
  },
  computed: {
    workExperience() {
      return this.resume['- Experience:'].map(exp => {
        const tmp = exp.split(') -');
        const tmp2 = tmp[0].split(' (');

        const company = tmp2[0];
        const duration = tmp2[1];
        return { company, duration };
      }).reverse();
    },
    skillExperience() {
      const result = {};
      this.experience.forEach(item => {
        const [tech, years] = item.split(':').map(s => s.trim());
        if (tech.toLowerCase() !== 'total' && years !== '0 years') {
          result[tech] = years;
        }
      });
      return result;
    }
  },
  methods: {
    getTotalYears() {
      const totalYears = this.experience.find(exp => exp.toLowerCase().includes('total'));
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