// EDUVANTA - Protected Page Access Guard

(function () {
  const firebaseConfig = {
    apiKey: "AIzaSyB-9GjrfHDIwbEjScWd5vBRpUvbQX9U2bc",
    authDomain: "eduvanta-93826.firebaseapp.com",
    projectId: "eduvanta-93826",
    storageBucket: "eduvanta-93826.firebasestorage.app",
    messagingSenderId: "33328294092",
    appId: "1:33328294092:web:7f51cd4ecb6b970be27a69"
  };

  // Hide page until authentication is checked
  document.documentElement.style.visibility = "hidden";

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const auth = firebase.auth();

  auth.onAuthStateChanged(async function (user) {
    if (!user) {
      window.location.replace("auth.html?auth=login");
      return;
    }

    try {
      await user.reload();

      const token = await user.getIdTokenResult(true);

      if (!token.claims.email_verified) {
        await auth.signOut();
        window.location.replace("auth.html?auth=login&verify=required");
        return;
      }

      document.documentElement.style.visibility = "visible";

    } catch (error) {
      console.error("Authentication check failed:", error);
      await auth.signOut();
      window.location.replace("auth.html?auth=login");
    }
  });
})();
