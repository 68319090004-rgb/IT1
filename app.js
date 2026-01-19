// app.js

document.getElementById("connectButton").addEventListener("click", function () {
  const apiKey = "7kb2i7jREFjgYa4HsWEU4P4BtWv9PGi50l2JTh2c";
  const databaseURL = "https://it-1-b7d46-default-rtdb.firebaseio.com";

  // Firebase Configuration
  const firebaseConfig = {
    apiKey: apiKey,
    authDomain: `${databaseURL.replace("https://", "").replace(".firebaseio.com", "")}.firebaseapp.com`,
    databaseURL: databaseURL,
    projectId: "it-1-b7d46",
    storageBucket: `${databaseURL.replace("https://", "").replace(".firebaseio.com", "")}.appspot.com`,
    messagingSenderId: "525174733532",
    appId: "1:525174733532:web:9e3465c9531efaf8b998c7"
  };

  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const database = firebase.database();

  // Fetch data from Firebase
  const moistureRef = database.ref("/moisture");
  moistureRef.on("value", (snapshot) => {
    const moisture = snapshot.val();
    document.getElementById("moisture").innerText = moisture;
  });

  const pumpRef = database.ref("/pump");
  pumpRef.on("value", (snapshot) => {
    const pumpStatus = snapshot.val() ? "ON" : "OFF";
    document.getElementById("pump-status").innerText = pumpStatus;
  });

  const modeRef = database.ref("/mode");
  modeRef.on("value", (snapshot) => {
    const modeStatus = snapshot.val() === "auto" ? "Auto" : "Manual";
    document.getElementById("mode-status").innerText = modeStatus;
  });

  // Toggle mode between Auto and Manual
  document.getElementById("mode-toggle").addEventListener("change", function () {
    const newMode = this.checked ? "auto" : "manual";
    modeRef.set(newMode);
  });
});
