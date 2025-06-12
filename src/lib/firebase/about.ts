"use client";

import { collection, getDocs, doc, updateDoc, query } from "firebase/firestore";
import { db } from "./init";
import { AboutMe } from "@/types/about";

const ABOUT_COLLECTION = "about";

export const getAboutMe = async (): Promise<AboutMe[]> => {
  try {
    const q = query(collection(db, ABOUT_COLLECTION));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as AboutMe[];
  } catch (error) {
    console.error("Error fetching about me:", error);
    return [];
  }
};

export const updateAboutMe = async (
  id: string,
  updates: Omit<AboutMe, "id">
) => {
  try {
    const docRef = doc(db, ABOUT_COLLECTION, id);
    await updateDoc(docRef, updates);
  } catch (error) {
    console.error("Error updating about me:", error);
    throw error;
  }
};
