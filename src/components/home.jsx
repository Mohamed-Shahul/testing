import {addDoc, collection, doc, getDoc, getDocs, setDoc, updateDoc} from "firebase/firestore";
import React, {useEffect, useState} from "react";
import {db} from "../firebase/config";

const Home = () => {
  const [data, setData] = useState();
  useEffect(() => {
    const collectionRef = collection(db, "testingData");
    getDocs(collectionRef)
      .then((snapshot) => {
        let result = [];
        snapshot.docs.forEach((doc) => {
          result.push({...doc.data(), id: doc.id});
        });
        setData(result);
      })
      .catch((err) => console.log("==err", err));
  }, []);

  console.log("==data", data);

  const createData = async () => {
    const userData = {
      name: "shahul",
      age: 22,
      details: [],
    };
    try {
      await setDoc(doc(db, "testingData", userData?.name), userData);
      console.log("Document successfully written!");
    } catch (error) {
      console.error("Error writing document: ", error);
    }
  };

  const updateData = async () => {
    try {
        const userRef = doc(db, "testingData", "shahul");
        await updateDoc(userRef, {
          age: 26, // Updating only the "age" field
          email: "mohamedshahul@example.com",
        });
        console.log("User updated!");
      } catch (error) {
        console.error("Error updating user:", error);
      }
  };
  const deleteData = async () => {

    try {
        const userRef = doc(db, "testingData", "shahul");
        await setDoc(userRef, { age: 27, name: "John Updated" }, { merge: true });
        console.log("User updated with merge!");
      } catch (error) {
        console.error("Error updating user:", error);
      }
  };
  const getData = async () => {
    try {
        const docRef = doc(db, "testingData", "shahul");
        const docSnap = await getDoc(docRef);
    
        if (docSnap.exists()) {
          console.log("==User data:", docSnap.data());
        } else {
          console.log("No such user!");
        }
      } catch (error) {
        console.error("Error getting user:", error);
      }
  };

  const getAllUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "testingData"));
      querySnapshot.forEach((doc) => {
        console.log(`User ID: ${doc.id}`, doc.data());
      });
    } catch (error) {
      console.error("Error getting users:", error);
    }
  };
  

  return (
    <div
      style={{
        width: "20%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "centerf",
      }}
    >
      {/* <label> Name</label>
      <input title="name" />
      <label> password</label>

      <input /> */}
      <button onClick={createData}>create</button>
      <button onClick={updateData}>update</button>
      <button onClick={getData}>getData</button>
      <button onClick={getAllUsers}>getAllData</button>
    </div>
  );
};

export default Home;
