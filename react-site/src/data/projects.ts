import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "lattice",
    image: "/res/lattice.png",
    title: "Lattice",
    timeframe: "Jan 2025 - Feb 2025",
    tech: ["C++", "C#", "OpenCV", "OpenGL"],
    preview:
      "Hack the North 2025 project. Won Best Overall and selected for YC Unicorn Prize interview.",
    details: [
      "Lattice is a holographic projection framework. Using three Kinect cameras, we capture RGB-D maps that our client software converts into 3D point clouds using the cameras' intrinsic parameters. Each point cloud is colorized with corresponding RGB data and streamed to the server, where multi-sensor calibration is performed using Iterative Closest Point and convex hull enclosure. This process computes the rigid transformations needed to align all point clouds within a common coordinate frame, accounting for each camera's position and orientation to maintain geometric consistency across views.",
      "During live capture, the server synchronizes timestamps, applies these calibration transforms in real time, and fuses overlapping regions through spatial filtering and averaging. The result is a smooth, fully aligned 3D reconstruction that can be visualized instantly and streamed to the HoloLens for real-time telepresence.",
    ],
    github: "https://github.com/KenC2006/Lattice",
    liveUrl: "https://devpost.com/software/lattice-flck7q",
  },
  {
    id: "stocker",
    image: "/res/stocker.png",
    title: "Stocker",
    timeframe: "Jun 2025 - Present",
    tech: ["React", "Node.js", "Firebase", "Cloud"],
    preview:
      "Real-time stock trading simulator with dynamic leaderboard",
    details: [
      "Stocker is a full stack stock trading simulator. It features real-time trading, monthly contests, and a profit leaderboard to compete against friends. It uses the Finnhub API to pull stock data and deploys cloud scripts for leaderboard updates, with backend data passed to Firebase. For the frontend, I used React with Charka UI, while backend scripting was done with Node.js.",
    ],
    github: "https://github.com/KenC2006/stocker",
    liveUrl: "https://stockerstorage.web.app/",
  },
  {
    id: "spooky-spikes",
    title: "Spooky Spikes AI",
    timeframe: "May 2025 - June 2025",
    preview:
      "Reinforcement learning AI that jumps and ducks under 3D moving bars accurately.",
    details: [
      "*Inspired by the Spooky Spikes Minigame from Pummel Party*\n\nUsing TensorFlow and Keras, I implemented a streamlined reinforcement learning pipeline. The AI is trained using a Deep Q-Network (DQN) that considers the player's current state, the position of upcoming obstacles, and timing. The training process includes a replay buffer with 100,000 randomly sampled experiences, from which the model learns over 20,000 gradient update steps. The learning was stabilized through extensive tuning of hyperparameters, including epsilon decay rates, network architecture, and node density. Various configurations were tested to find the most stable and efficient setup for consistent learning performance.",
    ],
    image: "/res/spookySpikes.png",
    gifImage: "/res/spooky_spikesGIF.gif",
    tech: ["Python", "Tensorflow", "Keras"],
    github: "https://github.com/KenC2006/spooky-spikes-RL",
  },
  {
    id: "modelshift",
    title: "ModelShift",
    timeframe: "Dec 2024 - Mar 2025",
    preview:
      "AI comparison tool for multi-model prompting and response analysis.",
    details: [
      "ModelShift allows users to send the same prompt to multiple AI providers (ChatGPT, Gemini, Claude, etc) and view responses side-by-side in real-time. The application has a React/Tailwind CSS frontend, dark-light theme styling, and responsive design. The backend is built with Node.js and Express, implementing secure API key management with encryption, rate limiting, and abuse detection. Users can customize system prompts, adjust model temperature and token limits, and export comparison results. The application includes Firebase integration for authentication and data storage, with features like API key usage statistics, multiple provider support, and markdown rendering for AI.",
    ],
    image: "/res/modelshift.png",
    tech: ["React", "Node.js", "Crypto"],
    github: "https://github.com/KenC2006/modelShift",
    liveUrl: "https://modelshift-bbcd8.web.app/",
  },
  {
    id: "deadknight",
    title: "DeadKnight",
    timeframe: "Apr 2024 - June 2024",
    preview:
      "2D roguevania with random map gen, reactive hitboxes and smart enemy AI.",
    details: [
      "DeadKnight features a combat system with both melee and ranged weapons, including swords, spears, and various projectile-based weapons. Players navigate through procedurally generated rooms across different biomes, facing increasingly challenging enemies and boss battles. The combat mechanics include a fluid movement system with jumping, dashing, and strategic weapon switching. A dungeon room generation system is used to create unique maps each playthrough, and enemies use an intelligent enemy AI (smart path finding and attack patterns) to keep the game interesting. Additional features include a dynamic camera system with minimap functionality, inventory system for weapon management, and a stats system that allows for character upgrades.",
    ],
    image: "/res/DeadKnight.png",
    tech: ["Java", "Swing", "Game Dev"],
    github: "https://github.com/KenC2006/DeadKnight",
  },
  {
    id: "hyper-cube",
    title: "Hyper Cube",
    timeframe: "June 2023 - July 2023",
    preview:
      "Hyper cube built using an ESP32 board and two-way mirrors.",
    details: [
      "I designed and built a 3D-printed hypercube with LED strips and two-way mirrors. I used an ESP32 board to upload WLED for dynamic lighting effects, brightness control, and programmable patterns. All the STLs and wiring diagrams that I made can be found on my github.",
    ],
    image: "/res/cube.png",
    tech: ["Arduino", "C++", "Fusion 360", "Soldering"],
    github: "https://github.com/KenC2006/Infinity-Cube",
  },
  {
    id: "smash-blocks",
    title: "Smash Blocks",
    timeframe: "June 2023 - July 2023",
    preview: "2 player fighter with knockback, damage, and combo mechanics.",
    details: [
      "Programmed in Java using Swing and AWT, Smash Blocks features two-player combat, multi-threaded dynamic movement, and fully customizable controls that allow players to re-map keybinds. The game implements platform collision detection, dynamic menus, animated UI, and knockback amplification. Players can also perform different attack types and combo chain.",
    ],
    image: "/res/smash.png",
    tech: ["Java", "Swing", "JavaFX", "Game Dev"],
    github: "https://github.com/KenC2006/SuperSmashBlocks",
  },
  {
    id: "rc-car",
    title: "RC Car",
    timeframe: "Apr 2022 - Mar 2022",
    preview: "Remote control car made with Arduino and bluetooth mobile app.",
    details: [
      "Parts included a 12V battery cartridge, 4 DC motors, a HC-05 chip (bluetooth receiver), Arduino UNO, and L298N motor driver chip. The wires from the DC motors on each side were grouped together and connected to the corresponding ports on the dual motor driver chip. For Bluetooth control, an app was developed using MIT App Inventor for pairing and communication. The app sent text commands when buttons were pressed, which the Arduino interpreted to control the motors.",
    ],
    image: "/res/car.png",
    tech: ["Arduino", "C++", "App Dev", "Soldering"],
    github: "https://github.com/KenC2006/RC_car",
  },
];


