import React from 'react';
import { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react';
const Obrigado = () => {

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress from 0 to 98%
    const timer = setTimeout(() => {
      setProgress(98);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
      {/* Main Content Container */}
      <div className="w-full max-w-2xl text-center space-y-8">
        {/* Thank You Text */}
        <h1 className="text-[#75df9d] text-5xl font-bold mb-8 animate-fade-in">
          Obrigado!
        </h1>

        {/* Loading Bar Container */}
        <div className="w-full bg-gray-800 rounded-full h-4 overflow-hidden">
          <div 
            className="bg-[#75df9d] h-4 rounded-full transition-all duration-[1500ms] ease-out relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
          </div>
        </div>

        {/* Message */}
        <div className="mt-12 bg-[#75df9d] bg-opacity-15 p-8 rounded-xl border-2 border-[#75df9d] shadow-[0_0_30px_rgba(117,223,157,0.3)] transform hover:scale-[1.02] transition-all duration-300">
          <p className="text-[#75df9d] text-2xl font-semibold leading-relaxed">
            Algo de muito bom está para acontecer na sua vida, você já deu o primeiro passo! Agora entre no grupo exclusivo para receber as informações e materias do evento.
          </p>
        </div>

        {/* Button */}
        <a 
          href="https://chat.whatsapp.com/DnNKx89th4hAVHXQ6GDPNG" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center gap-2 bg-[#75df9d] text-black font-bold px-8 py-4 rounded-full text-lg hover:bg-[#8df5b5] transform hover:scale-105 transition-all duration-300 mt-8"
        >
          Entrar no Grupo
          <ArrowRight className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
}

export default Obrigado;
