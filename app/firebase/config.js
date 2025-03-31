import { initializeApp, getApps, getApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { faker } from "@faker-js/faker";
import { getDatabase, ref, push,set ,get ,remove} from "firebase/database";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    databaseURL:process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL

};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

const auth = getAuth(app)
const db = getDatabase(app);
console.log("Database initialized:", db);

const statuses = ["Active", "Break", "Off"];
const roles = ["Supervisor", "TeamLeader", "Member"];
// async function Employee() {
//     for (let i = 0; i < 10; i++) {
//         const newEmpRef = push(ref(db, "employees"));
//         const EmpId = Math.floor(10000 + Math.random() * 90000).toString();
    
//         await set(newEmpRef,{
//           id: EmpId,
//           name: faker.person.fullName(),
//           image: faker.image.avatar(),
//           email: faker.internet.email(),
//           age: faker.number.int({ min: 18, max: 65 }),
//           performance: faker.number.int({ min: 10, max: 95 }),
//           status: statuses[Math.floor(Math.random() * statuses.length)],
//           role: roles[Math.floor(Math.random() * roles.length)],
//           createdAt: new Date().toISOString(),
//         });
//       }
//       console.log("✅ Employees added to Realtime Database!");
  
//   }
  
  // async function Cases() {
  //   const EmpRef = ref(db, "employees");
  //   const snapshot = await get(EmpRef);
  
  //   if (!snapshot.exists()) {
  //     console.log("❌ No users found!");
  //     return;
  //   }
  
  //   const employees = snapshot.val();
  //   const empIds = Object.keys(employees); // Get all user IDs
  
  //   for (let i = 0; i < 200; i++) {
  //     const randomEmpId = empIds[Math.floor(Math.random() * empIds.length)];
  //     await push(ref(db, "cases"), {
  //       caseId: faker.string.uuid(),
  //       title: faker.lorem.words(3),
  //       description: faker.lorem.sentence(),
  //       status: faker.helpers.arrayElement(["open", "in progress", "closed"]),
  //       review: faker.helpers.arrayElement(["satisfied", "nutriant ", "dis satisfied"]),
  //       type: faker.helpers.arrayElement(["critical", "out dated"]),
  //       assignedTo: randomEmpId, 
  //       createdAt: new Date().toISOString(),
  //     });
  //   }
  
  //   console.log("✅ Cases added to Realtime Database!");
  // }


//   async function clearDatabase() {
//     try {
//         await remove(ref(db, "/")); // Remove all data at root
//         console.log("✅ All data has been deleted from Firebase!");
//     } catch (error) {
//         console.error("❌ Error deleting data:", error.message);
//         console.error("Stack trace:", error.stack);
//     }
// }
  
// async function initializeDatabase() {
//   await Employee();
//   await Cases();
//   // await clearDatabase();
// }

// initializeDatabase();
 
export {app,auth,db}