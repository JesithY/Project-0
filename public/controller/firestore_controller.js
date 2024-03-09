import {getFirestore, collection, addDoc, query, where, orderBy, getDocs} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js"
import { app } from "./firebase_core.js ";

const find_firebase='find_firebase';
const db = getFirestore(app);

export async function addCardGameRecord(gameRecord)
{
    await addDoc(collection(db, find_firebase), gameRecord);

}

export async function getAllPlayRecords(email)
{
 let history =  [];
 const q= query(collection(db, find_firebase),
                 where('email', '==', email), 
                 orderBy('timestamp', 'desc'),
                );
 const snapShot= await getDocs(q);
 snapShot.forEach(doc => {
    const{bet: challenge, won, balance: blnc, timestamp }= doc.data();
    history.push({bet: challenge, won, balance: blnc, timestamp});
 });
 return history;
}