<script setup lang="ts">
import { ref } from 'vue'

const sections = ['Contact', 'Resume', 'Questions', 'Skills', 'Experience', 'Education', 'Certificates']

interface Experience {
  skill: string
  years: number
}

interface Education {
  degree: string
  institution: string
  year: number
}

interface Candidate {
  linkedin: string
  phone: string
  email: string
  summary: string
  jobFitPercentage: number
  suggestedQuestions: string[]
  skills: string[]
  totalYearsOfExperience: number
  experienceBreakdown: Experience[]
  education: Education[]
  certificates: string[]
}

const candidate = ref<Candidate>({
  linkedin: 'https://www.linkedin.com/in/johndoe',
  phone: '+1 (555) 123-4567',
  email: 'johndoe@example.com',
  summary: 'Experienced software developer with a strong background in web technologies and a passion for creating efficient, scalable applications.',
  jobFitPercentage: 85,
  suggestedQuestions: [
    'Can you describe a challenging project you worked on recently?',
    'How do you stay updated with the latest technologies?',
    'What\'s your experience with agile development methodologies?'
  ],
  skills: ['JavaScript', 'Vue.js', 'Node.js', 'Python', 'SQL', 'Git', 'AWS'],
  totalYearsOfExperience: 7,
  experienceBreakdown: [
    { skill: 'JavaScript', years: 7 },
    { skill: 'Vue.js', years: 4 },
    { skill: 'Node.js', years: 5 },
    { skill: 'Python', years: 3 }
  ],
  education: [
    { degree: 'Master of Science in Computer Science', institution: 'Tech University', year: 2018 },
    { degree: 'Bachelor of Science in Software Engineering', institution: 'State University', year: 2015 }
  ],
  certificates: [
    'AWS Certified Developer - Associate',
    'Certified Scrum Master',
    'Google Analytics Individual Qualification'
  ]
})
</script>

<template>
  <div class="resume-analysis">
    <header>
      <h1>Resume Analysis</h1>
    </header>
    <nav>
      <ul>
        <li v-for="section in sections" :key="section">
          <a :href="`#${section.toLowerCase()}`">
            {{ section }}
          </a>
        </li>
      </ul>
    </nav>
    <main>
      <section id="contact" class="section">
        <h2>Contact</h2>
        <div class="contact-info">
          <p>
            <a :href="candidate.linkedin" target="_blank" rel="noopener noreferrer">
              LinkedIn Profile
            </a>
          </p>
          <p>
            {{ candidate.phone }}
          </p>
          <p>
            <a :href="`mailto:${candidate.email}`">{{ candidate.email }}</a>
          </p>
        </div>
      </section>

      <section id="resume" class="section">
        <h2>Resume</h2>
        <p>{{ candidate.summary }}</p>
        <div class="job-fit">
          <h3>Job Fit</h3>
          <div class="progress-bar">
            <div class="progress" :style="{ width: `${candidate.jobFitPercentage}%` }"></div>
          </div>
          <p>{{ candidate.jobFitPercentage }}% match for the position</p>
        </div>
      </section>

      <section id="questions" class="section">
        <h2>Suggested Questions</h2>
        <ul>
          <li v-for="(question, index) in candidate.suggestedQuestions" :key="index">
            {{ question }}
          </li>
        </ul>
      </section>

      <section id="skills" class="section">
        <h2>Skills</h2>
        <div class="skills-grid">
          <div v-for="skill in candidate.skills" :key="skill" class="skill-tag">
            {{ skill }}
          </div>
        </div>
      </section>

      <section id="experience" class="section">
        <h2>Experience</h2>
        <div class="experience-summary">
          <div class="total-experience">
            <h3>Total Years of Experience</h3>
            <p class="years">{{ candidate.totalYearsOfExperience }}</p>
          </div>
        </div>
        <div class="experience-breakdown">
          <div v-for="exp in candidate.experienceBreakdown" :key="exp.skill" class="experience-item">
            <h4>{{ exp.skill }}</h4>
            <p>{{ exp.years }} {{ exp.years === 1 ? 'year' : 'years' }}</p>
          </div>
        </div>
      </section>

      <section id="education" class="section">
        <h2>Education</h2>
        <ul class="timeline">
          <li v-for="edu in candidate.education" :key="edu.degree">
            <div class="timeline-content">
              <h3>{{ edu.degree }}</h3>
              <p>{{ edu.institution }}</p>
              <p class="date">{{ edu.year }}</p>
            </div>
          </li>
        </ul>
      </section>

      <section id="certificates" class="section">
        <h2>Certificates</h2>
        <ul>
          <li v-for="cert in candidate.certificates" :key="cert">{{ cert }}</li>
        </ul>
      </section>
    </main>
  </div>
</template>

<style scoped>
:root {
  --color-primary: #3498db;
  --color-primary-dark: #2980b9;
  --color-background: #ffffff;
  --color-text: #333333;
  --color-text-light: #666666;
  --color-border: #e0e0e0;
}

.resume-analysis {
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  color: var(--color-text);
  background-color: var(--color-background);
}

header h1 {
  font-size: 2.5rem;
  color: var(--color-primary);
  text-align: center;
  margin-bottom: 2rem;
}

nav ul {
  display: flex;
  justify-content: center;
  list-style-type: none;
  padding: 0;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

nav li {
  margin: 0.5rem;
}

nav a {
  text-decoration: none;
  color: var(--color-primary);
  font-weight: bold;
  transition: color 0.3s ease;
}

nav a:hover {
  color: var(--color-primary-dark);
}

.section {
  margin-bottom: 3rem;
}

.section h2 {
  font-size: 1.8rem;
  color: var(--color-primary);
  border-bottom: 2px solid var(--color-primary);
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.contact-info p {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.contact-info a {
  color: var(--color-primary);
  text-decoration: none;
}

.contact-info a:hover {
  text-decoration: underline;
}

.job-fit {
  margin-top: 1rem;
}

.progress-bar {
  background-color: var(--color-border);
  border-radius: 10px;
  height: 20px;
  overflow: hidden;
}

.progress {
  background-color: var(--color-primary);
  height: 100%;
  transition: width 0.5s ease-in-out;
}

.skills-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-tag {
  background-color: var(--color-primary);
  color: var(--color-background);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
}

.experience-summary {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.total-experience {
  text-align: center;
  background-color: var(--color-primary);
  color: var(--color-background);
  padding: 1rem;
  border-radius: 10px;
}

.total-experience h3 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.total-experience .years {
  font-size: 2.5rem;
  font-weight: bold;
}

.experience-breakdown {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.experience-item {
  background-color: var(--color-border);
  padding: 1rem;
  border-radius: 5px;
  text-align: center;
}

.experience-item h4 {
  margin-bottom: 0.5rem;
  color: var(--color-primary);
}

.timeline {
  list-style-type: none;
  padding: 0;
  position: relative;
}

.timeline::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 2px;
  background-color: var(--color-primary);
}

.timeline li {
  margin-bottom: 1.5rem;
  padding-left: 2rem;
  position: relative;
}

.timeline li::before {
  content: '';
  position: absolute;
  left: -6px;
  top: 0;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: var(--color-primary);
}

.timeline-content {
  background-color: var(--color-border);
  padding: 1rem;
  border-radius: 5px;
}

.timeline-content h3 {
  margin-bottom: 0.5rem;
  color: var(--color-primary);
}

.timeline-content .date {
  font-style: italic;
  color: var(--color-text-light);
}

@media (max-width: 768px) {
  .resume-analysis {
    padding: 1rem;
  }

  nav ul {
    flex-direction: column;
    align-items: center;
  }

  .experience-breakdown {
    grid-template-columns: 1fr;
  }
}
</style>