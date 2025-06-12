import { Project } from "@/types/project";
import { Skill } from "@/types/skill";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Edit, Trash } from "lucide-react";
import { UpdateProject } from "./Projects/UpdateProject";
import { UpdateSkill } from "./Skills/UpdateSkill";
import { useState } from "react";
import { deleteProject } from "@/lib/firebase/projects";
import { deleteSkill } from "@/lib/firebase/skills";

type ItemType = "project" | "skill";

const isProject = (item: Project | Skill): item is Project => {
  return "title" in item;
};

const ItemsContainer = ({
  itemType,
  items,
}: {
  itemType: ItemType;
  items: Project[] | Skill[];
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [item, setItem] = useState<Project | Skill>();
  const [type, setType] = useState<ItemType>();

  const handleUpdateClick = (item: Project | Skill, itemType: ItemType) => {
    setItem(item);
    setType(itemType);
    setShowModal(true);
  };

  const Modal = () => {
    const closeModal = () => {
      setItem(undefined);
      setType(undefined);
      setShowModal(false);
    };

    if (itemType === "project") {
      return (
        <div className="flex absolute inset-0 w-full h-screen items-center justify-center bg-black/60">
          <UpdateProject
            defaultData={item as Project}
            closeModal={closeModal}
          />
        </div>
      );
    } else if (itemType === "skill") {
      return (
        <div className="flex absolute inset-0 w-full h-screen items-center justify-center bg-black/60">
          <UpdateSkill defaultData={item as Skill} closeModal={closeModal} />
        </div>
      );
    }
  };

  const handleDeleteClick = (item: Project | Skill) => {
    setItem(item);
    setShowPopup(true);
  };

  const DeletePopup = ({ item }: { item: Project | Skill }) => {
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

  const title = itemType === "project" ? "Project" : "Skill";

  return (
    <div className="w-full flex flex-col h-full min-h-0">
      {showPopup && item && <DeletePopup item={item} />}
      {showModal && type && <Modal />}
      <div className="flex justify-between items-center mb-4 flex-shrink-0">
        <p className="text-xl font-bold">{title}</p>
        <Button
          variant="secondary"
          onClick={() => {
            setShowModal(true);
            setType(itemType);
          }}
        >
          Add new {title}
        </Button>
      </div>
      <div className="w-full flex flex-col gap-1 overflow-y-auto flex-1">
        {items.map((item) => (
          <Card
            key={item.id}
            className="bg-transparent text-white border-white/30"
          >
            <CardContent className="flex flex-row items-center justify-between px-4 py-4">
              <CardTitle>{isProject(item) ? item.title : item.name}</CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  onClick={() => handleUpdateClick(item, itemType)}
                >
                  <Edit />
                </Button>
                <Button
                  variant={"destructive"}
                  onClick={() => handleDeleteClick(item)}
                >
                  <Trash />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ItemsContainer;
