"use client";

import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
} from "firebase/firestore";
import { db } from "./init";
import { Skill } from "@/types/skill";

const SKILLS_COLLECTION = "skills";

type OmittedKeys = "id";

export const addSkill = async (skill: Omit<Skill, OmittedKeys>) => {
  try {
    const docRef = await addDoc(collection(db, SKILLS_COLLECTION), {
      ...skill,
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding project:", error);
    throw error;
  }
};

export const getSkills = async (): Promise<Skill[]> => {
  try {
    const q = query(collection(db, SKILLS_COLLECTION));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Skill[];
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
};

export const updateSkill = async (id: string, updates: Partial<Skill>) => {
  try {
    const projectRef = doc(db, SKILLS_COLLECTION, id);
    await updateDoc(projectRef, updates);
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
};

export const deleteSkill = async (id: string) => {
  try {
    await deleteDoc(doc(db, SKILLS_COLLECTION, id));
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
};
