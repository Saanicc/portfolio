"use client";

import { useEffect, useState } from "react";
import { subscribeToProjects } from "@/lib/firebase/projects";
import { subscribeToSkills } from "@/lib/firebase/skills";
import { subscribeToJobs } from "@/lib/firebase/jobs";
import { Project } from "@/types/project";
import { Skill } from "@/types/skill";
import { Job } from "@/types/jobs";
import { BackgroundGradient } from "../BackgroundGradient";
import ItemsContainer from "./ItemsContainer";
import { Button } from "../ui/button";

export const AdminPanel = ({ onLogout }: { onLogout: () => void }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);

  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingSkills, setLoadingSkills] = useState(true);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [projectsError, setProjectsError] = useState<string | null>(null);
  const [skillsError, setSkillsError] = useState<string | null>(null);
  const [jobsError, setJobsError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToProjects(
      (updatedProjects) => {
        setProjects(updatedProjects);
        setLoadingProjects(false);
      },
      (err) => {
        setProjectsError(err.message);
        setLoadingProjects(false);
      }
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = subscribeToSkills(
      (updatedSkills) => {
        setSkills(updatedSkills);
        setLoadingSkills(false);
      },
      (err) => {
        setSkillsError(err.message);
        setLoadingSkills(false);
      }
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = subscribeToJobs(
      (updatedJobs) => {
        setJobs(updatedJobs);
        setLoadingJobs(false);
      },
      (err) => {
        setJobsError(err.message);
        setLoadingJobs(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center px-4 overflow-scroll md:overflow-hidden">
      <BackgroundGradient />
      <div className="flex flex-col w-full h-screen max-h-screen items-center">
        <div className="w-full h-screen flex flex-col items-center">
          <div className="w-full flex justify-between items-center my-8">
            <h1 className="text-xl lg:text-3xl self-start">Welcome, Admin!</h1>
            <Button
              onClick={onLogout}
              variant="outline"
              className="hover:bg-accent hover:text-white text-white px-4 py-2 rounded-lg text-sm font-medium"
            >
              Logout
            </Button>
          </div>
          <div className="flex flex-col md:flex-row w-full gap-10 flex-1 min-h-0">
            <ItemsContainer
              itemType="project"
              items={projects}
              loading={loadingProjects}
              error={projectsError}
            />
            <ItemsContainer
              itemType="skill"
              items={skills}
              loading={loadingSkills}
              error={skillsError}
            />
            <ItemsContainer
              itemType="job"
              items={jobs}
              loading={loadingJobs}
              error={jobsError}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
