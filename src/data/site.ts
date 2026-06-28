export const nav = {
  items: [
    { label: 'Opening', link: '#opening', ariaLabel: 'Go to opening section' },
    { label: 'Origin',  link: '#origin',  ariaLabel: 'Go to about section' },
    { label: 'Skills',  link: '#skills',  ariaLabel: 'Go to skills section' },
    { label: 'Reach',   link: '#reach',   ariaLabel: 'Go to contact section' },
  ],
};

export const about = {
  narrative: [
    "My entry into IoT wasn't self-initiated — the field earned its hold. Third year at Presidency now, and the problems have gotten harder: the interesting kind, where the question takes longer to name than to solve. I'm in the middle of a few of them.",
  ],
  education: 'Third year, B.Tech in Internet of Things — Presidency University, Bangalore',
  samsung: {
    context: 'Selected for Samsung Innovation Campus — 27 of 350 shortlisted',
    stat: '27 / 350',
    subtext: 'selected via open test',
    courses: [
      {
        title: 'Version Control & Collaborative IoT Software Development',
        detail: 'Covers the full Git lifecycle — installation, branching, conflict resolution, and advanced GitHub collaboration including pull requests, issue tracking, and introductory CI/CD with GitHub Actions.',
      },
      {
        title: 'Fundamentals of IoT & Embedded Circuit Systems',
        detail: 'Covers Git installation, configuration, and the commit lifecycle. Progresses to branching, merging, and conflict resolution for parallel development. Advanced topics include undoing changes via reset and revert, tagging releases, and GitHub collaboration through forking, pull requests, and code reviews. Closes with CI/CD basics via GitHub Actions, issue tracking, Markdown documentation, and release management.',
      },
    ],
  },
  human: 'Outside the work, I draw. I read — mostly literary fiction, lately Osamu Dazai. I play basketball when I can find a court.',
  volunteering: {
    statement: 'In June 2026, I volunteered for the Green Bengaluru afforestation drive — part of a Guinness World Record attempt to plant 1.5 million native saplings across the city.',
    organizer: 'Bengaluru Development Authority (BDA)',
    date: 'June 27, 2026',
    goal: 'Plant 1.5 million native saplings across 245–314 acres',
    record: 'Guinness World Record attempt for largest afforestation drive',
    role: 'Volunteer',
  },
  minorProjects: [
    {
      name: 'Temperature & Humidity Monitor',
      description: 'A DHT sensor paired with a display screen, running on Arduino. The project that started everything — basic in scope, formative in practice.',
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
};

export const contact = {
  links: [
    { label: 'GitHub',        handle: 'ashuzaifa',                          url: 'https://github.com/ashuzaifa' },
    { label: 'Email',         handle: 'mohammedhuzaifa464@gmail.com',        url: 'mailto:mohammedhuzaifa464@gmail.com' },
    { label: 'Instructables', handle: 'ashuzaifa',                          url: 'https://www.instructables.com/member/ashuzaifa/' },
    { label: 'LinkedIn',      handle: 'Mohammed Huzaifa',                   url: 'https://www.linkedin.com/in/mohammed-huzaifa-887773304/' },
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
        { category: 'Cloud — surface level', items: ['AWS IoT', 'Azure IoT Hub'], learning: true },
      ],
    },
  ],
};

export const hero = {
  label: 'IoT Engineering — Presidency University, Bangalore',
  name: 'Huzaifa.',
  bio: "IoT sits at a rare intersection — not purely hardware, not purely software. It's the domain where a single person can take an idea from concept to working device. That's what drew me in.",
};
