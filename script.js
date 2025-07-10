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

document.addEventListener("DOMContentLoaded", () => {
  const projectsContainer = document.getElementById("projects");
  const experiencesContainer = document.getElementById("experiences");

  projects.forEach((project, index) => {
    projectsContainer.innerHTML += createProjectCard(project, index);
  });

  experiences.forEach((experience, index) => {
    experiencesContainer.innerHTML += createExperienceCard(experience, index);
  });

  showTab("projects");

  document.getElementById("modal").addEventListener("click", (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
    }
  });
});

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
        ${data.details
          .map((detail) => {
            const formattedDetail = detail
              .split("\n\n")
              .map((paragraph) => {
                return paragraph.replace(/\*(.*?)\*/g, "<em>$1</em>");
              })
              .join("</p><p>");
            return `<p>${formattedDetail}</p>`;
          })
          .join("")}
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

const projects = [
  // {
  //   image: "res/stocker.png",
  //   title: "Stocker",
  //   timeframe: "Jan 2025 - Present",
  //   tech: ["React", "Node.js", "Firebase", "Cloud"],
  //   preview:
  //     "Real-time stock trading simulator with leaderboard for <a href='https://stockerstorage.web.app/' target='_blank' rel='noopener noreferrer' style='color: #50c878; text-decoration: underline;'>UofT students</a>",
  //   details: [
  //     "Stocker is a responsive web application that allows users to track and simulate stock portfolios in real-time with a profit leaderboard to compete against friends. Stocker uses the Finnhub API to pull stock data and deploys cloud scripts and backend data to firebase. The front end is created with React while backend scripting was done with node.js.",
  //   ],
  //   github: "https://github.com/KenC2006/stocker",
  // },

  {
    title: "Spooky Spikes AI",
    timeframe: "May 2025 - June 2025",
    preview:
      "Reinforcement learning AI that jumps and ducks under 3D moving bars accurately.",
    details: [
      "*Inspired by the Spooky Spikes Minigame from Pummel Party*\n\nUsing TensorFlow and Keras, I implementation a streamlined reinforcement learning pipeline. The AI is trained using a Deep Q-Network (DQN) that considers the player’s current state, the position of upcoming obstacles, and timing. The training process includes a replay buffer with 100,000 randomly sampled experiences, from which the model learns over 20,000 gradient update steps. The learning was stabilized through extensive tuning of hyperparameters, including epsilon decay rates, network architecture, and node density. Various configurations were tested to find the most stable and efficient setup for consistent learning performance.",
    ],
    image: "res/spookySpikes.png",
    gifImage: "res/spooky_spikesGIF.gif",
    tech: ["Python", "Tensorflow", "Keras"],
    github: "https://github.com/KenC2006/spooky-spikes-RL",
  },
  {
    title: "ModelShift",
    timeframe: "Dec 2024 - Mar 2025",
    preview:
      "AI comparison tool for multi-model prompting and reponse analysis.",
    details: [
      "ModelShift allows users to send the same prompt to multiple AI providers (ChatGPT, Gemini, Claude, etc) and view responses side-by-side in real-time. The application supports a React/Tailwind CSS frontend, dark-light theme styling, and responsive design. The backend is built with Node.js and Express, implementing secure API key management with encryption, rate limiting, and abuse detection. Users can customize system prompts, adjust model temperature and token limits, and export comparison results. The application includes Firebase integration for authentication and data storage, with features like API key usage statistics, multiple provider support, and markdown rendering for AI.",
    ],
    image: "res/modelshift.png",
    tech: ["React", "Node.js", "Crypto"],
    github: "https://github.com/KenC2006/modelShift",
  },
  {
    title: "DeadKnight",
    timeframe: "Apr 2024 - June 2024",
    preview:
      "2D roguevania with random map gen, reactive hitboxes and smart enemy AI.",
    details: [
      "DeadKnight features a combat system with both melee and ranged weapons, including swords, spears, and various projectile-based weapons. Players navigate through procedurally generated rooms across different biomes, facing increasingly challenging enemies and boss battles. The combat mechanics include a fluid movement system with jumping, dashing, and strategic weapon switching. A dungeon room generation system is used to create unique maps each playthrough, and enemies use an intelligent enemy AI (smart path finding and attack patterns) to keep the game interesting. Additional features include a dynamic camera system with minimap functionality, inventory system for weapon management, and a stats system that allows for character upgrades.",
    ],
    image: "res/DeadKnight.png",
    tech: ["Java", "Swing", "Game Dev"],
    github: "https://github.com/KenC2006/DeadKnight",
  },
  {
    title: "Hyper Cube",
    timeframe: "June 2023 - July 2023",
    preview:
      "Hyper cube built using an ESP32 board and two-way reflective mirrors.",
    details: [
      "Designed a 3D-printed cube with addressable LED strips and two-way mirrors to create a hypercube light illusion. Powered by an ESP32 running WLED, it supports dynamic effects, brightness control, and pattern switching. 3D print STL's, wiring diagrams, and more can be found on the GIthub.",
    ],
    image: "res/cube.png",
    tech: ["Arduino", "C++", "Fusion 360", "Soldering"],
    github: "https://github.com/KenC2006/Infinity-Cube",
  },
  {
    title: "Smash Blocks",
    timeframe: "June 2023 - July 2023",
    preview: "2 player fighter with knockback, damage, and combo mechanics.",
    details: [
      "Programmed in Java using Swing and AWT, Smash Blocks features two-player combat, multi-threaded dynammic movement, and fully customizable controls that allow players to re-map keybinds. The game implements platform collision detection, dynamic menus, animated UI, and knockback applification. Additionally, players can perform different attack types, and combo chain. Overall, it was designed with an event-driven architecture and object-oriented principles.",
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
      "Parts included wires, a 12V battery cartridge, 4 DC motors, a HC-05 chip (bluetooth receiver), Arduino UNO, and L298N motor driver chip. The wires from the DC motors on each side were grouped together and connected to the corresponding ports on the dual motor driver chip. For Bluetooth control, I developed an app using MIT App Inventor to simplify pairing and communication. The app sent text commands when buttons were pressed, which the Arduino interpreted to control the motors accordingly. For a full document breakdown, visit the GitHub.",
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
