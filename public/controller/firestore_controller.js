import {getFirestore, collection, addDoc, query, where, orderBy, getDocs, deleteDoc, doc} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js"
import { app } from "./firebase_core.js ";

const find_firebase='find_firebase';
const db = getFirestore(app);

export async function pushRecords(gameRecord)
{
    await addDoc(collection(db, find_firebase), gameRecord);

}

export async function displayAll(email)
{
 let backup =  [];
 const q= query(collection(db, find_firebase),
                 where('email', '==', email), 
                 orderBy('timestamp', 'desc'),
                );
 const snapShot= await getDocs(q);
 snapShot.forEach(doc => {
    const{bet: challenge, won, balance: blnc, timestamp }= doc.data();
    backup.push({bet: challenge, won, balance: blnc, timestamp});
 });
 return backup;
}

export async function erasePlayHistory(email) {
    const confirmed = confirm("Are you sure you want to delete all game history?");

    if (confirmed) {
        const q = query(collection(db, find_firebase),
            where('email', '==', email)
        );
        const snapShot = await getDocs(q);
        const deletePromises = [];
        snapShot.forEach(snapShotDoc => {
            deletePromises.push(deleteDoc(doc(db, find_firebase, snapShotDoc.id)));
        });
        await Promise.all(deletePromises);
    }
}
