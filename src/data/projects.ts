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
    description: "A full-stack web application to reduce food waste by connecting donors, recipients, and volunteers, with integrated AI for food assessment, demand forecasting, Route Optimization , carbon impact estimation.",
    image: "src/assets/Capture d'écran 2025-05-17 155543.png",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Python ", "Flask","AI/ML", "JWT", "WebSockets"],
    githubUrl: "https://github.com/vvebwizards/Web-Wizards-SustainaFood",
    liveUrl: "https://github.com/vvebwizards/Web-Wizards-SustainaFood",
  },
  {
    id: 2,
    title: "Bank: Management of prepaid card requests",
    description: "A full-stack banking application for managing prepaid card requests with user authentication, request tracking, and admin validation workflows.",
    image: "src/assets/Prepaid-Credit-Card.jpg",
    technologies: ["Angular", ".Net Core", "C#", "Entity Framework" , "SQL Server" , "JWT" , "Bootstrap"],
    githubUrl: "https://github.com/RiahiYassinn/yassiinz-Asp.Net-Core-Web-API-DigiCard-Operations-with-Angular-16",
    liveUrl: "https://github.com/RiahiYassinn/yassiinz-Asp.Net-Core-Web-API-DigiCard-Operations-with-Angular-16",
  },
  {
    id: 4,
    title: "Sotacib Commercial",
    description: "A mobile application for managing client visits and tracking points of sale, built for SOTACIB’s commercial team .",
    image: "src/assets/portrait-de-l-homme-d-affaires-gestionnaire-d-age-moyen-reussi-tenant-une-tablette-dans-un-grand-entrepot-organisant-la-distribution.jpg",
    technologies: ["JavaScript", "React", "Next.js", "Capacitor","Tailwind CSS", "Leaflet Maps", "Lucide Icons"],
    githubUrl: "https://github.com/RiahiYassinn/Sotacib_Commercial",
    liveUrl: "https://github.com/RiahiYassinn/Sotacib_Commercial",
  },
  // {
  //   id: 4,
  //   title: "Social Media Dashboard",
  //   description: "A dashboard for analyzing social media metrics and performance across multiple platforms.",
  //   image: "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //   technologies: ["React", "Redux", "D3.js", "Social Media APIs"],
  //   githubUrl: "https://github.com/yourusername/social-media-dashboard",
  // },
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce application with product listings, shopping cart, user authentication, and payment processing.",
    image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
    githubUrl: "https://github.com/RiahiYassinn/E-Commerce-Platform",
    liveUrl: "https://github.com/RiahiYassinn/E-Commerce-Platform",
  },
];