const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('header nav');

menuToggle.addEventListener('click', () => {
  nav.classList.toggle('nav-open');
  menuToggle.setAttribute('aria-expanded', nav.classList.contains('nav-open'));
});
const projects = 
  {
    title: "4-bit Arithmetic Logic Unit (ALU) Simulator",
    description: "Built a 4-bit ALU in Verilog capable of performing addition, subtraction, bitwise AND, OR, and XOR operations selected via a 3-bit opcode",
    imageUrl: "./images/project_2.webp", 
    liveUrl: "https://github.com/shachi-singh/Arithmetic-Logic-Unit/blob/main/Waveforms.png", 
    codeUrl: "https://github.com/ShachiSingh1983/Arithmetic-Logic-Unit",
    livelabel: "View Waveform"
  },
  {
    title: "Traffic Light Controller using Finite State Machine (FSM)",
    description: "Designed a Finite State Machine (FSM)-based traffic light controller in Verilog HDL with timed state transitions for Red,Yellow, and Green signals.",
    imageUrl: "./images/project_1.webp",
    liveUrl: "https://github.com/shachi-singh/traffic-light-fsm-verilog/blob/main/Waveforms.png",
    codeUrl: "https://github.com/shachi-singh/traffic-light-fsm-verilog",
    livelabel: "View Waveform"
  },

  {
    title: "Portfolio Project (This Website!)",
    description: "A responsive personal portfolio built from scratch using HTML, CSS, and vanilla JavaScript. Features a dynamic theme switcher and is populated by a JavaScript data structure.",
    imageUrl: "./images/project_4.webp", 
    liveUrl: "https://shachi-portfolio-project.netlify.app", 
    codeUrl: "https://github.com/shachi-singh/personal-portfolio-website" 
  },
  {
  title: "Grade Tracker App",
  description: "A responsive web application for tracking academic grades and calculating GPAs. Built with HTML, CSS, and JavaScript with persistent data storage using localStorage.",
  imageUrl: "./images/project_3.webp", // You'll need to screenshot this
  liveUrl: "https://grade-tracker-delta.vercel.app/",
  liveLabel: "View App",
  codeUrl: "https://github.com/shachi-singh/grade-tracker" // Replace with your actual repo
}
];


const themeToggle = document.querySelector('#theme-toggle');

const htmlElement = document.documentElement;

const projectsContainer = document.querySelector('.projects-container');

const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');

const renderProjects = () => {
  let allProjectsHTML = '';

  projects.forEach(project => {
    const projectCardHTML = `
      <div class="project-card">
        <div class="project-image-container">
            <img 
              src="${project.imageUrl}" 
              alt="Screenshot of the ${project.title} project" 
              class="project-image"
            >
        </div>
        <div class="project-info">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <div class="project-links">
            <a 
              href="${project.liveUrl}" 
              class="btn" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Live Demo
            </a>
            <a 
              href="${project.codeUrl}" 
              class="btn btn-secondary" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              View Code
            </a>

            <a href="${project.liveUrl}" 
            class="btn" 
            target="_blank">
            ${project.liveLabel || "Live Demo"}
            </a>
            
          </div>
        </div>
      </div>
    `;
    
    allProjectsHTML += projectCardHTML;
  });

  projectsContainer.innerHTML = allProjectsHTML;

};

themeToggle.addEventListener('click', () => {
  const newTheme = themeToggle.checked ? 'dark' : 'light';
  htmlElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
    if (savedTheme === 'dark') {
      themeToggle.checked = true;
    }
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  renderProjects();
  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {

      event.preventDefault();
      const formData = new FormData(contactForm);
      const submitButton = contactForm.querySelector('button[type="submit"]');
      formStatus.innerHTML = 'Sending...';
      formStatus.className = 'info';
      formStatus.style.display = 'block';
      submitButton.disabled = true;


      fetch(contactForm.action, {
        method: 'POST',
        body: formData,

        headers: {
            'Accept': 'application/json'
        }
      }).then(response => {

        if (response.ok) {

          formStatus.innerHTML = "Thank you! Your message has been sent.";
          formStatus.className = 'success';

          contactForm.reset();
        } else {

          response.json().then(data => {
            if (Object.hasOwn(data, 'errors')) {
              formStatus.innerHTML = data["errors"].map(error => error["message"]).join(", ");
            } else {
              formStatus.innerHTML = "Oops! Something went wrong. Please try again later.";
            }
            formStatus.className = 'error';
          })
        }
      }).catch(error => {
        formStatus.innerHTML = "Oops! A network error occurred. Please check your connection and try again.";
        formStatus.className = 'error';
      }).finally(() => {
        submitButton.disabled = false;
      });
    });
  }
});
