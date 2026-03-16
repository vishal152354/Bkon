export interface Candidate {
  id: string
  name: string
  email: string
  phone: string
  location: string
  linkedin: string
  portfolio: string
  skills: {
    technical: string[]
    soft: string[]
  }
  experience: {
    company: string
    role: string
    duration: string
    achievements: string[]
  }[]
  education: {
    degree: string
    university: string
    year: string
  }[]
  aiScore: number
  insights: {
    strengths: string[]
    weaknesses: string[]
    missingSkills: string[]
    recommendation: string
  }
}

export const candidates: Candidate[] = [
  {
    id: "1",
    name: "Sarah Chen",
    email: "sarah.chen@email.com",
    phone: "+1 (415) 555-0192",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/sarachen",
    portfolio: "sarachen.dev",
    skills: {
      technical: ["React", "TypeScript", "Node.js", "Python", "AWS", "PostgreSQL", "GraphQL", "Docker"],
      soft: ["Leadership", "Communication", "Problem Solving", "Team Collaboration"],
    },
    experience: [
      {
        company: "Stripe",
        role: "Senior Software Engineer",
        duration: "2021 - Present",
        achievements: [
          "Led migration of payment processing pipeline to microservices",
          "Reduced API response times by 40%",
          "Mentored 5 junior engineers",
        ],
      },
      {
        company: "Airbnb",
        role: "Software Engineer",
        duration: "2018 - 2021",
        achievements: [
          "Built real-time search optimization system",
          "Improved booking conversion by 15%",
        ],
      },
    ],
    education: [
      {
        degree: "M.S. Computer Science",
        university: "Stanford University",
        year: "2018",
      },
      {
        degree: "B.S. Computer Science",
        university: "UC Berkeley",
        year: "2016",
      },
    ],
    aiScore: 94,
    insights: {
      strengths: ["Strong technical leadership", "Full-stack expertise", "Enterprise experience"],
      weaknesses: ["Limited mobile development experience"],
      missingSkills: ["React Native", "Kubernetes"],
      recommendation: "Highly recommended for senior engineering roles. Exceptional track record at top-tier companies.",
    },
  },
  {
    id: "2",
    name: "Marcus Johnson",
    email: "marcus.j@email.com",
    phone: "+1 (212) 555-0847",
    location: "New York, NY",
    linkedin: "linkedin.com/in/marcusj",
    portfolio: "marcusjohnson.io",
    skills: {
      technical: ["Java", "Spring Boot", "Kafka", "Redis", "MySQL", "Terraform"],
      soft: ["Project Management", "Mentoring", "Strategic Thinking"],
    },
    experience: [
      {
        company: "Goldman Sachs",
        role: "VP of Engineering",
        duration: "2020 - Present",
        achievements: [
          "Managed team of 12 engineers",
          "Delivered real-time trading platform",
          "Reduced system downtime by 99.5%",
        ],
      },
      {
        company: "JPMorgan Chase",
        role: "Senior Developer",
        duration: "2016 - 2020",
        achievements: [
          "Built fraud detection system processing 1M+ transactions daily",
          "Led compliance automation initiative",
        ],
      },
    ],
    education: [
      {
        degree: "M.B.A.",
        university: "Columbia University",
        year: "2016",
      },
      {
        degree: "B.S. Computer Engineering",
        university: "Georgia Tech",
        year: "2013",
      },
    ],
    aiScore: 88,
    insights: {
      strengths: ["Financial domain expertise", "Team leadership", "System architecture"],
      weaknesses: ["Limited frontend experience", "No cloud-native background"],
      missingSkills: ["React", "Cloud Architecture", "CI/CD"],
      recommendation: "Strong candidate for engineering management roles in fintech.",
    },
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily.r@email.com",
    phone: "+1 (512) 555-0334",
    location: "Austin, TX",
    linkedin: "linkedin.com/in/emilyr",
    portfolio: "emilyrodriguez.design",
    skills: {
      technical: ["Figma", "React", "CSS", "Next.js", "Framer Motion", "Storybook"],
      soft: ["Design Thinking", "User Research", "Presentation", "Creativity"],
    },
    experience: [
      {
        company: "Vercel",
        role: "Design Engineer",
        duration: "2022 - Present",
        achievements: [
          "Designed and built component library used by 500+ projects",
          "Led redesign of dashboard interface",
        ],
      },
      {
        company: "Shopify",
        role: "UX Developer",
        duration: "2019 - 2022",
        achievements: [
          "Improved merchant onboarding flow, increasing completion by 25%",
          "Built accessibility testing framework",
        ],
      },
    ],
    education: [
      {
        degree: "B.F.A. Interactive Design",
        university: "Rhode Island School of Design",
        year: "2019",
      },
    ],
    aiScore: 91,
    insights: {
      strengths: ["Design-engineering hybrid", "Component architecture", "Accessibility expertise"],
      weaknesses: ["Limited backend experience"],
      missingSkills: ["Node.js", "Database Design", "API Development"],
      recommendation: "Excellent fit for design engineering or frontend architecture roles.",
    },
  },
  {
    id: "4",
    name: "David Kim",
    email: "david.kim@email.com",
    phone: "+1 (206) 555-0721",
    location: "Seattle, WA",
    linkedin: "linkedin.com/in/davidkim",
    portfolio: "dkim.dev",
    skills: {
      technical: ["Python", "TensorFlow", "PyTorch", "SQL", "Spark", "MLOps"],
      soft: ["Analytical Thinking", "Research", "Technical Writing"],
    },
    experience: [
      {
        company: "Amazon",
        role: "Machine Learning Engineer",
        duration: "2020 - Present",
        achievements: [
          "Built recommendation engine serving 100M+ users",
          "Published 3 research papers on NLP",
          "Reduced model inference latency by 60%",
        ],
      },
      {
        company: "Microsoft",
        role: "Data Scientist",
        duration: "2017 - 2020",
        achievements: [
          "Developed predictive analytics for Azure usage patterns",
          "Created automated anomaly detection system",
        ],
      },
    ],
    education: [
      {
        degree: "Ph.D. Machine Learning",
        university: "University of Washington",
        year: "2017",
      },
      {
        degree: "B.S. Mathematics",
        university: "MIT",
        year: "2013",
      },
    ],
    aiScore: 96,
    insights: {
      strengths: ["Deep ML expertise", "Research background", "Scale experience"],
      weaknesses: ["Limited web development skills"],
      missingSkills: ["React", "System Design", "DevOps"],
      recommendation: "Top candidate for ML/AI engineering leadership positions.",
    },
  },
  {
    id: "5",
    name: "Priya Patel",
    email: "priya.p@email.com",
    phone: "+1 (408) 555-0156",
    location: "San Jose, CA",
    linkedin: "linkedin.com/in/priyapatel",
    portfolio: "priyapatel.tech",
    skills: {
      technical: ["Go", "Kubernetes", "AWS", "Terraform", "Prometheus", "Linux"],
      soft: ["Incident Management", "Documentation", "Cross-team Collaboration"],
    },
    experience: [
      {
        company: "Google",
        role: "Site Reliability Engineer",
        duration: "2021 - Present",
        achievements: [
          "Maintained 99.99% uptime for critical services",
          "Automated infrastructure provisioning reducing setup time by 80%",
        ],
      },
      {
        company: "Netflix",
        role: "DevOps Engineer",
        duration: "2018 - 2021",
        achievements: [
          "Built CI/CD pipeline serving 200+ microservices",
          "Led chaos engineering initiatives",
        ],
      },
    ],
    education: [
      {
        degree: "B.S. Computer Science",
        university: "Carnegie Mellon University",
        year: "2018",
      },
    ],
    aiScore: 85,
    insights: {
      strengths: ["Infrastructure expertise", "Reliability engineering", "Automation"],
      weaknesses: ["Limited application development experience"],
      missingSkills: ["Frontend Development", "Product Thinking"],
      recommendation: "Strong candidate for SRE or platform engineering roles.",
    },
  },
  {
    id: "6",
    name: "Alex Thompson",
    email: "alex.t@email.com",
    phone: "+1 (312) 555-0489",
    location: "Chicago, IL",
    linkedin: "linkedin.com/in/alexthompson",
    portfolio: "alexthompson.com",
    skills: {
      technical: ["JavaScript", "Vue.js", "PHP", "Laravel", "MySQL"],
      soft: ["Client Management", "Agile", "Time Management"],
    },
    experience: [
      {
        company: "Freelance",
        role: "Full Stack Developer",
        duration: "2020 - Present",
        achievements: [
          "Delivered 30+ web applications for clients",
          "Built e-commerce platform generating $2M+ revenue",
        ],
      },
      {
        company: "Accenture",
        role: "Software Consultant",
        duration: "2017 - 2020",
        achievements: [
          "Led digital transformation for 3 Fortune 500 clients",
          "Implemented ERP integrations",
        ],
      },
    ],
    education: [
      {
        degree: "B.S. Information Systems",
        university: "University of Illinois",
        year: "2017",
      },
    ],
    aiScore: 72,
    insights: {
      strengths: ["Client-facing experience", "Versatile skill set", "Self-motivated"],
      weaknesses: ["Outdated tech stack", "No enterprise-scale experience"],
      missingSkills: ["React", "TypeScript", "Cloud Services", "Testing"],
      recommendation: "Consider for mid-level full-stack roles. May need upskilling on modern frameworks.",
    },
  },
]

export const analyticsData = {
  resumesOverTime: [
    { month: "Jan", count: 45 },
    { month: "Feb", count: 62 },
    { month: "Mar", count: 78 },
    { month: "Apr", count: 95 },
    { month: "May", count: 110 },
    { month: "Jun", count: 132 },
  ],
  topSkills: [
    { skill: "React", count: 45 },
    { skill: "Python", count: 38 },
    { skill: "TypeScript", count: 35 },
    { skill: "AWS", count: 30 },
    { skill: "Node.js", count: 28 },
    { skill: "SQL", count: 25 },
  ],
  scoreDistribution: [
    { range: "90-100", count: 12 },
    { range: "80-89", count: 28 },
    { range: "70-79", count: 35 },
    { range: "60-69", count: 18 },
    { range: "50-59", count: 7 },
  ],
  experienceDistribution: [
    { name: "0-2 years", value: 15 },
    { name: "3-5 years", value: 35 },
    { name: "6-10 years", value: 30 },
    { name: "10+ years", value: 20 },
  ],
}
