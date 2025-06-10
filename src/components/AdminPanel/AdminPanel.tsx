"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { deleteProject, getProjects } from "@/lib/firebase/projects";
import { Project } from "@/types/project";
import { Button } from "../ui/button";
import { UpdateProject } from "./Projects/UpdateProject";
import { Skill } from "@/types/skill";
import { deleteSkill, getSkills } from "@/lib/firebase/skills";
import { UpdateSkill } from "./Skills/UpdateSkill";

export const AdminPanel: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [item, setItem] = useState<Project | Skill>();
  const [itemType, setItemType] = useState<"project" | "skill">();
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const projectsData = await getProjects();
      const skillsData = await getSkills();

      setProjects(projectsData);
      setSkills(skillsData);
    };

    fetchData();
  }, []);

  const handleDeleteClick = (item: Project | Skill) => {
    setItem(item);
    setShowPopup(true);
  };

  const DeletePopup = ({ item }: { item: Project | Skill }) => {
    const isProject = (item: Project | Skill): item is Project => {
      return "title" in item;
    };

    const itemBeingDeleted = isProject(item) ? item.title : item.name;

    const popupTitle = isProject(item) ? "Delete project" : "Delete skill";

    return (
      <div className="flex items-center justify-center w-screen h-screen bg-black/50 absolute">
        <Card>
          <CardHeader className="p-[20px] pb-3">
            <CardTitle>{popupTitle}</CardTitle>
          </CardHeader>
          <CardContent className="pl-[20px] pr-[20px]">
            <CardDescription>
              Are you sure you want to delete &apos;{itemBeingDeleted}&apos;?
            </CardDescription>
          </CardContent>

          <CardFooter className="p-[20px] pt-0">
            <div className="flex gap-1">
              <Button
                variant="ghost"
                className="border hover:bg-muted"
                onClick={() => {
                  setItem(undefined);
                  setShowPopup(false);
                }}
              >
                Cancel
              </Button>
              <Button
                variant={"destructive"}
                onClick={() => {
                  setShowPopup(false);
                  setItem(undefined);
                  if (isProject(item)) deleteProject(item.id);
                  else deleteSkill(item.id);
                }}
              >
                Delete
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    );
  };

  const handleUpdateClick = (
    item: Project | Skill,
    itemType: "project" | "skill"
  ) => {
    setItem(item);
    setItemType(itemType);
    setShowModal(true);
  };

  const Modal = () => {
    const closeModal = () => {
      setItem(undefined);
      setItemType(undefined);
      setShowModal(false);
    };

    if (itemType === "project") {
      return (
        <div className="flex absolute w-full h-screen items-center justify-center bg-black/60">
          <UpdateProject
            defaultData={item as Project}
            closeModal={closeModal}
          />
        </div>
      );
    } else if (itemType === "skill") {
      return (
        <div className="flex absolute w-full h-screen items-center justify-center bg-black/60">
          <UpdateSkill defaultData={item as Skill} closeModal={closeModal} />
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col w-full h-screen max-h-screen items-center">
      {showPopup && item && <DeletePopup item={item} />}
      {showModal && itemType && <Modal />}

      <div className="w-full h-screen flex flex-col items-center overflow-hidden">
        <h1 className="text-4xl m-8 mb-16">Welcome, Admin!</h1>
        <div className="flex w-full gap-20 justify-center overflow-auto">
          <div>
            <div className="flex justify-between items-center mb-4">
              <p className="text-xl font-bold">Projects</p>
              <Button
                variant="secondary"
                onClick={() => {
                  setShowModal(true);
                  setItemType("project");
                }}
              >
                Add new project
              </Button>
            </div>
            {projects.map((project) => (
              <Card
                key={project.id}
                className="bg-transparent text-white border-white/30 mb-2"
              >
                <CardContent className="flex flex-col items-center justify-center">
                  <CardTitle className="p-4">{project.title}</CardTitle>
                  <div className="flex gap-1">
                    <Button
                      variant="secondary"
                      onClick={() => handleUpdateClick(project, "project")}
                    >
                      Update
                    </Button>
                    <Button
                      variant={"destructive"}
                      onClick={() => handleDeleteClick(project)}
                    >
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex flex-col overflow-hidden">
            <div className="flex justify-between items-center mb-4">
              <p className="text-xl font-bold">Skills</p>
              <Button
                variant="secondary"
                onClick={() => {
                  setShowModal(true);
                  setItemType("skill");
                }}
              >
                Add new skill
              </Button>
            </div>
            <div className="overflow-scroll">
              {skills.map((skill) => (
                <Card
                  key={skill.id}
                  className="bg-transparent text-white border-white/30 mb-2"
                >
                  <CardContent className="flex flex-col items-center justify-center">
                    <CardTitle className="p-4">{skill.name}</CardTitle>
                    <div className="flex gap-1">
                      <Button
                        variant="secondary"
                        onClick={() => handleUpdateClick(skill, "skill")}
                      >
                        Update
                      </Button>
                      <Button
                        variant={"destructive"}
                        onClick={() => handleDeleteClick(skill)}
                      >
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
