// BASE_URL-prefixed so nav links resolve correctly from sub-pages (e.g. /projects/[slug]/),
// not just from the single-page scroll on the homepage itself. BASE_URL doesn't
// reliably include a trailing slash, so it's normalized here.
const base = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;

export const nav = {
  items: [
    { label: 'Opening', link: `${base}#opening`, ariaLabel: 'Go to opening section' },
    { label: 'Origin',  link: `${base}#origin`,  ariaLabel: 'Go to about section' },
    { label: 'Builds',  link: `${base}#builds`,  ariaLabel: 'Go to projects section' },
    { label: 'Skills',  link: `${base}#skills`,  ariaLabel: 'Go to skills section' },
    { label: 'Reach',   link: `${base}#reach`,   ariaLabel: 'Go to contact section' },
  ],
};

export const about = {
  narrative: [
    "My trajectory into the Internet of Things was not self-initiated; however, the field proved captivating due to its equilibrium between the abstract digital and tangible physical worlds. IoT functions as a multidisciplinary sweet spot, contrasting with the hardware-centric nature of electrical engineering and the software-confined paradigm of machine learning. It affords a unique operational autonomy, allowing one to manifest complex devices entirely within the purview of a single, integrated domain.",
  ],
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

export const projects = [
  {
    slug: 'smart-home-hub',
    name: 'Smart Home Hub',
    tagline: 'A drag-and-drop rules engine wired to a live 3D floorplan — devices that actually react.',
    stack: ['React', 'TypeScript', 'Vite', 'React Flow', 'React Three Fiber', 'Zustand', 'Tailwind CSS'],
    repo: 'https://github.com/AsHuzaifa/smart-home-hub',
    demo: null,
    overview: "A client-side simulation of a smart home automation system: a drag-and-drop rules engine, built the way Node-RED handles logic, wired to a live 3D floorplan where simulated devices — lights, fans, an AC unit, doors, a thermostat, temperature and motion sensors — react in real time as rules fire. Most home-automation demos stop at devices behaving prettily. This one also models device connectivity — signal, battery, disconnects — and a simulated command-security layer, both wired into the real rules engine rather than sitting there as decoration.",
    features: [
      {
        title: 'Devices',
        detail: "A room-grouped control panel: toggle lights and fans, lock or open doors, adjust thermostats and temperature sensors, trigger motion. A device that's currently offline can't be commanded until it reconnects.",
      },
      {
        title: 'Rules',
        detail: 'A React Flow canvas for wiring up automations visually — drag Trigger, Condition, and Action nodes onto the canvas and connect them, e.g. "if living room temp > 25 and motion detected, turn on fan." Multiple conditions feeding one action combine with AND. A validation banner flags unconnected nodes, missing selections, or a rule with no action.',
      },
      {
        title: 'Network',
        detail: 'A simulated connectivity layer: every device has a signal strength, and battery-powered devices drain over time and can lose connection; devices also drift and disconnect on their own to mimic real-world flakiness. This is wired into the rules engine for real — a rule can\'t fire off a stale reading from an unreachable device, and it can\'t be manually commanded either.',
      },
      {
        title: 'Security',
        detail: 'Click any device in the 3D scene to open a panel explaining the simulated security model behind it — a fake per-device token, schema-validated commands — plus a one-click simulated replay-attack demo that shows the outcome inline and logs every check. Everything here is explicitly labeled as simulation: no real cryptography or authentication is involved.',
      },
    ],
    scope: "This is a portfolio piece demonstrating a rules-engine and 3D-simulation architecture, not a production IoT platform: no real backend, no real hardware or MQTT integration, no real authentication, no real cryptography. The security layer teaches concepts through honest simulation rather than claiming to be something it isn't.",
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

export const hero = {
  label: 'IoT Engineer',
  name: 'Huzaifa.',
  bio: "IoT sits at a rare intersection, not purely hardware, not purely software. It's the domain where a single person can take an idea from concept to working device. That's what drew me in.",
};
