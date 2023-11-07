import { db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { sendError } from './sendError';

export const updateReview = async (itemId:any, newFullData:any) => { 
    console.log(itemId)
    console.log(newFullData)
  const docRef = doc(db, 'Goods', itemId);

  try {
    await updateDoc(docRef, newFullData);
    console.log(`Document with ID ${itemId} successfully updated.`);
  } catch (error) {
      if (error instanceof Error) {
        const errorMessage = 'Some problem: ' + error.message;
        console.log(error);
        await sendError(error);
        return { error: errorMessage };
      } else {
        return { error: 'An unknown error occurred.' };
      }
    }
};
