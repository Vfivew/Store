import { db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { sendError } from './sendError'; 

export const addCategory = async (newData: any, itemId: string) => {
    try {
        const goodsDocRef = doc(db, 'Goods', itemId);
        const docSnap = await getDoc(goodsDocRef);
        if (docSnap.exists()) {
            await setDoc(goodsDocRef, newData, { merge: true });
            window.location.reload(); 
            return { data: 'Item updated successfully' };
        } else {
            await setDoc(goodsDocRef, newData);
            window.location.reload(); 
            return { data: 'Item added successfully' };
        }
    } catch (error) {
        if (error instanceof Error) {
            const errorMessage = 'Some problem: ' + error.message;
            await sendError(error);
            return { error: errorMessage };
        } else {
            return { error: 'An unknown error occurred.' };
        }
    }
};
