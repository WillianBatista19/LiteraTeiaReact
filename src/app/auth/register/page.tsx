"use client";

import React, { useState } from "react";
import axios from "axios";
import { BookLock, User, Lock, Mail } from "lucide-react";
import Link from "next/link";

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
  
    if (!formData.name || !formData.email || !formData.password) {
      setErrorMessage("Todos os campos são obrigatórios.");
      return;
    }
  
    try {
      await axios.post(
        "https://literateia.onrender.com/auth/register",
        formData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      
      setSuccessMessage("Cadastro realizado com sucesso!");
      setTimeout(() => {
        window.location.href = "/auth/login"; 
      }, 2000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error("Erro na resposta:", error.response);
          setErrorMessage("Erro ao registrar usuário. Tente novamente!");
        } else if (error.request) {
          console.error("Nenhuma resposta recebida:", error.request);
          setErrorMessage("Erro de rede. Tente novamente mais tarde.");
        } else {
          console.error("Erro ao fazer a requisição:", error.message);
          setErrorMessage("Erro inesperado. Tente novamente!");
        }
      } else {
        console.error("Erro inesperado", error);
        setErrorMessage("Erro inesperado. Tente novamente!");
      }
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
            <BookLock className="text-white w-16 h-16" strokeWidth={1} />
          </div>
          <h1 className="text-4xl font-bold text-white tracking-wide">LiteraTeia</h1>
          <p className="text-white/70 mt-2">Crie sua conta e comece agora!</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="text-white/60 w-5 h-5" />
            </div>
            <input
              type="text"
              name="name"
              placeholder="Nome"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full py-3 pl-10 pr-4 bg-white/10 text-white placeholder-white/50 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="text-white/60 w-5 h-5" />
            </div>
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full py-3 pl-10 pr-4 bg-white/10 text-white placeholder-white/50 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="text-white/60 w-5 h-5" />
            </div>
            <input
              type="password"
              name="password"
              placeholder="Senha"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full py-3 pl-10 pr-4 bg-white/10 text-white placeholder-white/50 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30"
            />
          </div>

          {errorMessage && (
            <div className="text-red-500 text-sm text-center mt-2">{errorMessage}</div>
          )}
          {successMessage && (
            <div className="text-green-500 text-sm text-center mt-2">{successMessage}</div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-red-600 to-red-800 text-white rounded-lg hover:from-red-700 hover:to-red-900 transition-all duration-300"
          >
            Criar Conta
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-white/60 text-xs">
            Já tem uma conta?{" "}
            <Link href="/auth/login" className="ml-1 text-white hover:underline">
              Faça login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
