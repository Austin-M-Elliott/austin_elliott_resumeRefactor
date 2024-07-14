const header = {
  homepage: '',
  title: '',
}

const about = {
  name: 'Austin Elliott',
  role: 'Focused on integrating cutting edge data-based solutions in the environmental industry.',
  description:
    '',
  resume: '/Austin M Elliott Resume Feb 2024.pdf',
  social: {
    linkedin: 'https://www.linkedin.com/in/austin-elliott/',
    github: 'https://github.com/Austin-M-Elliott'
  },
}

const projects = [
  {
    name: 'Aces Up',
    description: 'card game win probability',
    internalLink: '/projects/acesup',
    stack: ['Python', 'React', 'FastAPI', 'Chart.js'],
    sourceCode: 'https://github.com/Austin-M-Elliott/AcesUp',
    livePreview: '',
  },
  {
    name: 'Classic Car Data Collection',
    description: 'aggregating car sales data',
    internalLink: '',
    stack: ['Python', 'BeautifulSoup', 'eBay SDK'],
    sourceCode: 'https://github.com/Austin-M-Elliott/classicCar_dataScrape',
    livePreview: '',
  },
  {
    name: 'D&D Loot Generation',
    description: 'randomly generating loot for Dungeons and Dragons',
    internalLink: '',
    stack: ['Python'],
    sourceCode: 'https://github.com/Austin-M-Elliott/DnD_LootGenerator',
    livePreview: '',
  },
  {
    name: 'Video Game Scripting',
    description: 'automating the boring stuff',
    internalLink: '',
    stack: ['Python', 'OpenCV'],
    sourceCode: 'https://github.com/Austin-M-Elliott/Videogame_Scripting',
    livePreview: '',
  }
];


const skills = [
  { name: 'Python'},
  { name: 'PowerBI'},
  { name: 'SQL'},
  { name: 'PowerApps'},
  { name: 'Excel'},
  { name: 'VBA'},
  { name: 'ArcGIS'},
  { name: 'QGIS'}
];

const softskills = [
  { name: 'Communication' },
  { name: 'Innovation' },
  { name: 'Leadership' },
  { name: 'Problem-Solving' },
  { name: 'Adaptability' },
  { name: 'Critical Thinking' },
  { name: 'Interpersonal Skills' },
  { name: 'Business Strategy' },
];

const aboutme = {
  description: 'So many hobbies, too little time.',
  picture: '/images/New Profile Pic.jpg',
  hobbies: [
    { name: 'Fly Fishing' },
    { name: 'Travel' },
    { name: 'Hiking/Backpacking' },
    { name: 'Foraging' },
    { name: 'Dungeons and Dragons' },
    { name: 'Fantasy Football' },
    { name: 'Personal Finance' },
    { name: 'Photography' },
    { name: 'Classic Cars' },
    { name: 'Data Visualization' },
    { name: 'Programming' },
    { name: 'Cooking' },
    { name: 'Beer Brewing' }
  ],
};


const contact = {
  email: 'austin.michael.elliott@gmail.com',
}

export { header, about, projects, skills, softskills, aboutme, contact }
