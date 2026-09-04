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
  role: "Backend & Platform Engineer",
  avatar: "/images/mouad-chaouni.jpg",
  email: "mdchaouni@gmail.com",
  location: "Africa/Casablanca", // IANA time zone identifier
  languages: ["Arabic", "French", "English"],
  locale: "en", // BCP 47 language tag for the HTML lang attribute
};

const newsletter: Newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>My weekly newsletter about creativity and engineering</>,
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
  label: "Home",
  title: `${person.name} — ${person.role}`,
  // Where the searchable keywords live: the hero stays short, this carries the
  // terms a client actually types into a search box.
  description:
    "Backend and platform engineer in Rabat, Morocco. I build secure, multi-tenant systems with Java and Spring Boot, and ship them on Kubernetes with CI/CD, observability and infrastructure as code.",
  headline: <>Backend & Platform Engineer</>,
  featured: {
    display: true,
    title: (
      <Text onBackground="brand-medium" marginRight="4">
        <strong className="ml-4">MedCore</strong> — try the live demo
      </Text>
    ),
    href: "/work/medcore",
  },
  subline: (
    <>
      I'm {person.firstName}. I build web applications end to end — the interface, the backend
      behind it, and the pipeline that ships them. From a single API to a secure multi-tenant
      platform.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `${person.role} based in Rabat, Morocco. Java, Spring Boot, Kubernetes and secure delivery.`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  resume: {
    display: true,
    label: "Download CV",
    url: "/cv/Mouad_Chaouni_CV_EN.pdf",
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
        I build backend platforms and put them into production. That covers the whole path — the
        Spring Boot service and its authorization model, the pipeline that tests and ships it, the
        infrastructure it runs on, and the dashboards that prove it is healthy. Most of my work has
        centred on multi-tenant systems and access control, where being wrong is expensive and
        "probably fine" is not an answer.
      </>
    ),
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "SYNERTIC",
        timeframe: "June – August 2026",
        role: "Backend & DevOps Engineering Intern",
        achievements: [
          <>
            Designed the authorization architecture for a{" "}
            <strong>multi-tenant SaaS platform</strong> in Java 21 and Spring Boot 4 — identity
            delegated to Keycloak, policy decisions to Cerbos, with RBAC and ABAC enforced together
            and strict tenant isolation across the API.
          </>,
          <>
            Built the GitLab CI/CD pipeline end to end: Kaniko image builds, Trivy vulnerability
            scanning, automated deployment and scheduled maintenance jobs, with{" "}
            <strong>729 tests</strong> running on every pipeline.
          </>,
          <>
            Deployed and operated the containerized platform on Oracle Cloud with Prometheus,
            Grafana and Loki, and automated deployment, backups and alerting with Ansible.
            Load-tested at <strong>186 requests per second</strong> at a <strong>79 ms p95</strong>{" "}
            latency.
          </>,
          <>
            Published <strong>5 client SDKs</strong> — TypeScript, Python, Java, .NET and Go —
            validated by a shared conformance suite so every language behaves identically across
            releases. Two client applications went to production on them.
          </>,
          <>
            Built the React and TypeScript admin console, including a visual BPMN editor for
            approval workflows (bpmn-js on a Flowable engine) wired to the backend workflow engine.
          </>,
        ],
        images: [],
      },
      {
        company: "Early-stage startup (France, remote)",
        timeframe: "July – August 2025",
        role: "Full Stack Developer Intern",
        achievements: [
          <>
            Built a secure <strong>Campaign API module</strong> — 8+ REST endpoints on NestJS,
            Prisma and MongoDB — covering status management, business workflows and API security
            with JWT access and refresh tokens.
          </>,
          <>Worked in a collaborative Git workflow with code review on every change.</>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "Education & certification",
    institutions: [
      {
        name: "INPT — Institut National des Postes et Télécommunications, Rabat",
        description: (
          <>
            Engineering degree in Ubiquitous and Distributed Systems, Cloud & IoT specialization.
            2024 – 2027.
          </>
        ),
      },
      {
        name: "CPGE Ibn Timiya, Marrakesh",
        description: (
          <>
            Two-year intensive preparatory program in mathematics and physics (MPSI / MP). 2022 –
            2024.
          </>
        ),
      },
      {
        name: "Oracle Cloud Infrastructure Foundations Associate",
        description: (
          <>
            Certified October 2025 —{" "}
            <SmartLink href="https://catalog-education.oracle.com/pls/certview/sharebadge?id=18405CC30BE250C13C15C4FC2452776928715E42D1CDFC6B37C4B761F37C04A4">
              verify the badge
            </SmartLink>
            .
          </>
        ),
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical skills",
    skills: [
      {
        title: "Backend & APIs",
        description: (
          <>
            Java 21 and Spring Boot for services that have to be correct under load — Spring
            Security as an OAuth2 resource server, Hibernate and JPA, Flyway migrations, Spring
            Cloud Gateway. REST with OpenAPI, plus gRPC and NestJS where they fit better.
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
            Enough React to build the interface a backend deserves: React 19 and TypeScript with
            TanStack Query for server state, Vite, and Tailwind. Recently a seven-role admin
            interface where every role sees a genuinely different application.
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
        title: "Identity & authorization",
        description: (
          <>
            The part most teams get wrong. Keycloak for identity, Cerbos as a policy decision point,
            OAuth2 Authorization Code with PKCE, and RBAC combined with ABAC. Multi-tenant isolation
            and fail-closed design, so the default answer to an unclear request is "no".
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
            Containers and orchestration in anger: Docker, Kubernetes, Helm, Argo CD for GitOps, and
            Istio for a service mesh with mutual TLS. Infrastructure defined as code with Terraform
            on AWS EKS and RDS, and Ansible for configuration. Oracle Cloud certified.
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
            Pipelines that refuse to ship broken or vulnerable code: secrets scanning with Gitleaks,
            static analysis with SonarQube, container scanning with Trivy and dynamic testing with
            OWASP ZAP, secrets managed through Sealed Secrets. Build, scan, deploy — in that order,
            every time.
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
        title: "Observability & testing",
        description: (
          <>
            Prometheus, Grafana, Loki, Promtail and Alertmanager — the stack I used to diagnose a
            real cluster-overload incident rather than guess at it. Load testing with k6, JUnit and
            Vitest suites wired into CI so regressions surface before a deploy, not after.
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
  title: "Writing about backend and infrastructure",
  description: `Read what ${person.name} has been up to recently`,
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Backend, cloud and platform projects by ${person.name}`,
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Architecture & dashboards – ${person.name}`,
  description: "Architecture diagrams, pipelines and dashboards from projects I've built",
  // Awaiting real assets: architecture diagrams, Grafana dashboards, pipeline
  // screenshots. The route stays disabled in once-ui.config.ts until then.
  images: [],
};

const contact: Contact = {
  display: true,
  id: "contact",
  title: <>Start a project</>,
  description: (
    <>Tell me what you need and how you would rather be reached. I usually reply within a day.</>
  ),
  fields: {
    name: { label: "Your name", placeholder: "Jane Doe" },
    channel: {
      label: "How should I reach you?",
      options: [
        {
          value: "email",
          label: "Email",
          icon: "email",
          placeholder: "you@company.com",
          inputType: "email",
        },
        {
          value: "phone",
          label: "Phone",
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
          placeholder: "linkedin.com/in/your-profile",
          inputType: "url",
        },
        {
          value: "other",
          label: "Other",
          icon: "message",
          placeholder: "Telegram, Discord — however you prefer",
          inputType: "text",
        },
      ],
    },
    detail: { label: "Where can I reach you?" },
    need: {
      label: "What do you need?",
      placeholder: "Pick the closest one",
      options: [
        { value: "backend", label: "Backend / API development" },
        { value: "cloud", label: "Cloud & DevOps" },
        { value: "platform", label: "A full platform, end to end" },
        { value: "smaller", label: "A website or something smaller" },
        { value: "unsure", label: "Not sure yet — let's talk" },
      ],
    },
    message: {
      label: "Tell me about it",
      placeholder: "A few sentences are plenty. What are you building, and what is in the way?",
    },
  },
  submit: "Send",
  sending: "Sending…",
  success: {
    title: "Message sent",
    description: "Thanks — I have it, and I'll get back to you on the channel you chose.",
  },
  error: {
    title: "That didn't go through",
    description: "Something broke on the way. Try again, or email me directly.",
  },
  validation: {
    required: "This one is required",
    email: "That doesn't look like an email address",
    phone: "That doesn't look like a phone number",
  },
};

const services: Services = {
  display: true,
  title: <>What I can build for you</>,
  description: (
    <>
      Most of my work is backend and infrastructure, but I deliver the interface too — and no job is
      too small to ask about.
    </>
  ),
  items: [
    {
      icon: "spring",
      title: "Backend & APIs",
      description: (
        <>
          Java and Spring Boot, or NestJS and Node. REST APIs with proper authentication, a database
          schema that will still make sense in a year, and tests that catch regressions before your
          users do.
        </>
      ),
    },
    {
      icon: "react",
      title: "Web apps, end to end",
      description: (
        <>
          The React interface and the backend behind it, built together. Recently a seven-role
          clinic system where every role gets a genuinely different application — not the same
          screen with buttons hidden.
        </>
      ),
    },
    {
      icon: "kubernetes",
      title: "Cloud, CI/CD & deployment",
      description: (
        <>
          Getting it live and keeping it there: containers, a pipeline that tests and ships on every
          push, infrastructure as code, and dashboards that tell you it is healthy before a customer
          does.
        </>
      ),
    },
    {
      icon: "rocket",
      title: "Smaller builds",
      description: (
        <>
          A landing page, a site, an integration between two systems, a bug nobody can pin down, or
          a deployment that keeps breaking. Short jobs are welcome — just say what you need.
        </>
      ),
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery, services, contact };
