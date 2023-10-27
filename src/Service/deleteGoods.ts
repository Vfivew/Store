import { db } from '../firebase';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';

export const deleteGoods = async (inputValue: string) => {
    try {
        const goodsDocRef = doc(db, 'Goods', inputValue);
        const docSnap = await getDoc(goodsDocRef);
        if (!docSnap.exists()) {
            throw new Error('Item does not exist');
        } else {
            await deleteDoc(goodsDocRef);
            return { data: 'Item deleted successfully' };
        }
    } catch (error) {
        return { error };
    }
};
