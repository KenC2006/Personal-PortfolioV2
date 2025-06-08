// Project card generator function
function createProjectCard(project, index) {
  const imageHtml = project.gifImage
    ? `
        <img src="${project.image}" alt="${project.title}" class="project-img static" loading="lazy">
        <img src="${project.gifImage}" alt="${project.title} animation" class="project-img gif" loading="lazy">
    `
    : `
        <img src="${project.image}" alt="${project.title}" class="project-img" loading="lazy">
    `;

  return `
    <div class="project-card" onclick="openModal('project', ${JSON.stringify(
      project
    ).replace(/"/g, "&quot;")})">
      <div class="project-content">
        <div class="project-header">
          <h3>${project.title}</h3>
          <span class="timeframe">${project.timeframe}</span>
        </div>
        <div class="project-tech">
          ${project.tech
            .map((tech) => `<span class="tech-tag">${tech}</span>`)
            .join("")}
        </div>
        <div class="project-preview">
          <p>${project.preview}</p>
        </div>
      </div>
      <div class="project-image-container">
        ${imageHtml}
      </div>
    </div>
  `;
}

// Experience card generator function
function createExperienceCard(experience, index) {
  return `
    <div class="experience-card" onclick="openModal('experience', ${JSON.stringify(
      experience
    ).replace(/"/g, "&quot;")})">
      <div class="experience-content">
        <div class="experience-header">
          <div class="company-logo">
            <img src="${experience.logoPath}" alt="${
    experience.companyName
  }" loading="lazy">
          </div>
          <div class="experience-title">
            <h3>${experience.title}</h3>
            <div class="company-name">${experience.companyName}</div>
            <span class="timeframe">${experience.timeframe}</span>
          </div>
        </div>
        <div class="experience-preview">
          <p>${experience.preview}</p>
        </div>
      </div>
    </div>
  `;
}

// Add new project/experience functions with simple fade
function addNewProject(project) {
  const projectGrid = document.querySelector("#projects");
  const projectCard = createProjectCard(project);
  projectGrid.insertAdjacentHTML("beforeend", projectCard);
}

function addNewExperience(experience) {
  const experienceGrid = document.querySelector("#experiences");
  const experienceCard = createExperienceCard(experience);
  experienceGrid.insertAdjacentHTML("beforeend", experienceCard);
}

// Tab switching function with smooth transitions
function showTab(tabName) {
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.remove("active");
  });
  document
    .querySelector(`button[onclick="showTab('${tabName}')"]`)
    .classList.add("active");

  document.querySelectorAll("section").forEach((section) => {
    section.classList.remove("active");
  });
  document.getElementById(tabName).classList.add("active");
}

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  const projectsContainer = document.getElementById("projects");
  const experiencesContainer = document.getElementById("experiences");

  projects.forEach((project, index) => {
    projectsContainer.innerHTML += createProjectCard(project, index);
  });

  experiences.forEach((experience, index) => {
    experiencesContainer.innerHTML += createExperienceCard(experience, index);
  });

  // Show projects tab by default
  showTab("projects");

  // Close modal when clicking outside
  document.getElementById("modal").addEventListener("click", (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      closeModal();
    }
  });

  // Close modal on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
    }
  });
});

// Initialize card effects
function initializeCardEffects() {
  document.addEventListener("mousemove", (e) => {
    const cards = document.querySelectorAll(".project-card, .experience-card");

    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x > 0 && x < rect.width && y > 0 && y < rect.height) {
        const xPercent = (x / rect.width - 0.5) * 20;
        const yPercent = (y / rect.height - 0.5) * 20;
        card.style.transform = `perspective(1000px) rotateY(${xPercent}deg) rotateX(${-yPercent}deg) translateZ(10px)`;
      } else {
        card.style.transform = "none";
      }
    });
  });
}

// Modal functionality
function openModal(type, data) {
  const modal = document.getElementById("modal");
  const modalBody = document.getElementById("modal-body");

  let content = "";

  if (type === "project") {
    content = `
      <h1 class="modal-title">${data.title}</h1>
      <div class="modal-subtitle">${data.timeframe}</div>
      <div class="modal-tech">
        ${data.tech
          .map((tech) => `<span class="tech-tag">${tech}</span>`)
          .join("")}
      </div>
      <div class="modal-content-section">
        ${data.details.map((detail) => `<p>${detail}</p>`).join("")}
      </div>
      ${
        data.github
          ? `
        <div class="modal-footer">
          <a href="${data.github}" class="modal-link" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
            View on GitHub
          </a>
        </div>
      `
          : ""
      }
    `;
  } else {
    content = `
      <div class="modal-company">
        <div class="modal-company-logo">
          <img src="${data.logoPath}" alt="${data.companyName}">
        </div>
        <div class="modal-company-info">
          <h2 class="modal-company-name">${data.companyName}</h2>
          <div class="modal-company-role">${data.title}</div>
        </div>
      </div>
      <div class="modal-subtitle">${data.timeframe}</div>
      <div class="modal-content-section">
        ${data.details.map((detail) => `<p>${detail}</p>`).join("")}
      </div>
    `;
  }

  modalBody.innerHTML = content;
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const modal = document.getElementById("modal");
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

// Initialize projects and experiences data
const projects = [
  {
    title: "Spooky Spikes AI",
    timeframe: "May 2025 - June 2025",
    preview: "AI that plays the Pummel Party spooky spikes minigame",
    details: [
      "Kept getting last place in the spooky spikes minigame from Pummel Party so I built a similar 3D environment with pygame to train an AI to play it for me. Tensorflow and Keras was used to simplify the reinforcement learning process. The AI learns through a deep-Q-network that checks player state, upcoming obstacles, and timing to determine jump/duck intervals. Training is set at 100,000 random experiences and 20,000 learning steps",
    ],
    image: "res/spookySpikes.png",
    gifImage: "res/spooky_spikesGIF.gif",
    tech: ["Python", "Tensorflow", "Keras"],
    github: "https://github.com/KenC2006/spooky-spikes-RL",
  },
  {
    title: "InScraper",
    timeframe: "Dec 2025",
    preview: "Instagram web scraper for follow analytics",
    details: [
      "Web scraper that collects data from Instagram follow counts. Uses Selenium for browser data collection and Javascript for table extension/HTML unravelling.",
    ],
    image: "res/instaLogo.jpg",
    tech: ["Python", "Javascript", "Selenium"],
    github: "https://github.com/KenC2006/instagram-scraper",
  },
  {
    title: "DeadKnight",
    timeframe: "Apr 2024 - June 2024",
    preview:
      "2D rogue-like that implements random map generation reactive hitboxes.",
    details: [
      "10,000+ lines of code and 30+ classes. Maps and asserts were drawn by a friend and game inspiration was taken from DeadCells and Hollow Knight. To see controls and additional details on a ton of game features, check out the GitHub.",
    ],
    image: "res/DeadKnight.png",
    tech: ["Java", "Swing", "Game Dev"],
    github: "https://github.com/KenC2006/DeadKnight",
  },
  {
    title: "Infinity Cube",
    timeframe: "June 2023 - July 2023",
    preview:
      "Infinity cube made using an ESP32 board and two-way reflective mirrors.",
    details: [
      "The cube frame is made from PLA black filament (maximum color contrast with LEDS) and the 3D print STL was designed in Fusion 360. Product video, STLs, and wiring schematics can be found on the Github.",
    ],
    image: "res/cube.png",
    tech: ["Arduino", "C++", "Fusion 360", "Soldering"],
    github: "https://github.com/KenC2006/Infinity-Cube",
  },
  {
    title: "Smash Blocks",
    timeframe: "June 2023 - July 2023",
    preview: "Super Smash Bros game with stun, damage, and combo mechanics.",
    details: [
      "This project was made over the summer to kill some time. Its the first time I worked on a relatively large OOP project and was a ton of fun to develop.",
    ],
    image: "res/smash.png",
    tech: ["Java", "Swing", "JavaFX", "Game Dev"],
    github: "https://github.com/KenC2006/SuperSmashBlocks",
  },
  {
    title: "RC Car",
    timeframe: "Apr 2022 - Mar 2022",
    preview: "Remote control car made with Arduino and bluetooth mobile app.",
    details: [
      "Parts included wires, a 12V battery cartridge, 4 DC motors, a HC-05 chip (bluetooth receiver), Arduino UNO, and L298N motor driver chip. The wires from the DC motors on each side were grouped together and connected to the corresponding ports on the dual motor driver chip. For Bluetooth control, I developed an app using MIT App Inventor to simplify pairing and communication. The app sent specific text commands when buttons were pressed, which the Arduino interpreted to control the motors accordingly. For a full document breakdown, visit the GitHub.",
    ],
    image: "res/car.png",
    tech: ["Arduino", "C++", "App Dev", "Soldering"],
    github: "https://github.com/KenC2006/RC_car",
  },
];

const experiences = [
  {
    logoPath: "res/tdLogo.png",
    title: "Software Engineering Intern",
    timeframe: "May 2025 - Aug 2025",
    companyName: "TD Bank",
    preview: "Working on applying AI to cloud security",
    details: ["More info coming soon."],
  },
  {
    logoPath: "res/OJ.png",
    title: "Backend Developer",
    timeframe: "Sept 2022 - Jun 2024",
    companyName: "Thornhill Secondary School",
    preview:
      "Developer for the Competitve coding site TSSOJ.ca with over 800 registered users.",
    details: [
      "Modelled off the open source site DMOJ.ca, TSSOJ.ca is an online judge for competitive programming. It hosts various contests with participants from over 3 schools monthly and is used to teach the computer science courses at Thornhill Secondary School. The site allows 30+ programming languages to be submitted and evaluated code using docker scripts. User data and profiles are stores in a mySQL database while problem creation is done using a Latex supported editor.",
      "As a developer, I created various coding problems testing knowledge on essential algorithms. I also maintained the backend, ensuring Django compatibility, the removal of deprecated API code, and upgraded dependencies.",
    ],
  },
];
