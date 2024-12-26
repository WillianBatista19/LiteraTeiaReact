import Link from "next/link";
import { BookKey, BookOpen } from "lucide-react";  

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-red-600 to-red-800 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center filter brightness-50"
        style={{
          backgroundImage: "url('bg.jpg')", 
        }}
      ></div>

      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 text-center px-4 sm:px-8">
        <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight text-shadow-md mb-4">
          Bem-vindo ao <span className="text-yellow-500">LiteraTeia</span>
        </h1>
        <p className="text-lg sm:text-xl mb-8 text-white/80">
          Mergulhe no universo da literatura e explore livros com a Teia!
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Link
            href="/auth/login"
            className="flex items-center bg-gradient-to-r from-yellow-400 to-yellow-600 text-white py-3 px-6 rounded-lg hover:bg-gradient-to-l hover:from-yellow-500 hover:to-yellow-700 transform hover:scale-105 transition-all duration-300"
          >
            <BookOpen className="mr-2 w-6 h-6" />
            Entrar
          </Link>
          <Link
            href="/auth/register"
            className="flex items-center text-white py-3 px-6 border border-white/20 rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
          >
            <BookKey className="mr-2 w-6 h-6" />
            Criar uma conta
          </Link>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent h-32"></div>
    </div>
  );
};

export default HomePage;
