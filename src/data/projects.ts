export interface IProject {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  isFeatured?: boolean; // Optional flag to identify Dev.Lab's custom WarpCarousel view
}

export const projectsData: IProject[] = [
  {
    id: 0,
    title: "Dev.Lab",
    description:
      "Eliminates generic developer upskilling by analyzing real GitHub commit history to uncover skill gaps. Built on an event-driven microservices architecture, it uses RAG pipelines to generate tailored learning paths, validate skills via automated quizzes, and streamline 1-on-1 mentorship booking.",
    image:
      "https://raw.githubusercontent.com/RiahiYassinn/portfolio/refs/heads/main/src/assets/cyber-security-expert-working-with-technology-neon-lights_23-2151645607.avif", 
    technologies: [
      "Next.js",
      "NestJS",
      "FastAPI",
      "Kafka",
      "PostgreSQL",
      "MongoDB",
      "RAG",
      "LLMs",
      "Docker",
      "CI/CD Pipline"
    ],
    githubUrl: "https://github.com/RiahiYassinn", // Update if you have a specific repo link
    isFeatured: true,
  },
  {
    id: 1,
    title: "AI Agent for Product Analysis and Promotion",
    description:
      "Solves slow manual catalog audits and stagnant e-commerce inventory by autonomously analyzing Magento store data. It pinpoints underperforming SKUs and generates data-backed discounting and product-bundling strategies to accelerate stock turnover and boost conversion rates.",
    image:
      "https://raw.githubusercontent.com/RiahiYassinn/portfolio/refs/heads/main/src/assets/variety-people-multitasking-3d-cartoon-scene_23-2151294550.avif",
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
    githubUrl:
      "https://github.com/RiahiYassinn/AI-Agent-Product-Analysis-Promotion",
  },
  {
    id: 2,
    title: "SustainaFood",
    description:
      "Bridges the logistics gap between surplus food donors, charities, and volunteers to reduce preventable food waste. Combines AI food quality assessment, demand forecasting, real-time pickup route optimization, and carbon-offset tracking to get perishable food delivered before spoilage.",
    image:
      "https://raw.githubusercontent.com/RiahiYassinn/portfolio/refs/heads/main/src/assets/istockphoto-1094461256-612x612.jpg",
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
    id: 3,
    title: "Waste2Product",
    description:
      "Diverts reusable industrial and household materials from landfills by connecting waste generators directly with local makers and repairers. Uses AI image classification to categorize discarded materials and quantify environmental savings per transaction.",
    image:
      "https://raw.githubusercontent.com/RiahiYassinn/portfolio/refs/heads/main/src/assets/waste-management-concept-illustration_114360-8685.avif",
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
    id: 4,
    title: "Sotacib Commercial",
    description:
      "Replaces manual paper tracking for SOTACIB’s field sales reps with a cross-platform mobile tool. Provides interactive map-based point-of-sale visualization and visit logging, improving territory coverage, route planning, and field reporting accuracy.",
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
      "Delivers an end-to-end digital storefront engineered to eliminate checkout friction and manual order handling. Integrates real-time cart state management, role-based authentication, and secure Stripe payment webhooks for automated order fulfillment.",
    image:
      "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
    githubUrl: "https://github.com/RiahiYassinn/E-Commerce-Platform",
  },
  {
    id: 6,
    title: "Bank: Management of prepaid card requests",
    description:
      "Digitizes bottlenecked branch-level prepaid card applications into an auditable self-service banking workflow. Automates request submission, real-time status tracking, and role-based admin validation to cut processing turnaround times.",
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