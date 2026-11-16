import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { FC, PropsWithChildren } from "react";

export type Language = "en" | "fr";

const messages: Record<Language, Record<string, string>> = {
  en: {
    "nav.about": "About",
    "nav.skills": "Skills",
    "nav.education": "Education",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "nav.main": "Main navigation",
    "nav.mobile": "Mobile navigation",
    "nav.resume": "Resume",
    "nav.viewResume": "View resume",
    "nav.switchTo": "Switch language to French",
    "nav.language": "Language",
    "nav.closeMenu": "Close navigation menu",
    "nav.openMenu": "Open navigation menu",
    "nav.home": "Yassine Riahi, home",
    "theme.light": "Switch to light mode",
    "theme.dark": "Switch to dark mode",
    "hero.degree": "Computer Science Engineer · Recent graduate",
    "hero.hello": "Hello, I’m Yassine Riahi.",
    "hero.title": "I build useful software",
    "hero.titleAccent": "for the web.",
    "hero.description":
      "Software engineer crafting exceptional digital experiences. Ready to tackle complex technical challenges in a full-time software engineering role.",
    "hero.work": "View My Work",
    "hero.contact": "Get in touch",
    "hero.match": "Evaluate JD Match",
    "hero.fullStack": "Full-stack engineering",
    "hero.ai": "Applied AI",
    "chat.thinking": "Thinking",
    "chat.speaking": "Speaking",
    "chat.ready": "Ready to chat",
    "chat.guide": "Portfolio guide",
    "chat.aboutYassine": "Ask me about Yassine’s work",
    "chat.askExperience": "Ask about my experience",
    "chat.skillsProjects": "Skills, projects, education, and more",
    "chat.voiceOn": "Retro Robot voice on",
    "chat.voiceOff": "Voice off",
    "chat.voiceOnTitle": "AI English voice replies on",
    "chat.voiceOffTitle": "AI English voice replies off",
    "chat.voiceRepliesOn": "Turn AI voice replies off",
    "chat.voiceRepliesOff": "Turn AI voice replies on",
    "chat.generatingVoice": "Generating the English voice response…",
    "chat.welcome":
      "Hi! Ask me about my background, skills, or End-of-Studies Project.",
    "chat.readAloud": "Read answer aloud",
    "chat.preparing": "Preparing a reply",
    "chat.listening": "Listening... speak your question",
    "chat.placeholder": "Ask a question...",
    "chat.askGuide": "Ask the portfolio guide a question",
    "chat.stopVoice": "Stop voice input",
    "chat.askVoice": "Ask using your voice",
    "chat.stopListening": "Stop listening",
    "chat.send": "Send question",
    "chat.scrollAbout": "Scroll to about section",
    "chat.error":
      "I can’t reach the portfolio assistant right now. Please try again in a moment or use the Contact section.",
    "voice.unsupported":
      "Voice input isn't supported in this browser. Try a browser with speech recognition support, or type your question.",
    "voice.denied":
      "Microphone access was blocked. Allow microphone access in your browser settings to use voice input.",
    "voice.noSpeech": "I didn't catch that. Tap the microphone and try again.",
    "voice.failed":
      "Voice input couldn't start. Please try again or type your question.",
    "voice.playbackFailed":
      "Voice playback failed. Use the speaker button to try again.",
    "suggestion.devLab":
      "Tell me about Dev.Lab & its microservices architecture",
    "suggestion.stack": "What is your tech stack (Backend, Frontend, AI)?",
    "suggestion.quality": "How do you handle CI/CD and testing?",
    "suggestion.remote": "Are you open to remote or international roles?",
    "match.title": "Recruiter JD Fit Evaluator",
    "match.subtitle":
      "Paste a job description to instantly analyze Yassine’s technical fit & alignment.",
    "match.label": "Job Description / Requirements",
    "match.placeholder":
      "Paste the job description here (e.g., Looking for a Backend Engineer with NestJS, Kafka, Docker experience...)",
    "match.cancel": "Cancel",
    "match.loading": "Analyzing Fit...",
    "match.submit": "Generate Match Report",
    "match.role": "Evaluated Role",
    "match.assessment": "Executive Assessment",
    "match.skills": "Matching Skills",
    "match.gaps": "Growth Areas / Gaps",
    "match.noGaps": "No major gaps identified!",
    "match.projects": "Project Alignment",
    "match.again": "Evaluate Another JD",
    "match.close": "Close modal",
    "match.error": "Something went wrong.",
    "about.title": "About Me",
    "about.subtitle": "Engineer by training, curious by nature.",
    "about.role": "Software & AI Engineer",
    "about.open": "Open to full-time opportunities",
    "about.heading": "Building scalable software and intelligent systems.",
    "about.p1":
      "I’m a Computer Science Engineering graduate working at the intersection of",
    "about.emphasis": "full-stack software engineering and applied AI",
    "about.p1b":
      ". I enjoy building end-to-end applications—from responsive interfaces and resilient APIs to event-driven services and AI-powered workflows.",
    "about.p2":
      "Whether designing clean system architectures or integrating large language models and RAG pipelines into production, I focus on turning complex problems into reliable, user-friendly software. I’m currently looking for full-time roles where I can contribute to impactful products from day one.",
    "about.areas": "Areas I focus on",
    "about.area1": "Full-stack web development",
    "about.area2": "Applied AI & LLM integration",
    "about.area3": "Scalable software architecture",
    "about.area4": "Event-driven & RAG systems",
    "skills.title": "Skills & Expertise",
    "skills.subtitle":
      "Technologies and architectural patterns I use to build scalable systems.",
    "skills.frontend": "Frontend Development",
    "skills.backend": "Backend Engineering",
    "skills.ai": "Applied AI",
    "skills.architecture": "System Architecture",
    "skills.data": "Databases & Data",
    "skills.devops": "DevOps & Workflow",
    "education.title": "Education",
    "education.subtitle": "Academic background and selected credentials.",
    "education.degree": "Computer Science Engineering Degree",
    "education.school":
      "Private Higher School of Engineering and Technology (ESPRIT)",
    "education.graduate": "Graduate",
    "education.degreeDescription":
      "Computer Science Engineering graduate with highest honors, specializing in scalable systems design, software architecture, and applied AI integration.",
    "education.certifications": "Certifications",
    "education.professional": "Professional development",
    "education.certDescription":
      "Selected certifications and learning credentials.",
    "education.bac": "Baccalaureate in Experimental Science",
    "education.highSchool": "Mahmoud Messaidi High School, Majaz Al Bab",
    "education.subjects": "Subjects studied",
    "projects.title": "Selected Projects",
    "projects.subtitle":
      "Swipe or scroll through full-stack systems, microservices architectures, and applied AI products.",
    "projects.previous": "Previous project",
    "projects.next": "Next project",
    "projects.technologies": "technologies",
    "projects.goTo": "Go to",
    "projects.badge1": "01 / FLAGSHIP",
    "projects.badge2": "02 / AI AGENT",
    "projects.badge3": "03 / AI & FULL-STACK",
    "projects.badge4": "04 / MARKETPLACE",
    "projects.badge5": "05 / MOBILE & MAPS",
    "projects.badge6": "06 / E-COMMERCE",
    "projects.badge7": "07 / FINTECH",
    "project.title1": "Dev.Lab",
    "project.description1":
      "Eliminates generic developer upskilling by analyzing real GitHub commit history to uncover skill gaps. Built on an event-driven microservices architecture, it uses RAG pipelines to generate tailored learning paths, validate skills via automated quizzes, and streamline 1-on-1 mentorship booking.",
    "project.title2": "AI Agent for Product Analysis and Promotion",
    "project.description2":
      "Solves slow manual catalog audits and stagnant e-commerce inventory by autonomously analyzing Magento store data. It pinpoints underperforming SKUs and generates data-backed discounting and product-bundling strategies to accelerate stock turnover and boost conversion rates.",
    "project.title3": "SustainaFood",
    "project.description3":
      "Bridges the logistics gap between surplus food donors, charities, and volunteers to reduce preventable food waste. Combines AI food quality assessment, demand forecasting, real-time pickup route optimization, and carbon-offset tracking to get perishable food delivered before spoilage.",
    "project.title4": "Waste2Product",
    "project.description4":
      "Diverts reusable industrial and household materials from landfills by connecting waste generators directly with local makers and repairers. Uses AI image classification to categorize discarded materials and quantify environmental savings per transaction.",
    "project.title5": "Sotacib Commercial",
    "project.description5":
      "Replaces manual paper tracking for SOTACIB’s field sales reps with a cross-platform mobile tool. Provides interactive map-based point-of-sale visualization and visit logging, improving territory coverage, route planning, and field reporting accuracy.",
    "project.title6": "E-Commerce Platform",
    "project.description6":
      "Delivers an end-to-end digital storefront engineered to eliminate checkout friction and manual order handling. Integrates real-time cart state management, role-based authentication, and secure Stripe payment webhooks for automated order fulfillment.",
    "project.title7": "Bank: Management of prepaid card requests",
    "project.description7":
      "Digitizes bottlenecked branch-level prepaid card applications into an auditable self-service banking workflow. Automates request submission, real-time status tracking, and role-based admin validation to cut processing turnaround times.",
    "contact.title": "Get in Touch",
    "contact.subtitle":
      "Have a project or an idea to discuss? I’d be glad to hear from you.",
    "contact.hello": "Say hello",
    "contact.heading": "Let’s start a conversation.",
    "contact.intro":
      "I’m a Computer Science Engineer and recent graduate focused on full-stack development and applied AI. Reach out about a role, a project, or a technical conversation.",
    "contact.sendTitle": "Send me a message",
    "contact.reply": "I’ll get back to you as soon as I can.",
    "contact.name": "Your name",
    "contact.email": "Email address",
    "contact.subject": "Subject",
    "contact.message": "Message",
    "contact.send": "Send message",
    "contact.sending": "Sending…",
    "contact.success": "Thanks for your message. I’ll get back to you soon.",
    "contact.error":
      "Your message could not be sent. Please try again or email me directly.",
    "contact.location": "Location",
    "footer.social": "Social links",
    "footer.credit": "Designed and built with React.",
  },
  fr: {
    "nav.about": "À propos",
    "nav.skills": "Compétences",
    "nav.education": "Formation",
    "nav.projects": "Projets",
    "nav.contact": "Contact",
    "nav.main": "Navigation principale",
    "nav.mobile": "Navigation mobile",
    "nav.resume": "CV ",
    "nav.viewResume": "Voir le CV ",
    "nav.switchTo": "Passer en anglais",
    "nav.language": "Langue",
    "nav.closeMenu": "Fermer le menu de navigation",
    "nav.openMenu": "Ouvrir le menu de navigation",
    "nav.home": "Yassine Riahi, accueil",
    "theme.light": "Passer au thème clair",
    "theme.dark": "Passer au thème sombre",
    "hero.degree": "Ingénieur en informatique · Jeune diplômé",
    "hero.hello": "Bonjour, je suis Yassine Riahi.",
    "hero.title": "Je crée des logiciels utiles",
    "hero.titleAccent": "pour le web.",
    "hero.description":
      "Ingénieur logiciel, je conçois des expériences numériques de qualité. Prêt à relever des défis techniques complexes dans le cadre d’un poste à temps plein.",
    "hero.work": "Voir mes projets",
    "hero.contact": "Me contacter",
    "hero.match": "Évaluer la compatibilité",
    "hero.fullStack": "Développement full-stack",
    "hero.ai": "Intelligence artificielle appliquée",
    "chat.thinking": "Réflexion",
    "chat.speaking": "Parle",
    "chat.ready": "Prêt à discuter",
    "chat.guide": "Assistant du portfolio",
    "chat.aboutYassine": "Interrogez-moi sur le parcours de Yassine",
    "chat.askExperience": "Posez vos questions sur mon expérience",
    "chat.skillsProjects": "Compétences, projets, formation et plus",
    "chat.voiceOn": "Voix rétro activée",
    "chat.voiceOff": "Voix désactivée",
    "chat.voiceOnTitle": "Réponses vocales IA en anglais activées",
    "chat.voiceOffTitle": "Réponses vocales IA en anglais désactivées",
    "chat.voiceRepliesOn": "Désactiver les réponses vocales IA",
    "chat.voiceRepliesOff": "Activer les réponses vocales IA",
    "chat.generatingVoice": "Génération de la réponse vocale en anglais…",
    "chat.welcome":
      "Bonjour ! Posez-moi vos questions sur mon parcours, mes compétences ou mon projet de fin d’études.",
    "chat.readAloud": "Lire la réponse à voix haute",
    "chat.preparing": "Préparation d’une réponse",
    "chat.listening": "Écoute en cours… posez votre question",
    "chat.placeholder": "Posez une question…",
    "chat.askGuide": "Interroger l’assistant du portfolio",
    "chat.stopVoice": "Arrêter la saisie vocale",
    "chat.askVoice": "Poser une question à voix haute",
    "chat.stopListening": "Arrêter l’écoute",
    "chat.send": "Envoyer la question",
    "chat.scrollAbout": "Faire défiler jusqu’à la section À propos",
    "chat.error":
      "L’assistant du portfolio est momentanément indisponible. Réessayez dans un instant ou utilisez la section Contact.",
    "voice.unsupported":
      "La saisie vocale n’est pas prise en charge par ce navigateur. Utilisez un navigateur compatible ou saisissez votre question.",
    "voice.denied":
      "L’accès au microphone a été refusé. Autorisez-le dans les paramètres du navigateur pour utiliser la saisie vocale.",
    "voice.noSpeech":
      "Je n’ai pas bien entendu. Appuyez sur le microphone et réessayez.",
    "voice.failed":
      "La saisie vocale n’a pas pu démarrer. Réessayez ou saisissez votre question.",
    "voice.playbackFailed":
      "La lecture vocale a échoué. Appuyez sur le haut-parleur pour réessayer.",
    "suggestion.devLab":
      "Parlez-moi de Dev.Lab et de son architecture microservices",
    "suggestion.stack":
      "Quelle est votre stack technique (backend, frontend, IA) ?",
    "suggestion.quality": "Comment gérez-vous la CI/CD et les tests ?",
    "suggestion.remote":
      "Êtes-vous ouvert au télétravail ou à l’international ?",
    "match.title": "Évaluation de compatibilité avec une offre",
    "match.subtitle":
      "Collez une offre d’emploi pour analyser la compatibilité avec le profil de Yassine.",
    "match.label": "Offre d’emploi / Exigences",
    "match.placeholder":
      "Collez l’offre d’emploi ici (ex. : recherche un ingénieur backend avec NestJS, Kafka et Docker…)",
    "match.cancel": "Annuler",
    "match.loading": "Analyse en cours…",
    "match.submit": "Générer le rapport",
    "match.role": "Poste évalué",
    "match.assessment": "Évaluation générale",
    "match.skills": "Compétences correspondantes",
    "match.gaps": "Axes de progression / Écarts",
    "match.noGaps": "Aucun écart majeur identifié !",
    "match.projects": "Adéquation des projets",
    "match.again": "Évaluer une autre offre",
    "match.close": "Fermer la fenêtre",
    "match.error": "Une erreur est survenue.",
    "about.title": "À propos de moi",
    "about.subtitle": "Ingénieur de formation, curieux de nature.",
    "about.role": "Ingénieur logiciel et IA",
    "about.open": "À la recherche d’un poste à temps plein",
    "about.heading":
      "Je conçois des logiciels évolutifs et des systèmes intelligents.",
    "about.p1":
      "Diplômé en ingénierie informatique, je travaille à la croisée du",
    "about.emphasis": "développement logiciel full-stack et de l’IA appliquée",
    "about.p1b":
      ". J’aime concevoir des applications de bout en bout : interfaces adaptatives, API fiables, services événementiels et flux de travail basés sur l’IA.",
    "about.p2":
      "De la conception d’architectures claires à l’intégration de grands modèles de langage et de pipelines RAG en production, je transforme des problèmes complexes en logiciels fiables et agréables à utiliser. Je recherche actuellement un poste à temps plein pour contribuer dès le premier jour à des produits utiles.",
    "about.areas": "Mes domaines de prédilection",
    "about.area1": "Développement web full-stack",
    "about.area2": "IA appliquée et intégration de LLM",
    "about.area3": "Architecture logicielle évolutive",
    "about.area4": "Systèmes événementiels et RAG",
    "skills.title": "Compétences et expertise",
    "skills.subtitle":
      "Technologies et modèles d’architecture utilisés pour créer des systèmes évolutifs.",
    "skills.frontend": "Développement frontend",
    "skills.backend": "Ingénierie backend",
    "skills.ai": "IA appliquée",
    "skills.architecture": "Architecture système",
    "skills.data": "Bases de données et données",
    "skills.devops": "DevOps et méthodes de travail",
    "education.title": "Formation",
    "education.subtitle":
      "Parcours universitaire et certifications sélectionnées.",
    "education.degree": "Diplôme d’ingénieur en informatique",
    "education.school":
      "École supérieure privée d’ingénierie et de technologie (ESPRIT)",
    "education.graduate": "Diplômé",
    "education.degreeDescription":
      "Ingénieur en informatique diplômé avec mention Excellent , spécialisé en conception de systèmes scalables, architecture logicielle et intégration d'IA appliquée.",
    "education.certifications": "Certifications",
    "education.professional": "Développement professionnel",
    "education.certDescription": "Certifications et formations sélectionnées.",
    "education.bac": "Baccalauréat en sciences expérimentales",
    "education.highSchool": "Lycée Mahmoud Messaidi, Majaz Al Bab",
    "education.subjects": "Matières étudiées",
    "projects.title": "Projets sélectionnés",
    "projects.subtitle":
      "Découvrez des systèmes full-stack, des architectures microservices et des produits d’IA appliquée.",
    "projects.previous": "Projet précédent",
    "projects.next": "Projet suivant",
    "projects.technologies": "technologies",
    "projects.goTo": "Aller au projet",
    "projects.badge1": "01 / PROJET PHARE",
    "projects.badge2": "02 / AGENT IA",
    "projects.badge3": "03 / IA ET FULL-STACK",
    "projects.badge4": "04 / MARKETPLACE",
    "projects.badge5": "05 / MOBILE ET CARTOGRAPHIE",
    "projects.badge6": "06 / E-COMMERCE",
    "projects.badge7": "07 / FINTECH",
    "project.title1": "Dev.Lab",
    "project.description1":
      "Évite les formations génériques en analysant l’historique réel des commits GitHub afin de détecter les lacunes de compétences. Fondé sur une architecture microservices événementielle, le projet utilise des pipelines RAG pour créer des parcours d’apprentissage personnalisés, évaluer les compétences avec des quiz automatisés et faciliter la réservation de séances de mentorat.",
    "project.title2": "Agent IA d’analyse et de promotion de produits",
    "project.description2":
      "Automatise l’analyse des catalogues Magento pour accélérer la rotation des stocks e-commerce. L’agent repère les produits les moins performants et propose des remises et des offres groupées fondées sur les données afin d’améliorer les ventes et les conversions.",
    "project.title3": "SustainaFood",
    "project.description3":
      "Relie les donateurs de surplus alimentaires, les associations et les bénévoles afin de réduire le gaspillage. Le projet combine évaluation de la qualité des aliments par IA, prévision de la demande, optimisation des itinéraires en temps réel et suivi de l’empreinte carbone pour livrer les denrées avant leur péremption.",
    "project.title4": "Waste2Product",
    "project.description4":
      "Évite la mise en décharge de matériaux réutilisables en mettant en relation les détenteurs de déchets avec des artisans et réparateurs locaux. Une classification d’images par IA catégorise les matériaux et mesure les économies environnementales réalisées.",
    "project.title5": "Sotacib Commercial",
    "project.description5":
      "Remplace le suivi papier des équipes commerciales de SOTACIB par une application mobile multiplateforme. Elle propose une cartographie interactive des points de vente et le suivi des visites, afin d’améliorer la couverture du territoire, la planification des itinéraires et la qualité des rapports.",
    "project.title6": "Plateforme e-commerce",
    "project.description6":
      "Boutique en ligne complète conçue pour simplifier le paiement et le traitement des commandes. Elle intègre un panier en temps réel, une authentification par rôle et des webhooks Stripe sécurisés pour automatiser le traitement des commandes.",
    "project.title7": "Banque : gestion des demandes de cartes prépayées",
    "project.description7":
      "Transforme les demandes de cartes prépayées en agence en un parcours bancaire en libre-service et traçable. Automatise la soumission des demandes, le suivi en temps réel et la validation par les administrateurs afin de réduire les délais de traitement.",
    "contact.title": "Me contacter",
    "contact.subtitle":
      "Un projet ou une idée à discuter ? Je serais ravi d’en parler.",
    "contact.hello": "Écrivez-moi",
    "contact.heading": "Commençons la conversation.",
    "contact.intro":
      "Ingénieur en informatique et jeune diplômé, je me spécialise dans le développement full-stack et l’IA appliquée. Contactez-moi pour un poste, un projet ou une discussion technique.",
    "contact.sendTitle": "Envoyez-moi un message",
    "contact.reply": "Je vous répondrai dès que possible.",
    "contact.name": "Votre nom",
    "contact.email": "Adresse e-mail",
    "contact.subject": "Objet",
    "contact.message": "Message",
    "contact.send": "Envoyer le message",
    "contact.sending": "Envoi…",
    "contact.success": "Merci pour votre message. Je vous répondrai bientôt.",
    "contact.error":
      "Votre message n’a pas pu être envoyé. Réessayez ou écrivez-moi directement.",
    "contact.location": "Lieu",
    "footer.social": "Réseaux sociaux",
    "footer.credit": "Conçu et développé avec React.",
  },
};

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export const LanguageProvider: FC<PropsWithChildren> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() =>
    typeof window !== "undefined" && localStorage.getItem("language") === "fr"
      ? "fr"
      : "en",
  );

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
    document.title =
      language === "fr"
        ? "Riahi Yassine | Ingénieur logiciel"
        : "Riahi Yassine | Software Engineer";
    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute(
      "content",
      language === "fr"
        ? "Yassine Riahi est ingénieur en informatique, spécialisé en développement full-stack et applications d’intelligence artificielle."
        : "Yassine Riahi is a Computer Science Engineer and recent graduate focused on full-stack development and AI-powered applications.",
    );
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: (key: string) => messages[language][key] ?? messages.en[key] ?? key,
    }),
    [language],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error("useLanguage must be used within LanguageProvider.");
  return context;
}
