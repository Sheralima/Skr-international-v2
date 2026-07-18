import { auth, db } from "./firebase.js";

import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

// Logout

document.getElementById("logoutBtn").addEventListener("click", async () => {

  await signOut(auth);

  window.location.href = "login.html";

});

// Check Login

onAuthStateChanged(auth, (user) => {

  if (!user) {

    window.location.href = "login.html";

  } else {

    loadStatistics();

  }

});

// Dashboard Statistics

async function loadStatistics() {

  // Users

  const usersSnapshot = await getDocs(collection(db, "users"));

  document.getElementById("totalUsers").innerText =
    usersSnapshot.size;

  let totalBalance = 0;

  usersSnapshot.forEach((doc) => {

    const data = doc.data();

    totalBalance += Number(data.balance || 0);

  });

  document.getElementById("totalBalance").innerText =
    totalBalance;

  // Deposits

  const depositsSnapshot =
    await getDocs(collection(db, "deposits"));

  let pendingDeposits = 0;

  depositsSnapshot.forEach((doc) => {

    if (doc.data().status === "Pending") {

      pendingDeposits++;

    }

  });

  document.getElementById("pendingDeposits").innerText =
    pendingDeposits;

  // Withdraws

  const withdrawSnapshot =
    await getDocs(collection(db, "withdraws"));

  let pendingWithdraws = 0;

  withdrawSnapshot.forEach((doc) => {

    if (doc.data().status === "Pending") {

      pendingWithdraws++;

    }

  });

  document.getElementById("pendingWithdraws").innerText =
    pendingWithdraws;

} // ===============================
// Load Deposit Requests
// ===============================

import {
  query,
  where,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

async function loadDeposits() {

  const table = document.getElementById("depositTable");

  table.innerHTML = "";

  const q = query(
    collection(db, "deposits"),
    where("status", "==", "Pending")
  );

  const snapshot = await getDocs(q);

  snapshot.forEach((deposit) => {

    const data = deposit.data();

    table.innerHTML += `

<tr>

<td>${data.uid}</td>

<td>Rs. ${data.amount}</td>

<td>${data.status}</td>

<td>

<button
class="btn btn-success btn-sm"
onclick="approveDeposit('${deposit.id}')">

Approve

</button>

<button
class="btn btn-danger btn-sm ms-2"
onclick="rejectDeposit('${deposit.id}')">

Reject

</button>

</td>

</tr>

`;

  });

}

// ===============================
// Reject Deposit
// ===============================

window.rejectDeposit = async function(id){

  await updateDoc(doc(db,"deposits",id),{

    status:"Rejected"

  });

  alert("Deposit Rejected");

  loadDeposits();

  loadStatistics();

}

// Load Deposits

loadDeposits();
