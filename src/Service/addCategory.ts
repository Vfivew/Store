import { db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export const addCategory = async (newData: any, itemId: string) => {
    console.log(itemId, 'addCategory');
    console.log(newData, 'newData');
    try {
        const goodsDocRef = doc(db, 'Goods', itemId);
        const docSnap = await getDoc(goodsDocRef);
        if (docSnap.exists()) {
            await setDoc(goodsDocRef, newData, { merge: true });
            return { data: 'Item updated successfully' };
        } else {
            await setDoc(goodsDocRef, newData);
            return { data: 'Item added successfully' };
        }
    } catch (error) {
        return { error };
    }
};
