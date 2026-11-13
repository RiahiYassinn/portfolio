export interface IProject {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export const projectsData: IProject[] = [
  {
    id: 1,
    title: "Food donation platform",
    description:
      "A full-stack food donation platform connecting donors, recipients, and volunteers. Its feature set includes AI-assisted food assessment, demand forecasting, route optimization, and carbon impact estimation.",
    image:
      "https://raw.githubusercontent.com/RiahiYassinn/portfolio/main/src/assets/Capture%20d%27%C3%A9cran%202025-05-17%20155543.png",
    technologies: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Python",
      "Flask",
      "AI/ML",
      "JWT",
      "WebSockets",
    ],
    githubUrl: "https://github.com/vvebwizards/Web-Wizards-SustainaFood",
  },
  {
    id: 2,
    title: "Waste2Product",
    description:
      "A Laravel reverse marketplace connecting waste generators with makers and repairers. The platform supports material reuse with AI-powered waste classification and impact analysis.",
    image:
      "https://images.pexels.com/photos/802221/pexels-photo-802221.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    technologies: [
      "Laravel",
      "PHP",
      "MySQL",
      "AI/ML",
      "REST API",
      "Blade",
      "Tailwind CSS",
    ],
  },
  {
    id: 3,
    title: "AI Agent for Product Analysis and Promotion",
    description:
      "An AI-driven product analysis tool that connects to Magento data, identifies underperforming products, and generates promotional or bundling suggestions. Built with Mastra AI and a PostgreSQL-backed application stack.",
    image:
      "https://raw.githubusercontent.com/RiahiYassinn/portfolio/refs/heads/main/src/assets/Analytics.png",
    technologies: [
      "TypeScript",
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "Prisma",
      "Docker",
      "Magento API",
      "Mastra AI",
      "Machine Learning",
    ],
    githubUrl: "https://github.com/RiahiYassinn/AI-Agent-Product-Analysis-Promotion",
  },
  {
    id: 4,
    title: "Sotacib Commercial",
    description:
      "A mobile application for SOTACIB’s commercial team to manage client visits and track points of sale, using map-based location views.",
    image:
      "https://raw.githubusercontent.com/RiahiYassinn/portfolio/main/src/assets/portrait-de-l-homme-d-affaires-gestionnaire-d-age-moyen-reussi-tenant-une-tablette-dans-un-grand-entrepot-organisant-la-distribution.jpg",
    technologies: [
      "JavaScript",
      "React",
      "Next.js",
      "Capacitor",
      "Tailwind CSS",
      "Leaflet Maps",
      "Lucide Icons",
    ],
    githubUrl: "https://github.com/RiahiYassinn/Sotacib_Commercial",
  },
  {
    id: 5,
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce application covering product listings, a shopping cart, user authentication, and Stripe payment processing.",
    image:
      "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
    githubUrl: "https://github.com/RiahiYassinn/E-Commerce-Platform",
  },
  {
    id: 6,
    title: "Bank: Management of prepaid card requests",
    description:
      "A banking workflow application for prepaid card requests, with JWT authentication, request tracking, and an administrator validation flow.",
    image:
      "https://raw.githubusercontent.com/RiahiYassinn/portfolio/main/src/assets/Prepaid-Credit-Card.jpg",
    technologies: [
      "Angular",
      ".Net Core",
      "C#",
      "Entity Framework",
      "SQL Server",
      "JWT",
      "Bootstrap",
    ],
    githubUrl:
      "https://github.com/RiahiYassinn/yassiinz-Asp.Net-Core-Web-API-DigiCard-Operations-with-Angular-16",
  },
];
