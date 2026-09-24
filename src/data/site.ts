import { getBaseUrl } from '../utils/basePath';

// BASE_URL-prefixed so nav links resolve correctly from sub-pages (e.g. /projects/[slug]/),
// not just from the single-page scroll on the homepage itself.
const base = getBaseUrl();

export const nav = {
  items: [
    { label: 'Opening', link: `${base}#opening`, ariaLabel: 'Go to opening section' },
    { label: 'Origin',  link: `${base}#origin`,  ariaLabel: 'Go to about section' },
    { label: 'Builds',  link: `${base}#builds`,  ariaLabel: 'Go to projects section' },
    { label: 'Skills',  link: `${base}#skills`,  ariaLabel: 'Go to skills section' },
    { label: 'Certificates', link: `${base}#certificates`, ariaLabel: 'Go to certificates section' },
    { label: 'Reach',   link: `${base}#reach`,   ariaLabel: 'Go to contact section' },
  ],
};

interface StudyLevel {
  label: string;
  focus: string;
  topics: string[];
}

interface StudyCourse {
  slug: string;
  name: string;
  tagline: string;
  levels: StudyLevel[];
}

export const about = {
  narrative: [
    "My trajectory into the Internet of Things was not self-initiated; however, the field proved captivating due to its equilibrium between the abstract digital and tangible physical worlds. IoT functions as a multidisciplinary sweet spot, contrasting with the hardware-centric nature of electrical engineering and the software-confined paradigm of machine learning. It affords a unique operational autonomy, allowing one to manifest complex devices entirely within the purview of a single, integrated domain.",
  ],
  selfStudy: {
    intro: "IoT alone doesn't cover it anymore. The device is the easy part compared to everything downstream of it: getting a fleet's data somewhere useful, running intelligence at the edge instead of shipping every reading to a server, and provisioning it all without doing it by hand. So I'm teaching myself the layers most IoT engineers leave to someone else, starting from the fundamentals of each and narrowing toward the problems specific to devices: fleets, OTA updates, constrained hardware, and edge compute.",
    courses: [
      {
        slug: 'cloud-devops',
        name: 'Cloud & DevOps for IoT',
        tagline: "Where a device's data actually goes, and what keeps it running once ten thousand of them are talking at once.",
        levels: [
          {
            label: 'Beginner',
            focus: 'The vocabulary and tools, from a cold start.',
            topics: ['Cloud Fundamentals', 'MQTT Deep Dive', 'IAM & Access Control', 'AWS IoT Core / Azure IoT Hub', 'Containers', 'CI/CD Basics', 'Infrastructure as Code Intro'],
          },
          {
            label: 'Intermediate',
            focus: 'Applied to a real fleet: provisioning, OTA, firmware pipelines.',
            topics: ['Fleet Architecture Patterns', 'Device Provisioning at Scale', 'Docker for Constrained Devices', 'Kubernetes / K3s at the Edge', 'Firmware CI/CD', 'OTA Update Systems', 'Edge-to-Cloud Pipelines'],
          },
          {
            label: 'Advanced',
            focus: 'Operating a fleet at production scale: reliability, security, cost.',
            topics: ['Multi-Region Fleet Architecture', 'Secure Firmware Supply Chain', 'Advanced OTA Strategies', 'Observability & SRE', 'Zero Trust Architecture', 'FinOps & Cost Governance'],
          },
        ],
      },
      {
        slug: 'data-pipelines',
        name: 'Time-Series Data & Streaming Pipelines',
        tagline: 'Sensor data breaks relational databases. This is what replaces them.',
        levels: [
          {
            label: 'Beginner',
            focus: 'Why sensor data breaks the tools built for everything else.',
            topics: ['Time-Series Databases', 'Edge-to-Cloud Pipeline Anatomy', 'MQTT & Message Brokers', 'Streaming vs. Batch Processing', 'Windowing & Aggregation', 'Delivery Guarantees', 'Dashboards'],
          },
          {
            label: 'Intermediate',
            focus: 'Building pipelines that survive a real device fleet.',
            topics: ['InfluxDB & TimescaleDB', 'Ingestion Pipeline Design', 'Stream Processing Frameworks', 'Backpressure & Dead-Letter Queues', 'Idempotency & Deduplication', 'Continuous Aggregation', 'Grafana Dashboards'],
          },
          {
            label: 'Advanced',
            focus: 'Reliability across regions, tenants, and years of retention.',
            topics: ['High-Cardinality Time-Series', 'Exactly-Once Semantics', 'Autoscaling Ingestion', 'Multi-Tenant & Multi-Region Design', 'Storage Economics at Scale', 'Pipeline Observability'],
          },
        ],
      },
      {
        slug: 'edge-ai-tinyml',
        name: 'Edge AI & TinyML',
        tagline: 'Running inference on the device itself, in kilobytes, without a round trip to the cloud.',
        levels: [
          {
            label: 'Beginner',
            focus: 'Why inference moves onto the device, and what has to shrink to fit.',
            topics: ['On-Device Inference', 'Neural Network Fundamentals', 'Quantization', 'Pruning & Distillation', 'Embedded ML Frameworks', 'Keyword Spotting', 'Anomaly Detection'],
          },
          {
            label: 'Intermediate',
            focus: 'Turning the theory into a model that actually ships.',
            topics: ['Feature Extraction & Signal Processing', 'Model Sizing for KB-Scale Budgets', 'TensorFlow Lite Micro', 'CMSIS-NN & Vendor SDKs', 'Edge Impulse Workflow', 'Evaluating On-Device Models'],
          },
          {
            label: 'Advanced',
            focus: 'Operating fleets of models, not just one.',
            topics: ['Hardware Accelerators (NPU / DSP)', 'Multi-Model & Cascade Architectures', 'MLOps for Fleets', 'OTA Model Updates & Rollback', 'Drift Monitoring', 'Power & Thermal Budgeting'],
          },
        ],
      },
      {
        slug: 'infrastructure-as-code',
        name: 'Infrastructure as Code',
        tagline: 'Describing a fleet’s infrastructure instead of clicking it together by hand.',
        levels: [
          {
            label: 'Beginner',
            focus: 'Describing infrastructure instead of clicking it together.',
            topics: ['Declarative Thinking & Drift', 'Terraform Providers & Resources', 'Terraform State', 'Provisioning a Cloud IoT Backend', 'Least-Privilege Access as Code', 'Ansible Basics'],
          },
          {
            label: 'Intermediate',
            focus: 'Applied to a real, multi-environment IoT backend.',
            topics: ['Remote State & Locking', 'Reusable Modules', 'Multi-Environment Patterns', 'Secrets Management', 'Ansible Roles & Fleet Inventory', 'GitOps for Infrastructure', 'Drift Detection'],
          },
          {
            label: 'Advanced',
            focus: 'Running infrastructure for a fleet across regions.',
            topics: ['IaC Architecture at Scale', 'Module Registries & Platform Engineering', 'Secrets & Identity Architecture', 'Policy as Code & Compliance', 'Disaster Recovery & Failover', 'Cost Governance'],
          },
        ],
      },
    ] as StudyCourse[],
  },
  samsung: {
    context: 'Selected for Samsung Innovation Campus, 27 of 350 shortlisted',
    stat: '27 / 350',
    subtext: 'selected via open test',
    courses: [
      {
        title: 'Version Control & Collaborative IoT Software Development',
        detail: 'Covers the full Git lifecycle: installation, branching, conflict resolution, and advanced GitHub collaboration including pull requests, issue tracking, and introductory CI/CD with GitHub Actions.',
      },
      {
        title: 'Fundamentals of IoT & Embedded Circuit Systems',
        detail: 'Covers Git installation, configuration, and the commit lifecycle. Progresses to branching, merging, and conflict resolution for parallel development. Advanced topics include undoing changes via reset and revert, tagging releases, and GitHub collaboration through forking, pull requests, and code reviews. Closes with CI/CD basics via GitHub Actions, issue tracking, Markdown documentation, and release management.',
      },
    ],
  },
  human: 'Outside the work, I draw. I read, mostly literary fiction, lately Osamu Dazai. I play basketball when I can find a court.',
  volunteering: {
    statement: 'In June 2026, I volunteered for the Green Bengaluru afforestation drive, part of a Guinness World Record attempt to plant 1.5 million native saplings across the city.',
    organizer: 'Bengaluru Development Authority (BDA)',
    date: 'June 27, 2026',
    goal: 'Plant 1.5 million native saplings across 245–314 acres',
    record: 'Guinness World Record attempt for largest afforestation drive',
    role: 'Volunteer',
  },
  minorProjects: [
    {
      name: 'Temperature & Humidity Monitor',
      description: 'A DHT sensor paired with a display screen, running on Arduino. The project that started everything, basic in scope, formative in practice.',
    },
    {
      name: 'Ocean Pollution Detection Sensor',
      description: 'A waterproof sensor array deployed in water, returning real-time readings of pH levels, chemical content, and water quality indicators. Built to make invisible pollution visible.',
    },
    {
      name: 'Smart Attendance Register System',
      description: 'An all-software attendance solution built for Smart India Hackathon. Reached university top 20 out of ~150 competing teams.',
    },
  ],
  seminars: [
    {
      title: 'Principles of Game Design',
      source: 'Dr. Mitchell McEwan - Senior Lecturer, Macquarie University',
      detail: '',
    },
    {
      title: 'BOHRAI Launch & AI Centre of Excellence Inauguration',
      source: 'Presidency University × NVIDIA',
      detail: 'Chief guests: Dr. Mohan Kankanhalli (NUS), Dr. K Sivan (Former Chairman, ISRO), Mr. Harry Radhak (CCTS Group)',
    },
    {
      title: 'AI & IoT in Precision Agriculture',
      source: '',
      detail: 'On bridging IoT sensor networks with AI inference for precision farming: soil monitoring, yield prediction, and autonomous irrigation as the layer between field data and farm decisions.',
    },
  ],
};

interface Project {
  slug: string;
  name: string;
  tagline: string;
  stack: string[];
  repo: string;
  demo: string | null;
  image: string | null;
  fluid: string[];
  overview: string;
  features: { title: string; detail: string }[];
  scope: string;
  gallery: { src: string; caption?: string }[] | null;
  paper: { src: string; label: string } | null;
}

export const projects: Project[] = [
  {
    slug: 'pulse',
    name: 'PULSE',
    tagline: 'A wearable glove that reads your vitals and adjusts the room to match your mood.',
    stack: ['ESP32', 'GSR / MAX30102 / MPU6050', 'MQTT', 'Node.js', 'React', 'TypeScript', 'Vite'],
    repo: 'https://github.com/AsHuzaifa/pulse',
    demo: 'https://pulse-jet-two.vercel.app',
    image: '/assets/projects/pulse.png',
    fluid: ['#e8b04b', '#b48ce0', '#4fd1c5', '#0e1119'],
    overview: "PULSE is a wearable glove built under the Samsung Innovation Campus program at Presidency University. It reads skin conductance, heart rate, blood oxygen, and motion, works out what state you're in, and adjusts the room around you: lighting colour and brightness, music and volume, and the AC. The pipeline behind it runs in four stages: a rolling mean to smooth the raw sensor noise, a 60-second calibration window so thresholds sit relative to your own baseline instead of a fixed number, a weighted Z-score into a 0-100 Arousal Index, and a hysteresis layer that keeps the mood label from flickering across a boundary. That last stage trades a little point-for-point accuracy (86% versus 79% with raw thresholding) for something more useful in practice: in a 20-run test with a signal parked right on a decision boundary, raw thresholding produced 65 spurious band changes a minute, the hysteresis layer produced zero.",
    features: [
      {
        title: 'Sensors',
        detail: 'GSR for skin conductance, a MAX30102 for heart rate and blood oxygen over I2C, and a 6-axis MPU6050 for motion, all on the glove and published over MQTT to a Node.js bridge.',
      },
      {
        title: 'Classification pipeline',
        detail: 'Four stages, smoothing, per-person calibration, a weighted Z-score arousal index, and a hysteresis state machine, turn three noisy signals into a mood label stable enough to actually drive a light switch.',
      },
      {
        title: 'Five moods',
        detail: 'Calm, focused, energized, stressed, and fatigued, each mapped to its own lighting colour, soundscape, volume level, and AC behaviour.',
      },
      {
        title: 'Live and demo dashboard',
        detail: "Opens in live mode automatically on localhost or a local network, where the glove's bridge might actually be, and in demo mode everywhere else, always labelled clearly so a demo reading is never mistaken for a live one.",
      },
      {
        title: 'Guided breathing',
        detail: 'A free mode where the room just follows whatever state you\'re in, plus a guided breathing exercise you can start straight from the dashboard.',
      },
    ],
    scope: "This is a wellness prototype, not a medical device: nothing it displays is a clinical reading, a diagnosis, or an alarm, and the accuracy figures it cites come from a 30-session Monte Carlo simulation, not a human-subject study. Built with a team of four (Kevin Immanuel, Harshit W., and Sinan Ali alongside me) under the Samsung Innovation Campus program; the dashboard and classification pipeline here are mine.",
    gallery: [
      {
        src: '/assets/projects/pulse-hardware-1.jpg',
        caption: 'The glove, wired: GSR pads on the index and middle fingers, MAX30102 on the ring finger, MPU6050 and ESP32 on the back of the hand.',
      },
      {
        src: '/assets/projects/pulse-hardware-2.jpg',
        caption: 'Power: 3x AA batteries, taped to the wrist.',
      },
      {
        src: '/assets/projects/pulse-hardware-3.jpg',
        caption: 'Sensor layout: GSR sensor, MAX30102, 6-axis MPU6050, and the ESP32 powering it all.',
      },
    ],
    paper: {
      src: '/assets/projects/pulse-paper.pdf',
      label: 'PULSE: A Real-Time Wearable Multi-Sensor Telemetry and Affective Computing Framework via MQTT-WebSocket Bridging',
    },
  },
  {
    slug: 'netsim',
    name: 'NetSim',
    tagline: 'A LoRaWAN network simulator wearing a Windows 98 desktop, real RF physics under a retro UI.',
    stack: ['React 19', 'TypeScript', 'Vite', '98.css', 'Web Workers'],
    repo: 'https://github.com/AsHuzaifa/netsim',
    demo: 'https://netsim-seven.vercel.app',
    image: '/assets/projects/netsim.png',
    fluid: ['#FF3CAC', '#784BA0', '#2B86C5'],
    overview: "A LoRaWAN-style constrained-device network simulator, dressed as a Windows 98 / Y2K desktop. It's a static site with zero backend: the entire simulation runs inside a Web Worker and talks to the interface over postMessage. Up to fifty battery-powered end devices talk to three gateways, with real RF and protocol behavior underneath the retro chrome: EU868-style duty-cycle enforcement, Adaptive Data Rate driven by simulated RSSI/SNR, the Semtech time-on-air formula for real per-spreading-factor airtime, collision modeling with a capture effect, confirmed-message retry alongside unconfirmed fire-and-forget loss, and per-radio-state energy draw depleting a finite battery.",
    features: [
      {
        title: 'Network Topology',
        detail: 'A live map of every device and gateway, with transmissions animated as they happen: blue for a transmit, green for a successful delivery, red for a collision. Click any device to open its inspector.',
      },
      {
        title: 'Device Inspector',
        detail: 'Per-device radio settings, battery level, and live stats, the same numbers actually driving the physics underneath.',
      },
      {
        title: 'Airtime Monitor',
        detail: 'Duty-cycle budget usage per device, tracked against the EU868-style 1% airtime cap that the simulation actually enforces.',
      },
      {
        title: 'Battery Status',
        detail: 'A drain-over-time chart and a lowest-battery ranking, reflecting real per-radio-state energy draw across sleep, receive, and transmit.',
      },
      {
        title: 'Event Log',
        detail: 'The raw simulation event stream: every transmit, delivery, collision, and ADR update, timestamped as it happens.',
      },
      {
        title: 'Control Panel',
        detail: 'Pause or resume the simulation, add and remove devices, kill a gateway, inject interference, run a stress test, and tune simulation parameters live.',
      },
    ],
    scope: "This is a physics simulation, not a live radio network: there's no real hardware and no actual RF transmission, and the retro desktop shell runs entirely client-side in the browser. The value is in modeling the real constraints of a LoRaWAN deployment (duty cycle, adaptive data rate, collisions, battery) accurately enough to be useful for understanding them.",
    gallery: null,
    paper: null,
  },
  {
    slug: 'smart-home-hub',
    name: 'Smart Home Hub',
    tagline: 'A drag-and-drop rules engine wired to a live 3D floorplan, with devices that actually react.',
    stack: ['React', 'TypeScript', 'Vite', 'React Flow', 'React Three Fiber', 'Zustand', 'Tailwind CSS'],
    repo: 'https://github.com/AsHuzaifa/smart-home-hub',
    demo: 'https://smarthome-delta-ten.vercel.app',
    image: '/assets/projects/smart-home-hub.png',
    fluid: ['#D98A3F', '#8A3A12', '#233642'],
    overview: "A client-side simulation of a smart home automation system: a drag-and-drop rules engine, built the way Node-RED handles logic, wired to a live 3D floorplan where simulated devices (lights, fans, an AC unit, doors, a thermostat, temperature and motion sensors) react in real time as rules fire. It also models device connectivity (signal, battery, disconnects) and a simulated command-security layer, both wired into the real rules engine instead of just sitting there for show.",
    features: [
      {
        title: 'Devices',
        detail: "A room-grouped control panel: toggle lights and fans, lock or open doors, adjust thermostats and temperature sensors, trigger motion. A device that's currently offline can't be commanded until it reconnects.",
      },
      {
        title: 'Rules',
        detail: 'A React Flow canvas for wiring up automations visually: drag Trigger, Condition, and Action nodes onto the canvas and connect them, e.g. "if living room temp > 25 and motion detected, turn on fan." Multiple conditions feeding one action combine with AND, and a validation banner flags unconnected nodes, missing selections, or a rule with no action.',
      },
      {
        title: 'Network',
        detail: "A simulated connectivity layer: every device has a signal strength, and battery-powered devices drain over time and can lose connection. Devices also drift and disconnect on their own to mimic real-world flakiness, and it's wired into the rules engine for real: a rule can't fire off a stale reading from an unreachable device, and it can't be manually commanded either.",
      },
      {
        title: 'Security',
        detail: 'Click any device in the 3D scene to open a panel explaining the simulated security model behind it (a fake per-device token, schema-validated commands), plus a one-click simulated replay-attack demo that shows the outcome inline and logs every check. Everything here is labeled as simulation: no real cryptography or authentication is involved.',
      },
    ],
    scope: "This is a portfolio piece demonstrating a rules-engine and 3D-simulation architecture, not a production IoT platform. There's no real backend, no real hardware or MQTT integration, no real authentication, and no real cryptography; the security layer teaches the concepts through simulation rather than pretending to be the real thing.",
    gallery: null,
    paper: null,
  },
  {
    slug: 'minor-works',
    name: 'Minor Works',
    tagline: 'Everything too small for its own repository, but too good to lose.',
    stack: ['HTML', 'CSS', 'JavaScript (ES modules)', 'Canvas', 'SVG'],
    repo: 'https://github.com/AsHuzaifa/minor-works',
    demo: 'https://minor-works.vercel.app',
    image: '/assets/projects/minor-works.png',
    fluid: ['#F0F0E0', '#707070', '#0A0A0A'],
    overview: "A small site holding the foundational, small-scale projects that led the way to the bigger ones: sensors, scripts, circuits, and the notes that came with them. Four entries, each with its own page covering the specs, how it works, and what it cost to learn. Built with plain HTML, CSS, and ES modules, no framework, no bundler, no dependencies. There are no image assets either: every visual is drawn on canvas from a seeded generator, and every chart is inline SVG.",
    features: [
      {
        title: 'Temperature & Humidity Monitor (2023)',
        detail: 'A DHT sensor and a display on an Arduino. The first build, and the one that taught the rest.',
      },
      {
        title: 'Ocean Pollution Detection Sensor (2024)',
        detail: 'A waterproof array lowered into water, returning pH and chemical readings live instead of weeks after a lab visit.',
      },
      {
        title: 'Smart Attendance Register System (2024)',
        detail: "Face recognition attendance with no hardware beyond a webcam. Built at Smart India Hackathon, top 20 of roughly 150 teams. Its dashboard is rebuilt here as a working demo: drag the match threshold and watch the register break in both directions.",
      },
      {
        title: 'PIR & GSM Security Alarm (2024)',
        detail: 'A passive infrared sensor and a SIM module that texts a phone when something moves. No WiFi, no app, no account.',
      },
    ],
    scope: "These are small, foundational projects, not production systems: proof that a sensor works, that a script runs, that an idea holds up outside a lab. The Smart Attendance demo runs its face matching against a simulated room, not a live camera.",
    gallery: null,
    paper: null,
  },
];

export const contact = {
  links: [
    { label: 'GitHub',        handle: 'ashuzaifa',                          url: 'https://github.com/ashuzaifa' },
    { label: 'Email',         handle: 'mohammedhuzaifa464@gmail.com',        url: 'mailto:mohammedhuzaifa464@gmail.com' },
    { label: 'Instructables', handle: 'ashuzaifa',                          url: 'https://www.instructables.com/member/ashuzaifa/' },
    { label: 'ORCID',         handle: '0009-0006-6229-3699',                url: 'https://orcid.org/0009-0006-6229-3699' },
  ],
};

export const skills = {
  groups: [
    {
      label: 'Hardware & Embedded Systems',
      number: '01',
      rows: [
        { category: 'Microcontrollers & Processors', items: ['Arduino', 'ESP32', 'GPIO', 'PWM', 'Interrupts', 'Timers'] },
        { category: 'Embedded Hardware Design', items: ['Schematics', 'PCB Basics', 'Power Management', 'Low-Power Modes', 'Battery Systems'] },
        { category: 'Peripherals & Interfaces', items: ['I2C', 'SPI', 'UART', 'USB'] },
      ],
    },
    {
      label: 'Programming',
      number: '02',
      rows: [
        { items: ['Python'], note: 'primary language' },
        { items: ['C/C++'], note: 'actively improving', learning: true },
        { items: ['Java'], note: 'actively improving', learning: true },
      ],
    },
    {
      label: 'Wireless & Networking',
      number: '03',
      rows: [
        { category: 'Wireless', items: ['WiFi', 'Bluetooth', 'BLE', 'LoRa', 'LoRaWAN', 'NB-IoT'] },
        { category: 'Protocols', items: ['MQTT', 'CoAP', 'TCP/IP (IPv4, IPv6)'] },
        { items: ['Matter', 'Digital Twins'], learning: true },
      ],
    },
    {
      label: 'Platforms & Tools',
      number: '04',
      rows: [
        { items: ['Edge Impulse', 'Git', 'GitHub', 'PlatformIO', 'Arduino IDE', 'VS Code'] },
        { category: 'Cloud - surface level', items: ['AWS IoT', 'Azure IoT Hub'], learning: true },
      ],
    },
  ],
};

interface Certificate {
  slug: string;
  name: string;
  logo: { src: string; alt: string };
  date: string;
  pdf: string;
  highlights: string[];
}

export const certificates: Certificate[] = [
  {
    slug: 'bcg-data-science',
    name: 'BCG Data Science Job Simulation',
    logo: { src: '/assets/certificates/bcgx-logo.png', alt: 'BCG X' },
    date: 'September 22, 2026',
    pdf: '/assets/certificates/bcg-data-science.pdf',
    highlights: [
      'Completed a customer churn analysis simulation for XYZ Analytics, demonstrating advanced data analytics skills, identifying essential client data and outlining a strategic investigation approach.',
      'Conducted efficient data analysis using Python, including Pandas and NumPy. Employed data visualization techniques for insightful trend interpretation.',
      'Completed the engineering and optimization of a random forest model, achieving an 50% recall rate in predicting customer churn.',
      'Completed a concise executive summary for the team, delivering actionable insights for informed decision-making based on the analysis.',
    ],
  },
  {
    slug: 'mastercard-cybersecurity-phishing',
    name: 'Mastercard Cybersecurity Virtual Experience',
    logo: { src: '/assets/certificates/mastercard-logo.png', alt: 'Mastercard' },
    date: 'September 21, 2026',
    pdf: '/assets/certificates/mastercard-cybersecurity-phishing.pdf',
    highlights: [
      "Completed a job simulation where I served as an analyst on Mastercard's Security Awareness Team.",
      'Helped identify and report security threats such as phishing.',
      'Analyzed and identified which areas of the business needed more robust security training and implemented training courses and procedures for those teams.',
    ],
  },
];

export const hero = {
  label: 'IoT Engineer',
  name: 'Huzaifa.',
  bio: "IoT sits at a rare intersection, not purely hardware, not purely software. It's the domain where a single person can take an idea from concept to working device. That's what drew me in.",
};
