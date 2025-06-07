// Project card generator function
function createProjectCard(project) {
  const imageHtml = project.gifImage
    ? `
        <img
          src="${project.staticImage}"
          alt="${project.title}"
          class="project-img static"
        />
        <img
          src="${project.gifImage}"
          alt="${project.title} animation"
          class="project-img gif"
        />
    `
    : `
        <img
          src="${project.imagePath}"
          alt="${project.title}"
          class="project-img"
        />
    `;

  return `
    <div class="project-card">
      <div class="project-image-container">
        ${imageHtml}
      </div>
      <div class="project-content">
        <div class="project-header">
          <h3>${project.title}</h3>
          <span class="timeframe">${project.timeframe}</span>
        </div>
        <div class="project-tech">
          ${project.technologies
            .map(
              (tech) => `
            <span class="tech-tag ${tech.type}">${tech.name}</span>
          `
            )
            .join("")}
        </div>
        <div class="project-preview">
          <p>${project.preview}</p>
        </div>
        <div class="project-details">
          ${project.details.map((detail) => `<p>${detail}</p>`).join("")}
        </div>
        ${
          project.githubUrl
            ? `
          <div class="github-link">
            <a
              href="${project.githubUrl}"
              target="_blank"
              rel="noopener noreferrer"
              class="github-btn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                style="margin-right: 5px"
              >
                <path
                  d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
                ></path>
              </svg>
              View on GitHub
            </a>
          </div>
        `
            : ""
        }
      </div>
    </div>
  `;
}

// Experience card generator function
function createExperienceCard(experience) {
  return `
    <div class="experience-card">
      <div class="experience-header">
        <div class="company-logo">
          <img src="${experience.logoPath}" alt="${experience.companyName}" />
        </div>
        <div class="experience-title">
          <div class="title-date-row">
            <h3>${experience.title}</h3>
            <span class="timeframe">${experience.timeframe}</span>
          </div>
          <p class="company-name">${experience.companyName}</p>
        </div>
      </div>
      <div class="experience-preview">
        <p>${experience.preview}</p>
      </div>
      <div class="experience-details">
        ${experience.details.map((detail) => `<p>${detail}</p>`).join("")}
      </div>
    </div>
  `;
}

// Add new project/experience functions
function addNewProject(project) {
  const projectGrid = document.querySelector("#projects .project-grid");
  const projectCard = createProjectCard(project);
  projectGrid.insertAdjacentHTML("beforeend", projectCard);
}

function addNewExperience(experience) {
  const experienceGrid = document.querySelector(
    "#experiences .experience-grid"
  );
  const experienceCard = createExperienceCard(experience);
  experienceGrid.insertAdjacentHTML("beforeend", experienceCard);
}

// Tab switching function
function showTab(tabName) {
  const allTabs = document.querySelectorAll("#projects, #experiences");
  allTabs.forEach((tab) => {
    tab.classList.remove("active");
    tab.style.display = "none";
  });

  document
    .querySelectorAll(".tab-btn")
    .forEach((btn) => btn.classList.remove("active"));

  setTimeout(() => {
    const selectedTab = document.getElementById(tabName);
    selectedTab.style.display = "grid";
    setTimeout(() => {
      selectedTab.classList.add("active");
    }, 10);
  }, 50);

  event.currentTarget.classList.add("active");
}

// Modal functions
function closeModal() {
  document.getElementById("modal").style.display = "none";
}

function initializeCardClickHandlers() {
  const cards = document.querySelectorAll(".project-card, .experience-card");
  cards.forEach((card) => {
    card.addEventListener("click", function (e) {
      if (e.target.tagName === "A" || e.target.closest("a")) {
        return;
      }

      const isProject = card.classList.contains("project-card");
      const title = card.querySelector("h3").textContent;
      const timeframe = card.querySelector(".timeframe").textContent;
      const preview = card.querySelector(
        isProject ? ".project-preview" : ".experience-preview"
      ).innerHTML;
      const details = card.querySelector(
        isProject ? ".project-details" : ".experience-details"
      ).innerHTML;

      let modalContent = `
        <h2>${title}</h2>
        <p style="color: #666; margin-bottom: 20px;"><strong>${timeframe}</strong></p>
        <div style="margin-bottom: 20px;">${preview}</div>
        <div>${details}</div>
      `;

      if (isProject) {
        const techTags = card.querySelector(".project-tech");
        if (techTags) {
          modalContent = `
            <h2>${title}</h2>
            <p style="color: #666; margin-bottom: 15px;"><strong>${timeframe}</strong></p>
            <div style="margin-bottom: 20px;">${techTags.outerHTML}</div>
            <div style="margin-bottom: 20px;">${preview}</div>
            <div>${details}</div>
          `;
        }

        const githubLink = card.querySelector(".github-link");
        if (githubLink) {
          modalContent += `<div style="margin-top: 20px;">${githubLink.outerHTML}</div>`;
        }
      }

      document.getElementById("modal-body").innerHTML = modalContent;
      document.getElementById("modal").style.display = "flex";
    });
  });
}
// Tech tag types:
// - language
// - framework
// - library
// - tool
// - hardware

// Initialize projects and experiences data
const projects = [
  // {
  //   imagePath: "res/stocker.png",
  //   title: "Stocker",
  //   timeframe: "Jan 2025 - Present",
  //   technologies: [
  //     { type: "framework", name: "React" },
  //     { type: "framework", name: "Node.js" },
  //     { type: "tool", name: "Firebase" },
  //     { type: "tool", name: "Cloud" },
  //   ],
  //   preview:
  //     "Real-time stock trading simulator with leaderboard for <a href='https://stockerstorage.web.app/' target='_blank' rel='noopener noreferrer' style='color: #50c878; text-decoration: underline;'>UofT students</a>",
  //   details: [
  //     "Stocker is a responsive web application that allows users to track and simulate stock portfolios in real-time with a profit leaderboard to compete against friends. Stocker uses the Finnhub API to pull stock data and deploys cloud scripts and backend data to firebase. The front end is created with React while backend scripting was done with node.js.",
  //   ],
  //   githubUrl: "https://github.com/KenC2006/stocker",
  // },
  {
    staticImage: "res/spookySpikes.png",
    gifImage: "res/spooky_spikesGIF.gif",
    title: "Spooky Spikes AI",
    timeframe: "May 2025 - June 2025",
    technologies: [
      { type: "language", name: "Python" },
      { type: "framework", name: "Tensorflow" },
      { type: "library", name: "Keras" },
      { type: "library", name: "Tf-Agents" },
    ],
    preview: "AI that plays the Pummel Party spooky spikes minigame",
    details: [
      "Kept getting last place in the spooky spikes minigame from Pummel Party so I built a similar 3D environment with pygame to train an AI to play it for me. Tensorflow and Keras was used to simplify the reinforcement learning process. The AI learns through a deep-Q-network that checks player state, upcoming obstacles, and timing to determine jump and duck intervals. Current training material is set at 100,000 random experiences and 20,000 learning steps",
      "<i>Initally only wanted to test projecting 2D shapes to 3D using trig and depth sorting~</i>",
    ],
    githubUrl: "https://github.com/KenC2006/spooky-spikes-RL",
  },
  {
    imagePath: "res/instaLogo.jpg",
    title: "InScraper",
    timeframe: "Dec 2025",
    technologies: [
      { type: "language", name: "Python" },
      { type: "library", name: "Selenium" },
      { type: "framework", name: "Tkinter" },
      { type: "language", name: "Javascript" },
    ],
    preview:
      "Instagram webscraper that finds discrepancies between followers and following.",
    details: [
      "Got bored during winter break so I made something to solve crippling insecurity. The program uses a proxy browser to manually find, collect, and scroll follow data with a script before comparing the two lists for discrepancies.",
      "<i>Definitely easier to just use Instagam's API but I wanted to try out Selenium~</i>",
    ],
    githubUrl: "https://github.com/KenC2006/InScraper",
  },
  {
    imagePath: "res/DeadKnight.png",
    title: "DeadKnight",
    timeframe: "Apr 2024 - June 2024",
    technologies: [
      { type: "language", name: "Java" },
      { type: "framework", name: "Java Swing" },
      { type: "tool", name: "Game Dev" },
    ],
    preview:
      "2D rogue-like that implements random map generation reactive hitboxes.",
    details: [
      "10,000+ lines of code and 30+ classes. Maps and asserts were drawn by a friend and game inspiration was taken from DeadCells and Hollow Knight. To see controls and additional details on a ton of game features, check out the GitHub.",
    ],
    githubUrl: "https://github.com/KenC2006/DeadKnight",
  },
  {
    imagePath: "res/cube.png",
    title: "Infinity Cube",
    timeframe: "June 2023 - July 2023",
    technologies: [
      { type: "hardware", name: "Arduino" },
      { type: "language", name: "C++" },
      { type: "tool", name: "Fusion 360" },
      { type: "hardware", name: "Soldering" },
    ],
    preview:
      "Infinity cube made using an ESP32 board and two-way reflective mirrors.",
    details: [
      "The cube frame is made from PLA black filament (maximum color contrast with LEDS) and the 3D print STL was designed in Fusion 360. Product video, STLs, and wiring schematics can be found on the Github.",
    ],
    githubUrl: "https://github.com/KenC2006/Infinity-Cube",
  },
  {
    imagePath: "res/smash.png",
    title: "Smash Blocks",
    timeframe: "June 2023 - July 2023",
    technologies: [
      { type: "language", name: "Java" },
      { type: "framework", name: "Java Swing" },
      { type: "framework", name: "JavaFX" },
      { type: "tool", name: "Game Dev" },
    ],
    preview: "Super Smash Bros game with stun, damage, and combo mechanics.",
    details: [
      "This project was made over the summer to kill some time. Its the first time I worked on a relatively large OOP project and was a ton of fun to develop.",
      "<i>Nintendo please don't sue</i>",
    ],
    githubUrl: "https://github.com/KenC2006/SuperSmashBlocks",
  },
  {
    imagePath: "res/car.png",
    title: "RC Car",
    timeframe: "Apr 2022 - Mar 2022",
    technologies: [
      { type: "hardware", name: "Arduino" },
      { type: "language", name: "C++" },
      { type: "tool", name: "App Dev" },
      { type: "hardware", name: "Soldering" },
    ],
    preview: "Remote control car made with Arduino and bluetooth mobile app.",
    details: [
      "Parts included wires, a 12V battery cartridge, 4 DC motors, a HC-05 chip (bluetooth receiver), Arduino UNO, and L298N motor driver chip. The wires from the DC motors on each side were grouped together and connected to the corresponding ports on the dual motor driver chip. For Bluetooth control, I developed an app using MIT App Inventor to simplify pairing and communication. The app sent specific text commands when buttons were pressed, which the Arduino interpreted to control the motors accordingly. For a full document breakdown, visit the GitHub.",
    ],
    githubUrl: "https://github.com/KenC2006/RC_car",
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

document.addEventListener("DOMContentLoaded", function () {
  // Clear existing cards

  // Add all projects
  projects.forEach((project) => addNewProject(project));

  // Add all experiences
  experiences.forEach((experience) => addNewExperience(experience));

  // Show projects tab by default
  document.getElementById("projects").style.display = "grid";
  document.getElementById("projects").classList.add("active");

  // Initialize click handlers for cards
  initializeCardClickHandlers();
});

// Modal click outside to close
document.addEventListener("click", function (e) {
  const modal = document.getElementById("modal");
  if (e.target === modal) {
    closeModal();
  }
});
