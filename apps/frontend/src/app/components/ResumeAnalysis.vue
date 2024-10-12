<template>
  <div class="bg-slate-800 max-w-4xl mx-auto p-6 shadow-lg rounded-lg">
    <h1 class="text-4xl font-bold mb-6 text-purple-500">Candidate's Resume</h1>
    <Questions :questions="questions" />
    <Experience :resume="resume" :experience="experience['experience:']" />
    <Skills :skills="skills" />
    <ProfessionalSummary :summary="resume['- Professional Summary:']" />
    <Certificates :certificates="resume['- Certificates:']" />
    <ContactInfo :contact="resume['- Contact:']" />
    <Education :education="resume['- Education:']" />
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
