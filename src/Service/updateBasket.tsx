import { db } from '../firebase';
import { doc, setDoc, updateDoc,getDoc, DocumentData } from 'firebase/firestore';

interface Item {
  [key: string]: any;
}

interface UpdateBasketParams {
  quantity: number;
  item: Item;
  itemId: string | undefined;
  email: string;
}

export const updateBasket = async ({ quantity, item, itemId, email }: UpdateBasketParams) => {
  const docRef = doc(db, 'UserBasket', email);

  const { article, ...rest } = item;

  try {
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await updateDoc(docRef, {
        [article]: [quantity, rest, itemId]
      });
    } else {
      await setDoc(docRef, {
        [article]: [quantity, rest, itemId]
      });
    }

    console.log(`Document with ID ${email} successfully updated.`);
  } catch (error) {
    console.error(`Error updating document: ${error}`);
  }
};
