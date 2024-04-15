import { doc, setDoc } from "firebase/firestore";

import { db } from "../db/firebase";

export const sendError = async (error: any) => {
  try {
    const errorDocRef = doc(db, "Error", error);
    await setDoc(errorDocRef, {});
    window.location.reload();
    return { data: "Item added successfully" };
  } catch (error) {
    return { error };
  }
};
