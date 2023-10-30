import { db } from '../firebase';
import { doc, getDoc, deleteDoc, setDoc } from 'firebase/firestore';

export const deleteCategory = async (newData: any, itemId: string) => {
    console.log(itemId, 'deleteCategory');
    console.log(newData, 'newData');
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
        return { error };
    }
};
