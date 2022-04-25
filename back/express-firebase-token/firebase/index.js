'use strict';
const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");

const {getAuth} = require("firebase-admin/auth");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");
const serviceAccount = require("./fire.json");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

async function getAllData(collection) {
  const refColletion = db.collection(collection);
  const snapshot = await refColletion.get();
  const data = [];
  snapshot.forEach((doc) => {
    const obj = {
      id: doc.id,
      data: doc.data(),
    };
    data.push(obj);
  });

  return data
}

async function getOneData(collection, id){

  const refFirebase = db.collection(collection).doc(id);
  const doc = await refFirebase.get();
  if (!doc.exists) {
    return 'No such document!' 
  } else {
    return doc.data() 
  }


}
async function setData(collection, content) {
  const firebaseResponse = await db.collection(collection).add(content);
  return firebaseResponse;
}

async function updateData(collection,id, newContent){

  const firebaseRef = db.collection(collection).doc(id);
  const responseFirebase = await firebaseRef.update(newContent);
   return responseFirebase
}

async function deleteData(collection, id){
  const responseFirebase = await db.collection(collection).doc(id).delete();
   return responseFirebase
}


async function getToken(token){
  let response
  try {
   response = await getAuth().verifyIdToken(token)
   return response
}catch(err){

  return false
} 
  

}
module.exports = { getAllData ,getOneData ,  setData, updateData, deleteData, getToken};
