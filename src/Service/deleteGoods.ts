import { db } from '../firebase';
import { collection, query, where,getDocs, addDoc } from 'firebase/firestore';   

export const deleteGoods = async (inputValue:string) => {
    try {
        const goodsCollectionRef = collection(db, 'Goods');
        const q = query(goodsCollectionRef, where('name', '==', inputValue));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            console.log('It\'s already exists');
        } else {
            await addDoc(goodsCollectionRef, { name: inputValue });
            console.log('Document successfully written!');
        }
    } catch (error) {
        console.error('Error adding document: ', error);
    }
};