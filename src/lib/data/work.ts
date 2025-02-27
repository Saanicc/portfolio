export type Project = {
  title?: string;
  summary: string;
  bulletPointDetails: string[];
  tags: string[];
};

export type TimelineItem = {
  id: number;
  title: string;
  company: string;
  date: string;
  project?: Project;
  projects?: Project[];
};

export const timelineData: TimelineItem[] = [
  {
    id: 1,
    title: "Frontend Developer (Consultant)",
    date: "April 2023 - August 2024",
    company: "Smart Europe GmbH",
    project: {
      summary:
        "Developed and maintained an advanced agent platform, focusing on scalable and efficient frontend solutions. Key responsibilities included:",
      bulletPointDetails: [
        "Frontend Development: Built and optimized the application using React.js, TypeScript, and SASS, ensuring a responsive and maintainable UI.",
        "State Management & API Integration: Integrated GraphQL and REST APIs, leveraging a backend-for-frontend (BFF) approach for streamlined data handling.",
        "Shared Code & Multilingual Support: Contributed to a shared package for types and common utilities, implemented i18next for internationalization.",
        "Testing & Performance: Ensured code reliability through Playwright, Vitest, and React Testing Library. Optimized build performance using Vite.",
        "CI/CD & Infrastructure: Automated deployment pipelines with Buildkite, managed version control via Bitbucket, and worked within an AWS Serverless architecture.",
      ],
      tags: [
        "React.js",
        "TypeScript",
        "GraphQL",
        "AWS",
        "Buildkite",
        "Serverless",
        "i18next",
        "Playwright",
        "SASS",
        "Vite",
        "Vitest",
        "React Testing Library",
      ],
    },
  },
  {
    id: 2,
    title: "Software Developer (Frontend focus)",
    date: "October 2022 - February 2025",
    company: "Technogarden AB",
    projects: [
      {
        title: "Do Good Get Good - In House Project",
        summary:
          "Following my internship, I continued working on Do Good Get Good, a cross-platform mobile application that enables employees to log voluntary work and earn rewards. My extended contributions included:",
        bulletPointDetails: [
          "Feature Expansion & Refinement: Enhanced existing functionality and implemented new features to improve user engagement.",
          "Performance Optimization: Further optimized Firebase queries and React Native rendering to enhance responsiveness and efficiency.",
          "UI/UX Improvements: Refined the React Native UI based on user feedback, ensuring a more intuitive experience.",
          "Code Quality & Maintainability: Improved code structure, resolved technical debt, and maintained best practices in version control with GitHub.",
        ],
        tags: ["React Native", "Firebase", "Figma", "GitHub"],
      },
      {
        title: "TeamTailor/RecMan Integration - In House Project",
        summary:
          "Developed a custom webhook-based integration to automate the transfer of candidate data and files from TeamTailor to RecMan. Key contributions included:",
        bulletPointDetails: [
          "Backend Development: Built the integration using Node.js, ensuring efficient data processing and API communication.",
          "API Integration & Automation: Utilized TeamTailor’s Partner API to fetch and securely transfer candidate information to RecMan.",
          "Containerization & Deployment: Packaged the solution with Docker for consistency across environments and deployed it on AWS for scalability.",
          "Version Control & CI/CD: Managed the codebase with GitHub, implementing best practices for collaboration and maintainability.",
        ],
        tags: [
          "Node.js",
          "Docker",
          "AWS",
          "GitHub",
          "TeamTailor Partner API",
          "RecMan API",
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Frontend Developer - Internship",
    date: "January 2022 - May 2022",
    company: "Technogarden AB",
    project: {
      summary:
        "Assisted in developing a cross-platform mobile app, from the ground up, for tracking volunteer and freelance work. The project followed a structured development process, from mockups to implementation. Key contributions included:",
      bulletPointDetails: [
        "Mobile Development: Built with React Native, ensuring a smooth experience across iOS and Android.",
        "Backend & Database: Integrated Firebase for authentication, real-time data storage, and backend logic.",
        "UI/UX & Product Development: Developed the app based on Figma mockups, collaborated on user stories, and refined functionality in discussions with the product owner.",
        "Version Control & Code Review: Used GitHub for version control, creating and reviewing pull requests (PRs) to maintain code quality.",
      ],
      tags: ["React Native", "Firebase", "Figma", "GitHub"],
    },
  },
];
