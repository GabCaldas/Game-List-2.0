'use client'
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import appmFull from 'src/app/assets/appmastersfull.png';

const firebaseConfig = {
  apiKey: "AIzaSyDF6me6wK5ed-uUFk73ABAI0UZ9fteiHXI",
  authDomain: "react-gamelist.firebaseapp.com",
  projectId: "react-gamelist",
  storageBucket: "react-gamelist.appspot.com",
  messagingSenderId: "810660847157",
  appId: "1:810660847157:web:20cab83508205aefbd5b7c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export default function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter()



  const handleSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setLoading(true);
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (userCredential) {
        const userRef = doc(db, 'users', userCredential.user.uid);
        const userSnapshot = await getDoc(userRef);

        if (!userSnapshot.exists()) {
          await setDoc(userRef, { email: userCredential.user.email });
        }

        router.push('/pages/application/game-list');
      }
    } catch (error) {
      setError('Failed to sign in. Please try again.');
      setLoading(false);
    }
  };
  return (
    <div className="bg-blue-150 min-h-screen flex items-center justify-center">
      <div className="container w-2/3 max-w-xs mx-auto">
        <header className="header mb-8">
          <div className="flex flex-col items-center">
            <Image className="w-200 h-45" src={appmFull} alt="Logo" />
            <span className="font-semibold text-xl text-white mt-3">
              Rate and check your favorite games!
            </span>
          </div>
        </header>

        <form className="text-center">
          <div className="inputContainer mb-6">
            <label htmlFor="email" className="font-normal text-lg mb-2">
              E-mail
            </label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="E-mail"
              onChange={(e) => setEmail(e.target.value)}
              className="border border-blue-500 rounded-lg px-4 py-3 mb-2 text-lg"
            />
          </div>

          <div className="inputContainer mb-6">
            <label htmlFor="password" className="font-normal text-lg mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="*********"
              onChange={(e) => setPassword(e.target.value)}
              className="border border-blue-500 rounded-lg px-4 py-3 mb-2 text-lg"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm mb-4">{error}</p>
          )}

          <a href="#" className="font-normal text-base mb-4 text-white">
            Forgot your password?
          </a>

          <button
            onClick={handleSignIn}
            className="button w-full border border-blue-500 rounded-lg px-4 py-3 transition-all duration-300 ease-in-out text-white text-lg hover:bg-white hover:text-blue-150 hover:border-blue-500 hover:shadow-lg"
          >
            Login
          </button>

          <div className="footer mt-4">
            <p className="font-normal text-base text-white">
              Don't have an account?
            </p>
            <Link
              href="sign-up"
              className="font-normal text-base underline text-white"
            >
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};