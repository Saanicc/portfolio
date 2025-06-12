"use client";

import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  orderBy,
  query,
  Unsubscribe,
  onSnapshot,
} from "firebase/firestore";
import { db } from "./init";
import { Project } from "@/types/project";

const PROJECTS_COLLECTION = "personal-projects";

type OmittedKeys = "id" | "createdAt";

export const addProject = async (project: Omit<Project, OmittedKeys>) => {
  try {
    const docRef = await addDoc(collection(db, PROJECTS_COLLECTION), {
      ...project,
      createdAt: new Date(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding project:", error);
    throw error;
  }
};

export const getProjects = async (): Promise<Project[]> => {
  try {
    const q = query(
      collection(db, PROJECTS_COLLECTION),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Project[];
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
};

export const subscribeToProjects = (
  callback: (projects: Project[]) => void,
  onError?: (error: Error) => void
): Unsubscribe => {
  const q = query(
    collection(db, PROJECTS_COLLECTION),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(
    q,
    (querySnapshot) => {
      const projects = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Project[];
      callback(projects);
    },
    (error) => {
      console.error("Error in projects subscription:", error);
      if (onError) {
        onError(error);
      }
    }
  );
};

export const updateProject = async (id: string, updates: Partial<Project>) => {
  try {
    const projectRef = doc(db, PROJECTS_COLLECTION, id);
    await updateDoc(projectRef, updates);
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
};

export const deleteProject = async (id: string) => {
  try {
    await deleteDoc(doc(db, PROJECTS_COLLECTION, id));
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
};
