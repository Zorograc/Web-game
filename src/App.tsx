import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAYvEYcwXHATCmptKgXnKEbBF-BS7BFCss",
  authDomain: "web-game-4d168.firebaseapp.com",
  projectId: "web-game-4d168",
  storageBucket: "web-game-4d168.appspot.com",
  messagingSenderId: "927198535978",
  appId: "1:927198535978:web:68e5da7f3f89a897c77e53"
};
initializeApp(firebaseConfig);

function App()
{
    const auth = getAuth()
  
    const signupForm = document.querySelector(".signup") as HTMLFormElement;
    signupForm?.addEventListener("submit", (e) => {
        e.preventDefault()
        const email = signupForm.email.value
        const password = signupForm.password.value
        createUserWithEmailAndPassword(auth, email, password )
        .then ((cred) => {
            console.log("user created:",cred.user)
            signupForm.reset()
            
        })
        .catch ((err) => {
            console.log(err.message)
        })

    }) 

    return (
        <div id="app">
            <form className = "signup">
                <input type = "email" name= "email" /> 
                <input type= "password" name = "password" />
                <button> sign up</button>
            </form>
        </div>
         )
}

export default App
