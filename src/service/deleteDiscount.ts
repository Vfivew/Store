import { doc, setDoc, getDoc } from "firebase/firestore";

import { db } from "../db/firebase";
import { sendError } from "./sendError";

export const deleteDiscount = async (newData: any, itemId: string) => {
  try {
    const goodsDocRef = doc(db, "DiscountGoods", itemId);
    const docSnap = await getDoc(goodsDocRef);
    if (!docSnap.exists()) {
      throw new Error("Item does not exist");
    } else {
      await setDoc(goodsDocRef, newData);
      window.location.reload();
      return { data: "Item deleted successfully" };
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
