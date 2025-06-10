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

export const AdminPanel: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [item, setItem] = useState<Project>();
  const [projects, setProjects] = useState<Project[]>([]);
  useEffect(() => {
    const fetchProjects = async () => {
      const data = await getProjects();
      setProjects(data);
    };

    fetchProjects();
  }, []);

  const handleDeleteClick = (item: Project) => {
    setItem(item);
    setShowPopup(true);
  };

  const DeletePopup = ({ item }: { item: Project }) => {
    return (
      <div className="flex items-center justify-center w-screen h-screen bg-black/50 absolute">
        <Card>
          <CardHeader className="p-[20px] pb-3">
            <CardTitle>Delete project</CardTitle>
          </CardHeader>
          <CardContent className="pl-[20px] pr-[20px]">
            <CardDescription>
              Are you sure you want to delete &apos;{item.title}&apos;?
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
                onClick={() => deleteProject(item.id)}
              >
                Delete
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    );
  };

  const handleUpdateClick = (item: Project) => {
    setItem(item);
    setShowModal(true);
  };

  const Modal = () => {
    const closeModal = () => {
      setItem(undefined);
      setShowModal(false);
    };

    return (
      <div className="flex absolute w-full h-screen items-center justify-center bg-black/60">
        <UpdateProject defaultData={item} closeModal={closeModal} />
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full h-screen items-center">
      <h1 className="text-4xl m-4">Welcome, Admin!</h1>

      {showPopup && item && <DeletePopup item={item} />}
      {showModal && <Modal />}

      <div className="w-full h-full flex flex-row items-center justify-center gap-10">
        <div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-xl font-bold">Projects</p>
            <Button variant="secondary" onClick={() => setShowModal(true)}>
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
                    onClick={() => handleUpdateClick(project)}
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
      </div>
    </div>
  );
};
