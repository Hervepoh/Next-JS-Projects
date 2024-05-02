"use client"
import { useState, ChangeEvent } from 'react';
import * as Yup from 'yup';
import useClientAuth from '../../Hooks/useClientAuth'; 
import GoogleLogo from "../../../public/logo-google.webp";
import Image from "next/image";

interface FormData {
  email: string;
  password: string;
}

const schema = Yup.object().shape({
  email: Yup.string().email('Format Mail invalide').required('Email requis'),
  password: Yup.string().required('Mot de passe is requis')
});

export default function PageSignInAndUp() {
  const { isFetch, signUp, signIn, redirectIfAuthenticated, loginWithGoogle } = useClientAuth(); 
  const [isSignUpActive, setIsSignUpActive] = useState(false);
  const [formData, setFormData] = useState<FormData>({ email: '', password: '' });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleFormChange = () => {
    setIsSignUpActive(!isSignUpActive);
    setFormData({ email: '', password: '' }); 
    setErrors({});
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSignUp = () => {
    schema.validate(formData, { abortEarly: false })
      .then(() => {
        signUp(formData.email, formData.password);
      })
      .catch((validationErrors: Yup.ValidationError) => {
        const formattedErrors: Partial<FormData> = {};
        validationErrors.inner.forEach(error => {
          formattedErrors[error.path as keyof FormData] = error.message;
        });
        setErrors(formattedErrors);
      });
  };

  const handleSignIn = () => {
    schema.validate(formData, { abortEarly: false })
      .then(() => {
        signIn(formData.email, formData.password);
      })
      .catch((validationErrors: Yup.ValidationError) => {
        const formattedErrors: Partial<FormData> = {};
        validationErrors.inner.forEach(error => {
          formattedErrors[error.path as keyof FormData] = error.message;
        });
        setErrors(formattedErrors);
      });
  };

  if (isFetch) {
    return <h2>En cours de connexion</h2>;
  }

  redirectIfAuthenticated();

  return (
    <section className="w-full h-screen flex items-center justify-center flex-col gap-2 ">
      <form className="max-w-[800px] flex flex-col gap-2 bg-slate-50 p-5 rounded shadow-md">

        {isSignUpActive ? (
          <h1 className="text-center text-gray-900 text-4xl mb-3 font-bold">Inscription</h1>
        ) : (
          <h1 className="text-center text-gray-900 text-4xl mb-3 font-bold">Connexion</h1>
        )}

        <label className="text-slate-900">Email</label>
        <input
          type="email"
          onChange={handleInputChange}
          value={formData.email}
          name="email"
          className="h-10 border border-slate-900 rounded p-4"
        />
        {errors.email && <p className="text-red-500">{errors.email}</p>}

        <label className="text-slate-900">Password</label>
        <input
          type="password"
          onChange={handleInputChange}
          value={formData.password}
          name="password"
          className="h-10 border border-slate-900 rounded p-4"
        />
        {errors.password && <p className="text-red-500">{errors.password}</p>}

        {isSignUpActive ? (
          <button
            onClick={handleSignUp}
            type="button"
            className="bg-gray-600 px-3 py-1.5 text-white my-3 rounded hover:bg-gray-700"
          >
            S'inscrire
          </button>
        ) : (
          <button
            onClick={handleSignIn}
            type="button"
            className="bg-gray-600 px-3 py-1.5 text-white my-3 rounded hover:bg-gray-700"
          >
            Se connecter
          </button>
        )}

        {isSignUpActive ? (
          <a onClick={handleFormChange} href="#" className="text-red-500 hover:text-red-900">
            Déja un compte? Se connecter
          </a>
        ) : (
          <a onClick={handleFormChange} href="#" className="text-red-500 hover:text-red-900">
            Pas de compte? Créer un compte
          </a>
        )}
      </form>

      <button
        onClick={loginWithGoogle}
        type="button"
        className=" bg-gray-200 hover:bg-gray-300 rounded-md text-gray-800 p-2 flex items-center gap-2"
      >
        <Image src={GoogleLogo} width={30} height={30} alt="Logo Google" />
        <span>{isSignUpActive ? "Inscription via Google" : "Connexion via Google"}</span>
      </button>
      
    </section>
  );
}
