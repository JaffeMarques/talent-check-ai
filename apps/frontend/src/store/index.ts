import { createStore } from 'vuex';

export default createStore({
  state: {
    resume: {
      '- Contact:': [
        'Email: jaffemarquessilva@gmail.com',
        'Phone Number: 81989659700',
        'LinkedIn: https://www.linkedin.com/in/jaffe-marques/',
      ],
      '- Professional Summary:': [
        'Technology enthusiast and programmer',
        'Experience leading skilled teams...',
      ],
      '- Education:': ['PUC Minas (2023 - 2024) - Postgraduate...'],
      '- Certificates:': ['Google API Design and Fundamentals...'],
      '- Experience:': ['Movida Aluguel de Carros...'],
    },
    questions: ['Can you provide an example of a situation where...'],
    skills: ['PHP', 'JavaScript', 'Python'],
    experience: {
      experience: [
        'total: 10 years',
        'PHP: 9 years',
        'JavaScript: 7 years',
        'Python: 5 years',
      ],
    },
  },
  mutations: {},
  actions: {},
  getters: {},
});
