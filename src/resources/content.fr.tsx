import type {
  About,
  Blog,
  Contact,
  Gallery,
  Home,
  Newsletter,
  Person,
  Services,
  Social,
  Work,
} from "@/types";
import { SmartLink, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Mouad",
  lastName: "Chaouni",
  name: "Mouad Chaouni",
  // Localisation, not translation: "Platform Engineer" has no settled French
  // equivalent, while "Cloud" is the term the French and Moroccan markets
  // actually search for — and it matches the wording of the French CV.
  role: "Ingénieur Backend & Cloud",
  avatar: "/images/mouad-chaouni.jpg",
  email: "mdchaouni@gmail.com",
  location: "Africa/Casablanca", // identifiant de fuseau horaire IANA
  languages: ["Arabe", "Français", "Anglais"],
  locale: "fr", // balise BCP 47 pour l'attribut lang du HTML
};

const newsletter: Newsletter = {
  display: false,
  title: <>Abonnez-vous à la newsletter de {person.firstName}</>,
  description: <>Ma newsletter hebdomadaire sur l'ingénierie et la création</>,
};

const social: Social = [
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/Mouad852",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/mouad-chaouni/",
    essential: true,
  },
  {
    name: "GitLab",
    icon: "gitlab",
    link: "https://gitlab.com/pitstop-mouad-chaouni",
    essential: false,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Accueil",
  title: `${person.name} — ${person.role}`,
  description:
    "Ingénieur backend et cloud à Rabat, Maroc. Je conçois des systèmes multi-tenants sécurisés en Java et Spring Boot, et je les mets en production sur Kubernetes avec CI/CD, observabilité et infrastructure as code.",
  headline: <>Ingénieur Backend & Cloud</>,
  featured: {
    display: true,
    title: (
      <Text onBackground="brand-medium" marginRight="4">
        <strong className="ml-4">MedCore</strong> — essayez la démo en ligne
      </Text>
    ),
    href: "/work/medcore",
  },
  subline: (
    <>
      Je suis {person.firstName}. Je construis des applications web de bout en bout — l'interface,
      le backend qui la sert, et le pipeline qui les met en production. D'une simple API à une
      plateforme multi-tenant sécurisée.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "À propos",
  title: `À propos – ${person.name}`,
  description: `${person.role} basé à Rabat, Maroc. Java, Spring Boot, Kubernetes et livraison sécurisée.`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  resume: {
    display: true,
    label: "Télécharger le CV",
    url: "/cv/Mouad_Chaouni_CV_FR.pdf",
  },
  calendar: {
    display: false,
    link: "",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Je construis des plateformes backend et je les mets en production. Cela couvre tout le
        chemin : le service Spring Boot et son modèle d'autorisation, le pipeline qui le teste et le
        déploie, l'infrastructure sur laquelle il tourne, et les tableaux de bord qui prouvent qu'il
        se porte bien. L'essentiel de mon travail tourne autour des systèmes multi-tenants et du
        contrôle d'accès, où une erreur coûte cher et où « ça devrait aller » n'est pas une réponse.
      </>
    ),
  },
  work: {
    display: true,
    title: "Expérience professionnelle",
    experiences: [
      {
        company: "SYNERTIC",
        timeframe: "Juin – Août 2026",
        role: "Stagiaire Ingénieur Backend & DevOps",
        achievements: [
          <>
            Conception de l'architecture d'autorisation d'une{" "}
            <strong>plateforme SaaS multi-tenant</strong> en Java 21 et Spring Boot 4 — identité
            déléguée à Keycloak, décisions de politique à Cerbos, RBAC et ABAC appliqués
            conjointement et isolation stricte des tenants au niveau de l'API.
          </>,
          <>
            Mise en place de la chaîne CI/CD GitLab de bout en bout : builds d'images avec Kaniko,
            analyse de vulnérabilités avec Trivy, déploiement automatisé et tâches de maintenance
            planifiées, avec <strong>729 tests</strong> exécutés à chaque pipeline.
          </>,
          <>
            Déploiement et exploitation de la plateforme conteneurisée sur Oracle Cloud avec
            Prometheus, Grafana et Loki, et automatisation du déploiement, des sauvegardes et des
            alertes avec Ansible. Charge validée à <strong>186 requêtes par seconde</strong> pour
            une latence <strong>p95 de 79 ms</strong>.
          </>,
          <>
            Publication de <strong>5 SDK clients</strong> — TypeScript, Python, Java, .NET et Go —
            validés par une suite de conformité partagée garantissant un comportement identique dans
            chaque langage d'une version à l'autre. Deux applications clientes sont passées en
            production avec ces SDK.
          </>,
          <>
            Développement de la console d'administration en React et TypeScript, incluant un éditeur
            visuel de workflows d'approbation BPMN (bpmn-js sur un moteur Flowable) relié au moteur
            de workflow backend.
          </>,
        ],
        images: [],
      },
      {
        company: "Startup en amorçage (France, à distance)",
        timeframe: "Juillet – Août 2025",
        role: "Stagiaire Développeur Full Stack",
        achievements: [
          <>
            Développement d'un <strong>module Campaign sécurisé</strong> — plus de 8 endpoints REST
            en NestJS, Prisma et MongoDB — couvrant la gestion des statuts, les workflows métier et
            la sécurisation de l'API par jetons JWT d'accès et de rafraîchissement.
          </>,
          <>Travail dans un workflow Git collaboratif, avec revue de code sur chaque changement.</>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "Formation & certification",
    institutions: [
      {
        name: "INPT — Institut National des Postes et Télécommunications, Rabat",
        description: (
          <>
            Cycle ingénieur en Systèmes Ubiquitaires et Distribués, spécialité Cloud & IoT. 2024 –
            2027.
          </>
        ),
      },
      {
        name: "CPGE Ibn Timiya, Marrakech",
        description: (
          <>
            Classes préparatoires aux grandes écoles, filière mathématiques et physique (MPSI / MP).
            2022 – 2024.
          </>
        ),
      },
      {
        name: "Oracle Cloud Infrastructure Foundations Associate",
        description: (
          <>
            Certifié en octobre 2025 —{" "}
            <SmartLink href="https://catalog-education.oracle.com/pls/certview/sharebadge?id=18405CC30BE250C13C15C4FC2452776928715E42D1CDFC6B37C4B761F37C04A4">
              vérifier le badge
            </SmartLink>
            .
          </>
        ),
      },
    ],
  },
  technical: {
    display: true,
    title: "Compétences techniques",
    skills: [
      {
        title: "Backend & API",
        description: (
          <>
            Java 21 et Spring Boot pour des services qui doivent rester corrects sous charge —
            Spring Security en resource server OAuth2, Hibernate et JPA, migrations Flyway, Spring
            Cloud Gateway. REST avec OpenAPI, ainsi que gRPC et NestJS lorsqu'ils conviennent mieux.
          </>
        ),
        tags: [
          { name: "Java 21", icon: "java" },
          { name: "Spring Boot", icon: "spring" },
          { name: "PostgreSQL", icon: "postgresql" },
          { name: "NestJS", icon: "nestjs" },
          { name: "Node.js", icon: "nodejs" },
        ],
        images: [],
      },
      {
        title: "Frontend",
        description: (
          <>
            Assez de React pour construire l'interface que mérite un backend : React 19 et
            TypeScript avec TanStack Query pour l'état serveur, Vite et Tailwind. Récemment, une
            interface d'administration à sept rôles où chaque rôle voit une application réellement
            différente.
          </>
        ),
        tags: [
          { name: "React", icon: "react" },
          { name: "TypeScript", icon: "typescript" },
          { name: "Tailwind", icon: "tailwind" },
        ],
        images: [],
      },
      {
        title: "Identité & autorisation",
        description: (
          <>
            La partie que la plupart des équipes ratent. Keycloak pour l'identité, Cerbos comme
            point de décision de politique, OAuth2 Authorization Code avec PKCE, et RBAC combiné à
            ABAC. Isolation multi-tenant et conception fail-closed : face à une requête ambiguë, la
            réponse par défaut est « non ».
          </>
        ),
        tags: [
          { name: "Keycloak", icon: "keycloak" },
          { name: "OAuth2 / OIDC", icon: "security" },
          { name: "RBAC + ABAC", icon: "security" },
        ],
        images: [],
      },
      {
        title: "Cloud & infrastructure",
        description: (
          <>
            Conteneurs et orchestration en conditions réelles : Docker, Kubernetes, Helm, Argo CD
            pour le GitOps et Istio pour un service mesh en TLS mutuel. Infrastructure décrite en
            code avec Terraform sur AWS EKS et RDS, et Ansible pour la configuration. Certifié
            Oracle Cloud.
          </>
        ),
        tags: [
          { name: "Kubernetes", icon: "kubernetes" },
          { name: "Docker", icon: "docker" },
          { name: "Terraform", icon: "terraform" },
          { name: "AWS", icon: "aws" },
          { name: "Argo CD", icon: "argocd" },
          { name: "Istio", icon: "istio" },
        ],
        images: [],
      },
      {
        title: "CI/CD & DevSecOps",
        description: (
          <>
            Des pipelines qui refusent de livrer du code cassé ou vulnérable : détection de secrets
            avec Gitleaks, analyse statique avec SonarQube, scan de conteneurs avec Trivy et tests
            dynamiques avec OWASP ZAP, secrets gérés via Sealed Secrets. Build, scan, déploiement —
            dans cet ordre, à chaque fois.
          </>
        ),
        tags: [
          { name: "GitLab CI/CD", icon: "gitlab" },
          { name: "SonarQube", icon: "sonarqube" },
          { name: "Linux", icon: "linux" },
        ],
        images: [],
      },
      {
        title: "Observabilité & tests",
        description: (
          <>
            Prometheus, Grafana, Loki, Promtail et Alertmanager — la stack qui m'a permis de
            diagnostiquer une véritable surcharge de cluster au lieu de la deviner. Tests de charge
            avec k6, suites JUnit et Vitest intégrées à la CI pour que les régressions apparaissent
            avant un déploiement, pas après.
          </>
        ),
        tags: [
          { name: "Prometheus", icon: "prometheus" },
          { name: "Grafana", icon: "grafana" },
        ],
        images: [],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Articles sur le backend et l'infrastructure",
  description: `Les publications récentes de ${person.name}`,
};

const work: Work = {
  path: "/work",
  label: "Projets",
  title: `Projets – ${person.name}`,
  description: `Projets backend, cloud et plateforme réalisés par ${person.name}`,
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Galerie",
  title: `Architecture & tableaux de bord – ${person.name}`,
  description: "Schémas d'architecture, pipelines et tableaux de bord issus de mes projets",
  // En attente des visuels réels : schémas d'architecture, tableaux de bord
  // Grafana, captures de pipelines. La route reste désactivée jusque-là.
  images: [],
};

const contact: Contact = {
  display: true,
  id: "contact",
  title: <>Démarrer un projet</>,
  description: (
    <>
      Dites-moi ce dont vous avez besoin et par quel moyen vous préférez être recontacté. Je réponds
      généralement sous 24 heures.
    </>
  ),
  fields: {
    name: { label: "Votre nom", placeholder: "Jean Dupont" },
    channel: {
      label: "Comment vous joindre ?",
      options: [
        {
          value: "email",
          label: "E-mail",
          icon: "email",
          placeholder: "vous@entreprise.com",
          inputType: "email",
        },
        {
          value: "phone",
          label: "Téléphone",
          icon: "phone",
          placeholder: "+212 6 00 00 00 00",
          inputType: "tel",
        },
        {
          value: "whatsapp",
          label: "WhatsApp",
          icon: "whatsapp",
          placeholder: "+212 6 00 00 00 00",
          inputType: "tel",
        },
        {
          value: "linkedin",
          label: "LinkedIn",
          icon: "linkedin",
          placeholder: "linkedin.com/in/votre-profil",
          inputType: "url",
        },
        {
          value: "other",
          label: "Autre",
          icon: "message",
          placeholder: "Telegram, Discord — comme vous préférez",
          inputType: "text",
        },
      ],
    },
    detail: { label: "Où puis-je vous joindre ?" },
    need: {
      label: "De quoi avez-vous besoin ?",
      placeholder: "Choisissez le plus proche",
      options: [
        { value: "backend", label: "Développement backend / API" },
        { value: "cloud", label: "Cloud & DevOps" },
        { value: "platform", label: "Une plateforme complète, de bout en bout" },
        { value: "smaller", label: "Un site web ou un projet plus court" },
        { value: "unsure", label: "Pas encore sûr — discutons-en" },
      ],
    },
    message: {
      label: "Parlez-moi du projet",
      placeholder:
        "Quelques phrases suffisent. Que construisez-vous, et qu'est-ce qui vous bloque ?",
    },
  },
  submit: "Envoyer",
  sending: "Envoi…",
  success: {
    title: "Message envoyé",
    description: "Merci — je l'ai bien reçu et je vous réponds sur le canal que vous avez choisi.",
  },
  error: {
    title: "L'envoi a échoué",
    description: "Quelque chose s'est cassé en chemin. Réessayez, ou écrivez-moi directement.",
  },
  validation: {
    required: "Ce champ est obligatoire",
    email: "Cela ne ressemble pas à une adresse e-mail",
    phone: "Cela ne ressemble pas à un numéro de téléphone",
  },
};

const services: Services = {
  display: true,
  title: <>Ce que je peux construire pour vous</>,
  description: (
    <>
      L'essentiel de mon travail concerne le backend et l'infrastructure, mais je livre aussi
      l'interface — et aucun projet n'est trop petit pour en parler.
    </>
  ),
  items: [
    {
      icon: "spring",
      title: "Backend & API",
      description: (
        <>
          Java et Spring Boot, ou NestJS et Node. Des API REST avec une authentification correcte,
          un schéma de base de données encore compréhensible dans un an, et des tests qui rattrapent
          les régressions avant vos utilisateurs.
        </>
      ),
    },
    {
      icon: "react",
      title: "Applications web, de bout en bout",
      description: (
        <>
          L'interface React et le backend qui la sert, conçus ensemble. Récemment, un système de
          clinique à sept rôles où chaque rôle dispose d'une application réellement différente, et
          non du même écran avec des boutons masqués.
        </>
      ),
    },
    {
      icon: "kubernetes",
      title: "Cloud, CI/CD & déploiement",
      description: (
        <>
          Mettre en ligne et y rester : conteneurs, pipeline qui teste et déploie à chaque push,
          infrastructure as code, et tableaux de bord qui vous alertent avant vos clients.
        </>
      ),
    },
    {
      icon: "rocket",
      title: "Projets plus courts",
      description: (
        <>
          Une landing page, un site, une intégration entre deux systèmes, un bug que personne
          n'arrive à cerner, ou un déploiement qui casse sans arrêt. Les petits projets sont les
          bienvenus — dites-moi simplement ce qu'il vous faut.
        </>
      ),
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery, services, contact };
