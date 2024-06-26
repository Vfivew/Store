import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";

import { db } from "../db/firebase";
import { sendError } from "./sendError";

interface Item {
  [key: string]: any;
}

interface UpdateDesireParams {
  item: Item;
  itemId: string | undefined;
  email: string;
}

interface DeleteDesireItemParams {
  article: string;
  email: string;
}

export const updateDesire = async ({
  item,
  itemId,
  email,
}: UpdateDesireParams) => {
  const docRef = doc(db, "Desire", email);

  const article = item.article;

  try {
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await updateDoc(docRef, {
        [article]: [item, itemId],
      });
    } else {
      await setDoc(docRef, {
        [article]: [item, itemId],
      });
    }

    console.log(`Document with ID ${email} successfully updated.`);
  } catch (error) {
    if (error instanceof Error) {
      const errorMessage = "Some problem: " + error.message;
      console.log(error);
      await sendError(error);
      return { error: errorMessage };
    } else {
      return { error: "An unknown error occurred." };
    }
  }
};

export const deleteDesireItem = async ({
  article,
  email,
}: DeleteDesireItemParams) => {
  const docRef = doc(db, "Desire", email);

  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      delete data[article];
      await setDoc(docRef, data);
      console.log(
        `Data with article ${article} has been successfully deleted from document with ID ${email}.`
      );
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    if (error instanceof Error) {
      const errorMessage = "Some problem: " + error.message;
      console.log(error);
      await sendError(error);
      return { error: errorMessage };
    } else {
      return { error: "An unknown error occurred." };
    }
  }
};
