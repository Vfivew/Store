import { db } from '../firebase';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { sendError } from './sendError';

export const deleteGoodsType = async (inputValue: string) => {
    try {
        const goodsDocRef = doc(db, 'Goods', inputValue);
        const docSnap = await getDoc(goodsDocRef);
        if (!docSnap.exists()) {
            throw new Error('Item does not exist');
        } else {
            await deleteDoc(goodsDocRef);
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
