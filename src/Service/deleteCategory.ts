import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { sendError } from './sendError';

export const deleteCategory = async (newData: any, itemId: string) => {
    try {
        const goodsDocRef = doc(db, 'Goods', itemId);
        const docSnap = await getDoc(goodsDocRef);
        if (!docSnap.exists()) {
            throw new Error('Item does not exist');
        } else {
            await setDoc(goodsDocRef, newData);
            window.location.reload(); 
            return { data: 'Item deleted successfully' };
        }
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
