<template>
  <div class="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
    <h1 class="text-3xl font-bold mb-6 text-purple-700">Candidate's Resume</h1>
    <ContactInfo :contact="resume['- Contact:']" />
    <ProfessionalSummary :summary="resume['- Professional Summary:']" />
    <Education :education="resume['- Education:']" />
    <Certificates :certificates="resume['- Certificates:']" />
    <Experience :experience="resume['- Experience:']" :experienceYears="experience" />
    <Skills :skills="skills" />
    <Questions :questions="questions" />
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
