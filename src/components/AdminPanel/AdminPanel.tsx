"use client";

import { useEffect, useState } from "react";
import { getProjects } from "@/lib/firebase/projects";
import { Project } from "@/types/project";
import { Skill } from "@/types/skill";
import { getSkills } from "@/lib/firebase/skills";
import { BackgroundGradient } from "../BackgroundGradient";
import ItemsContainer from "./ItemsContainer";
import { Job } from "@/types/jobs";
import { getJobs } from "@/lib/firebase/jobs";

export const AdminPanel = ({ onLogout }: { onLogout: () => void }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const projectsData = await getProjects();
      const skillsData = await getSkills();
      const jobsData = await getJobs();

      setProjects(projectsData);
      setSkills(skillsData);
      setJobs(jobsData);
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center px-4 overflow-scroll md:overflow-hidden">
      <BackgroundGradient />
      <div className="flex flex-col w-full h-screen max-h-screen items-center">
        <div className="w-full h-screen flex flex-col items-center">
          <div className="w-full flex justify-between items-center my-8">
            <h1 className="text-xl self-start">Welcome, Admin!</h1>
            <div className="border-2 border-accent rounded-xl">
              <button
                onClick={onLogout}
                className="bg-transparent hover:bg-accent text-white px-4 py-2 rounded-lg text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
          <div className="flex flex-col md:flex-row w-full gap-10 flex-1 min-h-0">
            <ItemsContainer itemType="project" items={projects} />
            <ItemsContainer itemType="skill" items={skills} />
            <ItemsContainer itemType="job" items={jobs} />
          </div>
        </div>
      </div>
    </div>
  );
};
