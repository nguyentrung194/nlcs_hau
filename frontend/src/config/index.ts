const local = {
  api: "http://localhost:5000/",
  firebase: {
    apiKey: "AIzaSyAuqc0Q-NhDtJ2BMP7gG4wSjcyN0_UFBXw",
    authDomain: "ani-success.firebaseapp.com",
    projectId: "ani-success",
    storageBucket: "ani-success.appspot.com",
    messagingSenderId: "744377030507",
    appId: "1:744377030507:web:681182bb9abb63e63c9e2e",
    measurementId: "G-EYLY7ZLMN7",
  },
};

const staging = {
  api: "",
  firebase: {
    apiKey: "AIzaSyAuqc0Q-NhDtJ2BMP7gG4wSjcyN0_UFBXw",
    authDomain: "ani-success.firebaseapp.com",
    projectId: "ani-success",
    storageBucket: "ani-success.appspot.com",
    messagingSenderId: "744377030507",
    appId: "1:744377030507:web:681182bb9abb63e63c9e2e",
    measurementId: "G-EYLY7ZLMN7",
  },
};

let envConfig = local;

if (process.env.REACT_APP_STAGE === "staging") {
  envConfig = staging;
} else {
  envConfig = local;
}

const environment = envConfig;

export default environment;
