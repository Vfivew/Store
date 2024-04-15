import { doc, setDoc, getDoc } from "firebase/firestore";

import { db } from "../db/firebase";
import { sendError } from "./sendError";

export const addGoodsType = async (inputValue: string) => {
  try {
    const goodsDocRef = doc(db, "Goods", inputValue);
    const docSnap = await getDoc(goodsDocRef);
    if (docSnap.exists()) {
      throw new Error("Item already exists");
    } else {
      await setDoc(goodsDocRef, {});
      window.location.reload();
      return { data: "Item added successfully" };
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
