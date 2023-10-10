import { db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';

export const updateReview = async (itemId:any, newFullData:any) => { 
    console.log(itemId)
    console.log(newFullData)
  const docRef = doc(db, 'Goods', itemId);

  try {
    await updateDoc(docRef, newFullData);
    console.log(`Document with ID ${itemId} successfully updated.`);
  } catch (error) {
    console.error(`Error updating document: ${error}`);
  }
};
