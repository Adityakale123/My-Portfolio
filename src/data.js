

export const data = {
  name: 'Aditya Kale',
  title: 'Full Stack Java Developer',
  summary:
    'I build scalable REST APIs, microservices and web apps with Java, Spring Boot and React, and I work on Azure DevOps CI/CD and deployments.',
  resume: './Aditya_Kale_Resume.pdf',
  github: 'https://github.com/Adityakale123',
  linkedin: 'https://linkedin.com/in/adityakale1704',
  roles: ['Full Stack Java Developer', 'Spring Boot Engineer', 'Azure DevOps Enthusiast'],
  photo: './MyPhoto.jpg',
  stats: [
    { n: 1.5, s: '+', l: 'Years experience' },
    { n: 4, s: '', l: 'Internships & roles' },
    { n: 5, s: '+', l: 'Projects built' },
    { n: 6, s: '', l: 'Certifications' },
  ],
  topSkills: ['Java', 'Spring Boot', 'ReactJS', 'Azure DevOps'],

  about:
    'I’m a Full Stack Java Developer with 1.5+ years of industry experience building scalable REST APIs, microservices and role-based web and mobile applications using Java, Spring Boot, React, MySQL and PostgreSQL. I currently work on Azure DevOps CI/CD, deployment automation and environment troubleshooting at Tietoevry, and I’m comfortable in Agile/Scrum teams. I’m looking for a Java Backend or Full Stack Developer role.',

  skills: [
    { group: 'Programming', items: ['Java', 'JavaScript', 'SQL'] },
    { group: 'Backend', items: ['Spring Boot', 'Spring MVC', 'REST APIs', 'Microservices', 'API Integration', 'OOP'] },
    { group: 'DevOps & CI/CD', items: ['Azure DevOps', 'CI/CD', 'Azure Fundamentals', 'Linux (basic)', 'Shell scripting'] },
    { group: 'Frontend', items: ['ReactJS', 'React Native', 'Bootstrap', 'HTML', 'CSS'] },
    { group: 'Databases', items: ['MySQL', 'PostgreSQL'] },
    { group: 'AWS Cloud', items: ['EC2', 'RDS', 'S3', 'IAM'] },
    { group: 'Tools', items: ['Git', 'GitHub', 'Postman', 'Swagger', 'IntelliJ', 'Jira', 'Code reviews'] },
    { group: 'AI tools', items: ['GitHub Copilot', 'Claude', 'ChatGPT', 'Cursor'] },
  ],

  experience: [
    {
      role: 'Software Product Developer',
      company: 'Tietoevry Fintech India Ltd',
      period: '05/2026 – 10/2026 · Pune',
      projects: [
        {
          name: 'Credit Lending Origination (CLO) – Loan Application Processing',
          points: [
            'Developed and maintained loan application processing features in an enterprise lending platform.',
            'Improved application functionality and supported lending workflow improvements and issue resolution.',
            'Configured and maintained Azure DevOps build and release pipelines for automated deployments.',
            'Set up Azure Virtual Machines and application environments, and fixed deployment issues using Azure CLI and PowerShell.',
          ],
        },
      ],
    },
    {
      role: 'Associate Software Engineer and Internship Training',
      period: '09/2025 – 03/2026 · Pune',
      projects: [
        {
          name: 'Retail Billing Mobile Application',
          points: [
            'Built backend services using Java, Spring Boot and PostgreSQL with role-based access control.',
            'Designed RESTful APIs for billing operations and application workflows.',
            'Implemented business logic and database integration for reliable billing transactions.',
            'Worked with Git-based workflows and CI/CD build and deployment processes.',
          ],
        },
      ],
    },
    {
      role: 'Software Developer Intern',
      company: 'Zidio Technology',
      period: '08/2025 – 10/2025 · Bengaluru (Remote)',
      projects: [
        {
          name: 'Recruitment Portal',
          points: [
            'Built a full-stack recruitment portal using Java, Spring Boot, ReactJS and MySQL.',
            'Implemented role-based authentication and authorization for Admin, Recruiter and users.',
            'Developed interactive dashboards, RESTful APIs and CRUD operations to streamline recruitment workflows.',
          ],
        },
      ],
    },
    {
      role: 'Software Developer Intern',
      company: 'AI Tech Solutions',
      period: '01/2025 – 07/2025 · Pune',
      projects: [
        {
          name: 'Doctor Door Step Service (DrDSS)',
          points: [
            'Built backend services using Java and Spring Boot, following Clean Architecture and Microservices principles.',
            'Designed and implemented REST APIs for application functionality and service integration.',
            'Worked on database integration, JWT-based authentication and API documentation using Swagger.',
          ],
        },
        {
          name: 'MicroFinance Application',
          points: [
            'Built backend services for a MicroFinance mobile app using Java and Spring Boot, integrated with a Flutter frontend.',
            'Implemented loan management and record management modules.',
            'Tested and integrated REST APIs using Postman.',
          ],
        },
      ],
    },
  ],

  projects: [
    {
      icon: '📄',
      name: 'DocIntell – AI-Powered Document Intelligence',
      description: 'An AI-based system for document processing and semantic search.',
      tools: ['ASP.NET', 'PostgreSQL', 'pgvector'],
      points: ['Built ASP.NET backend services with PostgreSQL and pgvector for document retrieval.'],
    },
    {
      icon: '🎓',
      name: 'Hoolistem – Online Learning Platform',
      description: 'An e-learning platform where teachers sell lectures and students access learning materials.',
    },
    {
      icon: '🛠️',
      name: 'UrbanCompany – On-Demand Service Booking Platform',
      description: 'A platform connecting customers with home service professionals.',
      points: ['Built service discovery, booking and customer interaction features.'],
    },
    {
      icon: '👕',
      name: 'Uniquet – Clothing Manufacturer & Retailer Platform',
      description: 'A platform connecting clothing manufacturers and retailers.',
      points: ['Implemented product management and manufacturer–retailer workflows.'],
    },
    {
      icon: '📚',
      name: 'Study Room Application',
      description: 'An e-learning application with progress tracking and content suggestions.',
    },
  ],

  education: [
    { title: 'BE in Computer Engineering', place: 'Keystone School of Engineering · 2022 – 2026' },
    { title: 'HSC', place: 'R.R. Shinde Jr College · 2020 – 2022' },
    { title: 'SSC', place: 'Sadhana School · 2014 – 2020' },
  ],

  achievements: [
    'Runner-up, DIPEX National Level Hackathon',
    'InnoHack Hackathon – Healthcare Application',
  ],

  certifications: [
    'SQL Basics',
    'ReactJS Certification',
    'Spring MVC Architecture',
    'Azure DevOps Basic',
    'REST API Development',
    'SpringBoot Certification',
  ],

  quotes: [
    { text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', by: 'Martin Fowler' },
    { text: 'Make it work, make it right, make it fast.', by: 'Kent Beck' },
    { text: 'I don’t just want to write code that works. I want it to be clear, tested and easy for the next developer to build on.', by: 'Aditya Kale · my approach' },
  ],

  thanks: {
    title: 'Thank you for visiting',
    text: 'Thank you for taking the time to view my portfolio. I would love to talk about how I can help your team. Let’s build something great together.',
  },

  contact: {
    text: 'I’m open to Java Backend and Full Stack Developer roles. Send me a message and I’ll reply soon.',
    phone: '+91 7218801139',
    email: 'adityakale1755@gmail.com',
    location: 'Hadapsar, Pune, Maharashtra, India',
  },
}