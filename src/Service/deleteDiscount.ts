import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const deleteDiscount = async (newData: any, itemId: string) => {
    try {
        const goodsDocRef = doc(db, 'DiscountGoods', itemId);
        const docSnap = await getDoc(goodsDocRef);
        if (!docSnap.exists()) {
            throw new Error('Item does not exist');
        } else {
            await setDoc(goodsDocRef, newData);
            window.location.reload(); 
            return { data: 'Item deleted successfully' };
        }
    } catch (error) {
        return { error };
    }
};
