
import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import Image from 'next/image';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import appmFull from 'src/app/assets/appmastersfull.png';

const firebaseConfig = { apiKey: 
  "AIzaSyDF6me6wK5ed-uUFk73ABAI0UZ9fteiHXI",
  authDomain: "react-gamelist.firebaseapp.com",
   projectId: "react-gamelist", storageBucket:
    "react-gamelist.appspot.com", messagingSenderId: 
    "810660847157", appId: "1:810660847157:web:20cab83508205aefbd5b7c" };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const SignUp = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [registrationError, setRegistrationError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setRegistrationError('');

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("Informações do usuário salvas com sucesso!");
        setIsRegistered(true);
      })
      .catch((error) => {
        console.error("Erro ao criar o usuário:", error);
        setRegistrationError("Erro ao criar o usuário. Por favor, tente novamente.");
      });
  };

  const handleLoginRedirect = () => {
    navigate('/');
  };

  const handleCloseRegistrationPopup = () => {
    setIsRegistered(false);
  };

  return (
    <div className="bg-blue-150 min-h-screen flex items-center justify-center">
      <div className="container w-2/3 max-w-xs mx-auto">
        <header className="header mb-8">
          <div className="flex flex-col items-center">
            <Image className="w-200 h-45" src={appmFull} alt="Logo" />
            <span className=" break-keep font-semibold text-xl text-white mt-3">
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
              onChange={(e) => setPassword(e.target.value)}
              placeholder="*********"
              className="border border-blue-500 rounded-lg px-4 py-3 mb-2 text-lg"
            />
          </div>

          <button
            onClick={handleSignUp}
            className="button w-full border border-blue-500 rounded-lg px-4 py-3 transition-all duration-300 ease-in-out text-white text-lg hover:bg-white hover:text-blue-150 hover:border-blue-500 hover:shadow-lg"
          >
            SignUp
          </button>

          <div className="footer mt-4">
            <p className="font-normal text-base text-white">
              Already have an account?
            </p>
            <Link
              to="/"
              className="font-normal text-base underline text-white"
            >
              Login
            </Link>
          </div>
        </form>

        {isRegistered && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-white rounded-lg shadow-lg text-center z-50 w-96">
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Registration Successful!</h2>
              <p>You have been successfully registered.</p>
              <button
                onClick={handleLoginRedirect}
                className="mt-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600"
              >
                Go to Login
              </button>
            </div>
            <div className="absolute top-0 right-0 pt-2 pr-4">
              <button
                onClick={handleCloseRegistrationPopup}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        {registrationError && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-white rounded-lg shadow-lg text-center z-50 w-96">
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Registration Error</h2>
              <p>{registrationError}</p>
              <button
                onClick={() => setRegistrationError('')}
                className="mt-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUp;