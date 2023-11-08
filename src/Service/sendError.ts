import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

export const sendError = async (error: any) => {
    try {
        const errorDocRef = doc(db, 'Error', error);
        await setDoc(errorDocRef, {});
        window.location.reload();
        return { data: 'Item added successfully' };
    } catch (error) {
        return { error };
    }
};
