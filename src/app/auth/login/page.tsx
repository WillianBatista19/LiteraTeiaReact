"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import LoginForm from "../../../components/loginForm"; 
import { BookKey, Loader2 } from "lucide-react"; 

const LoginPage: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/logado");
    }
  }, [router]);

  const handleLogin = async (username: string, password: string) => {
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!username || !password) {
      setErrorMessage("Por favor, preencha todos os campos.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "https://literateia.onrender.com/auth/login", 
        { username, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, 
        }
      );

      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem("token", token); 
        setSuccessMessage("Login realizado com sucesso!");
        router.push("/logado"); 
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("Erro de requisição Axios:", err.response ? err.response.data : err.message);
        setErrorMessage("Erro ao logar! Verifique suas credenciais.");
      } else {
        console.error("Erro inesperado:", err);
        setErrorMessage("Erro inesperado. Tente novamente mais tarde.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center filter brightness-50"
        style={{
          backgroundImage: "url(/bg.jpg)",
        }}
      ></div>

      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 w-full max-w-md p-8 bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl border border-white/20">
        <div className="text-center mb-10">
          <div className="flex justify-center items-center mb-6">
            <BookKey className="text-white w-16 h-16" strokeWidth={1} />
          </div>
          <h1 className="text-4xl font-bold text-white tracking-wide">LiteraTeia</h1>
          <p className="text-white/70 mt-2">Sua jornada literária começa aqui</p>
        </div>

        <LoginForm onSubmit={handleLogin} />

        {errorMessage && (
          <div className="text-red-500 text-sm text-center mt-2">{errorMessage}</div>
        )}
        {successMessage && (
          <div className="text-green-500 text-sm text-center mt-2">{successMessage}</div>
        )}

        {loading && (
          <div className="text-white text-center mt-4">
            <Loader2 className="animate-spin w-6 h-6 mx-auto" />
            <p>Carregando...</p>
          </div>
        )}

        <div className="text-center mt-6">
          <a href="#" className="text-white/70 hover:text-white text-sm">
            Esqueceu sua senha?
          </a>
          <p className="mt-4 text-white/60 text-xs">
            Não tem uma conta?{" "}
            <Link href="/auth/register" className="ml-1 text-white hover:underline">
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
