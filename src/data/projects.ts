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
      "A full-stack web application to reduce food waste by connecting donors, recipients, and volunteers, with integrated AI for food assessment, demand forecasting, route optimization, and carbon impact estimation.",
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
    liveUrl: "https://github.com/vvebwizards/Web-Wizards-SustainaFood",
  },
  {
    id: 2,
    title: "Bank: Management of prepaid card requests",
    description:
      "A full-stack banking application for managing prepaid card requests with user authentication, request tracking, and admin validation workflows.",
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
    liveUrl:
      "https://github.com/RiahiYassinn/yassiinz-Asp.Net-Core-Web-API-DigiCard-Operations-with-Angular-16",
  },
  {
    id: 3,
    title: "AI Agent for Product Analysis and Promotion",
    description:
      "An AI-driven platform that analyzes product performance in real time, detects underperforming items, and automatically generates personalized promotional campaigns or bundling strategies. Integrated with Magento for live data, and powered by Mastra AI for smart decision-making.",
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
    liveUrl: "https://github.com/RiahiYassinn/AI-Agent-Product-Analysis-Promotion",
  },
  {
    id: 4,
    title: "Sotacib Commercial",
    description:
      "A mobile application for managing client visits and tracking points of sale, built for SOTACIB’s commercial team.",
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
    liveUrl: "https://github.com/RiahiYassinn/Sotacib_Commercial",
  },
  {
    id: 5,
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce application with product listings, shopping cart, user authentication, and payment processing.",
    image:
      "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
    githubUrl: "https://github.com/RiahiYassinn/E-Commerce-Platform",
    liveUrl: "https://github.com/RiahiYassinn/E-Commerce-Platform",
  },
];
