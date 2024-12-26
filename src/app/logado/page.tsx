"use client";

import PrivateRoute from "@/components/privateRouter";
import React from "react";

const SuccessPage: React.FC = () => {
  return (
    <PrivateRoute>
      <div className="min-h-screen flex items-center justify-center bg-green-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-green-600">Logado com sucesso!</h1>
          <p className="mt-4 text-lg text-green-800">Bem-vindo à sua conta!</p>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default SuccessPage;
