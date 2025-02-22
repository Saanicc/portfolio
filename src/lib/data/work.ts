type Description =
  | string
  | {
      textBefore: string;
      bulletPoints: string[];
      textAfter: string;
    };

type Project = {
  title: string;
  description: string;
  tags: string[];
};

export interface TimelineItem {
  id: number;
  title: string;
  company: string;
  date: string;
  description?: Description;
  projects?: Project[];
  tags?: string[];
}

export const timelineData: TimelineItem[] = [
  {
    id: 1,
    title: "Frontend Developer (Consultant)",
    date: "April 2023 - August 2024",
    company: "Smart Europe GmbH",
    description: {
      textBefore:
        "Contributed to the ongoing development of an advanced agent platform, incorporating the following key features:",
      bulletPoints: [
        "Customer data management",
        "Order management",
        "Test drive booking",
        "Document management",
        "Demo car management",
        "Car handover management",
      ],
      textAfter:
        "Built with React.js (FE) and a backend-for-frontend (BFF). Used TypeScript, SASS, and a shared package for types and common functions. Integrated GraphQL and REST APIs. Automated CI/CD with Buildkite, version control with Bitbucket. Leveraged AWS Serverless architecture. Included i18next for multilingual support, and testing with Playwright, Vitest, and React Testing Library. Built with Vite for performance.",
    },
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
  {
    id: 2,
    title: "Frontend Developer consultant",
    date: "October 2022 - February 2025",
    company: "Technogarden AB",
    projects: [
      {
        title: "Do Good Get Good - In House Project",
        description:
          "Do Good Get Good is a cross-platform in-house mobile app that allows employees to register their voluntary work and get rewards for it. The app is built with React Native and Firebase.",
        tags: ["React Native", "Firebase", "Figma", "GitHub"],
      },
      {
        title: "TeamTailor/RecMan Integration - In House Project",
        description:
          "Developed a custom webhook trigger using TeamTailors partner API to easily transfer candidates and their files from TeamTailor to RecMan. " +
          "The integration allowed employees to easily transfer candidate data to RecMan",
        tags: ["Node.js", "Docker", "AWS", "GitHub"],
      },
    ],
  },
  {
    id: 3,
    title: "Frontend Developer - Internship",
    date: "January 2022 - May 2022",
    company: "Technogarden AB",
    description:
      "Assisted in developing an in-house cross-platform app for time reporting of volunteer/freelance work. The app was written in React Native, and we used Firebase as the backend. We developed the app based on a mockup in Figma, worked on writing user stories, and communicated with the product owner to determine functionality. We used GitHub as the version control system and created pull requests (PRs) before delivery, which were reviewed by us students.",
    tags: ["React Native", "Firebase", "Figma", "GitHub"],
  },
];
