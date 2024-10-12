<template>
  <div class="bg-white max-w-4xl mx-auto p-8 shadow-lg rounded-lg">
    <h1 class="text-4xl font-bold mb-6 text-purple-500">Candidate's Resume</h1>
    <div class="flex flex-row gap-4">
      <div class="basis-2/3">
        <Questions :questions="questions" />
      </div>
      <div class="basis-1/3">
        <ContactInfo :contact="resume['- Contact:']" />
        <Education :education="resume['- Education:']" />
      </div>
    </div>
    <Experience :resume="resume" :experience="experience['experience:']" />
    <Skills :skills="skills" />
    <ProfessionalSummary :summary="resume['- Professional Summary:']" />
    <Certificates :certificates="resume['- Certificates:']" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Certificates from './Certificates.vue';
import ContactInfo from './ContactInfo.vue';
import Education from './Education.vue';
import Experience from './Experience.vue';
import ProfessionalSummary from './ProfessionalSummary.vue';
import Questions from './Questions.vue';
import Skills from './Skills.vue';

export default {
  name: 'ResumeAnalysis',
  components: {
    ContactInfo,
    ProfessionalSummary,
    Education,
    Certificates,
    Experience,
    Skills,
    Questions
  },
  computed: {
    ...mapState(['resume', 'questions', 'skills', 'experience']),
  }
}
</script>
