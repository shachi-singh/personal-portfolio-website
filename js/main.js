/**
 * =======================================
 * PROJECT DATA
 * =======================================
 * This is the single source of truth for the project data.
 * It is an array of objects, where each object represents a project.
 */
// We declare 'projects' as a constant because the array itself will not be reassigned.
// We will, however, modify its contents in the next step by adding objects to it.
const projects = [  // This is a single project object.
  // Each key (e.g., 'title') is a string, followed by a colon,
  // and then its value. Commas separate each key-value pair.
  // A comma is required here to separate this object from the next one in the array.
  // Copy the structure above and fill it with your second project's details.
  {
    title: "4-bit Arithmetic Logic Unit (ALU) Simulator",
    description: "Built a 4-bit ALU in Verilog capable of performing addition, subtraction, bitwise AND, OR, and XOR operations selected via a 3-bit opcode",
    imageUrl: "./images/project_2.webp", // Make sure to add this image to your 'images' folder!
    liveUrl: "https://github.com/ShachiSingh1983/Arithmetic-Logic-Unit/blob/main/Waveforms.png", // Use "#" if there's no live link yet
    codeUrl: "https://github.com/ShachiSingh1983/Arithmetic-Logic-Unit/blob/main/alu_tb.v" // Replace with your repo link
  },
  // Another comma to separate this object from the next one.

  // Add as many projects as you like by following this pattern.
  {
    title: "Traffic Light Controller using Finite State Machine (FSM)",
    description: "Designed a Finite State Machine (FSM)-based traffic light controller in Verilog HDL with timed state transitions for Red,Yellow, and Green signals.",
    imageUrl: "./images/project_1.webp", // Make sure to add this image to your 'images' folder!
    liveUrl: "https://github.com/ShachiSingh1983/traffic-light-fsm-verilog/blob/main/Waveforms.png", // Use "#" if there's no live link yet
    codeUrl: "https://github.com/ShachiSingh1983/traffic-light-fsm-verilog/blob/main/traffic_light_tb.v" // Replace with your repo link
  },

  // Copy the structure above and fill it with your second project's details.
  {
    title: "Portfolio Project (This Website!)",
    description: "A responsive personal portfolio built from scratch using HTML, CSS, and vanilla JavaScript. Features a dynamic theme switcher and is populated by a JavaScript data structure.",
    imageUrl: "./images/project_4.webp", // Make sure to add this image to your 'images' folder!
    liveUrl: "https://6a1462e32cfcdb2ba0c15997--shachi-portfolio-project.netlify.app/", // Use "#" if there's no live link yet
    codeUrl: "https://github.com/ShachiSingh1983/personal-portfolio-website" // Replace with your repo link
  }
  // A "trailing comma" after the last object is valid in modern JavaScript
  // and is a good practice as it makes version control diffs cleaner.
];



// Select the theme toggle checkbox
const themeToggle = document.querySelector('#theme-toggle');

// Select the root <html> element of the document
const htmlElement = document.documentElement;

const projectsContainer = document.querySelector('.projects-container');

const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');

/**
 * =======================================
 * RENDER PROJECTS FUNCTION
 * =======================================
 * This function is responsible for rendering the project cards to the DOM.
 */
const renderProjects = () => {
  // 1. Create an empty string to hold all the generated HTML.
  let allProjectsHTML = '';


  // 2. We iterate over the 'projects' array.
  projects.forEach(project => {
    // We create the HTML for a single card.
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
          </div>
        </div>
      </div>
    `;
    
    // 3. Instead of logging, we append the card's HTML to our 'allProjectsHTML' string.
    allProjectsHTML += projectCardHTML;
  });

  // 4. After the loop has finished, we perform ONE update to the DOM.
  // This is far more efficient than updating the DOM in every loop iteration.
  projectsContainer.innerHTML = allProjectsHTML;

};


themeToggle.addEventListener('click', () => {
  // 1. Determine the new theme.
  const newTheme = themeToggle.checked ? 'dark' : 'light';

  // 2. Apply the new theme to the <html> element.
  htmlElement.setAttribute('data-theme', newTheme);

  // 3. Save the user's choice to localStorage.
  localStorage.setItem('theme', newTheme);
});

// ===================================
// APPLY THE SAVED THEME ON PAGE LOAD
// ===================================
// We use an Immediately Invoked Function Expression (IIFE) to run this code once on script load.
(() => {
  // 1. Check for a saved theme in localStorage.
  //    localStorage.getItem('theme') will return 'dark', 'light', or null.
  const savedTheme = localStorage.getItem('theme');

  // 2. If a saved theme exists, apply it.
  if (savedTheme) {
    // a. Apply the theme to the <html> element.
    htmlElement.setAttribute('data-theme', savedTheme);

    // b. Crucially, update the toggle switch's state to match the saved theme.
    //    If the saved theme is 'dark', we need to make sure the checkbox is checked.
    if (savedTheme === 'dark') {
      themeToggle.checked = true;
    }
    // No 'else' is needed because the checkbox is unchecked by default.
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  // When the DOM is ready, we call our function to render the projects.
  renderProjects();

  // Check if the contact form exists on the page before adding the listener.
  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      // 1. Prevent the default form submission behavior (the page redirect).
      event.preventDefault();

      // 2. Collect the form data using the FormData API.
      // This is a modern way to get all form fields.
      const formData = new FormData(contactForm);
      const submitButton = contactForm.querySelector('button[type="submit"]');

      // Provide immediate user feedback: show a "sending" state.
      formStatus.innerHTML = 'Sending...';
      formStatus.className = 'info'; // You could add an .info style for this
      formStatus.style.display = 'block';
      submitButton.disabled = true;

      // 3. Use the fetch API to send the data.
      fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        // We tell Formspree we want to receive a JSON response.
        headers: {
            'Accept': 'application/json'
        }
      }).then(response => {
        // 4. Handle the response from the server.
        if (response.ok) {
          // Success! Show the success message.
          formStatus.innerHTML = "Thank you! Your message has been sent.";
          formStatus.className = 'success';
          // Clear the form fields after a successful submission.
          contactForm.reset();
        } else {
          // The server responded with an error. Try to parse the error message.
          response.json().then(data => {
            if (Object.hasOwn(data, 'errors')) {
              // This is a validation error from Formspree.
              formStatus.innerHTML = data["errors"].map(error => error["message"]).join(", ");
            } else {
              // This is a generic server error.
              formStatus.innerHTML = "Oops! Something went wrong. Please try again later.";
            }
            formStatus.className = 'error';
          })
        }
      }).catch(error => {
        // 5. Handle network errors (e.g., user is offline).
        formStatus.innerHTML = "Oops! A network error occurred. Please check your connection and try again.";
        formStatus.className = 'error';
      }).finally(() => {
        // Re-enable the submit button regardless of success or failure.
        submitButton.disabled = false;
      });
    });
  }
});