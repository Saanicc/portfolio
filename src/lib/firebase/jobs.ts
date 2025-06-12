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
} from "firebase/firestore";
import { db } from "./init";
import { Job } from "@/types/jobs";

const JOBS_COLLECTION = "work-experience";

type OmittedKeys = "id" | "createdAt";

export const addJob = async (job: Omit<Job, OmittedKeys>) => {
  try {
    const docRef = await addDoc(collection(db, JOBS_COLLECTION), {
      ...job,
      createdAt: new Date(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding job:", error);
    throw error;
  }
};

export const getJobs = async (): Promise<Job[]> => {
  try {
    const q = query(
      collection(db, JOBS_COLLECTION),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Job[];
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
};

export const updateJob = async (id: string, updates: Partial<Job>) => {
  try {
    const docRef = doc(db, JOBS_COLLECTION, id);
    await updateDoc(docRef, updates);
  } catch (error) {
    console.error("Error updating job:", error);
    throw error;
  }
};

export const deleteJob = async (id: string) => {
  try {
    await deleteDoc(doc(db, JOBS_COLLECTION, id));
  } catch (error) {
    console.error("Error deleting job:", error);
    throw error;
  }
};
