import React from 'react';
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight, Target, Lightbulb, Rocket, CheckCircle, Star, ArrowRight, Facebook, Twitter, Instagram, Linkedin as LinkedIn, Check, Calendar, Clock, Video, Users } from 'lucide-react';

type FormData = {
  name: string;
  email: string;
  whatsapp: string;
};

function App() {

  const navigate = useNavigate();

  const formatWhatsApp = (value: string) => {
    // Remove todos os caracteres não numéricos
    const cleanedValue = value.replace(/\D/g, "");
  
    // Limita o número de dígitos a 13
    const limitedValue = cleanedValue.slice(0, 13);
  
    // Aplica a formatação
    let formattedValue = "";
    if (limitedValue.length > 0) {
      formattedValue += `(${limitedValue.slice(0, 2)}`; // DDD
    }
    if (limitedValue.length > 2) {
      formattedValue += `) ${limitedValue.slice(2, 7)}`; // Primeiros 5 dígitos
    }
    if (limitedValue.length > 7) {
      formattedValue += `-${limitedValue.slice(7, 11)}`; // Últimos 4 dígitos
    }
  
    return formattedValue;
  };

  const [errors, setErrors] = useState<{ name?: string; email?: string; whatsapp?: string }>({});

  const [formData, setFormData] = useState<FormData>({ name: "", email: "", whatsapp: "" });

  const sectionRef = useRef<HTMLElement>(null); // Criando a referência para a seção

  const handleClick = () => {
    // Rola até a seção quando o botão for clicado
    sectionRef.current?.scrollIntoView({
      behavior: "smooth", // Rolagem suave
      block: "start", // Alinha ao topo da seção
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Remove a formatação do WhatsApp
    const cleanedWhatsapp = formData.whatsapp.replace(/\D/g, "");
  
    // Validação dos campos
    if (!formData.name || !formData.email || !cleanedWhatsapp) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
  
    // Regex para validar o WhatsApp (apenas números)
    const whatsappRegex = /^\d{10,11}$/; // 10 ou 11 dígitos (sem DDD ou com DDD)
    if (!whatsappRegex.test(cleanedWhatsapp)) {
      alert("Por favor, insira um número de WhatsApp válido.");
      return;
    }
  
    // Envia os dados para o webhook
    try {
      const response = await fetch("https://n8n-n8n.i4khe5.easypanel.host/webhook/5b4ac6dd-592b-4181-832e-3afa3a89e589", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, whatsapp: cleanedWhatsapp }), // Envia o número sem formatação
      });
  
      if (!response.ok) {
        throw new Error("Erro ao enviar dados para o webhook");
      }
  
      navigate("/obrigado");
    } catch (error) {
      console.error("Erro ao enviar dados para o webhook", error);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center text-white">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/80 z-10" />
          <img
            src="https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?q=80&w=1470&auto=format&fit=crop=2000"
            alt="Aesthetic clinic background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Dobre o Faturamento da Sua Clínica em 90 Dias
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-[#75df9d] font-semibold">
              LIVE EXCLUSIVA COM WELLISON LUCAS
            </p>
            <p className="text-xl mb-8 text-gray-200">
              CEO da WF Holding | Fundador da Damaface, DamaPay e Dama.AI
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="flex items-center space-x-2">
                <Calendar className="text-[#75df9d] w-6 h-6" />
                <span>Data: 21/03</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="text-[#75df9d] w-6 h-6" />
                <span>Horário: 12h</span>
              </div>
              <div className="flex items-center space-x-2">
                <Video className="text-[#75df9d] w-6 h-6" />
                <span>Duração: 1 hora</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="text-[#75df9d] w-6 h-6" />
                <span>100% Online</span>
              </div>
            </div>
            <button className="bg-[#75df9d] text-black px-8 py-4 rounded-full text-lg font-semibold flex items-center hover:bg-[#67c78b] transition-colors"
             onClick={handleClick}>
              🔴 QUERO PARTICIPAR DA LIVE!
              <ChevronRight className="ml-2" />
            </button>
          </div>
        </div>
      </section>

      {/* Market Context Section */}
      <section className="py-20 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-white">
            O Mercado Estético Nunca Esteve Tão Competitivo!
          </h2>
          <p className="text-xl text-gray-300 text-center max-w-4xl mx-auto mb-12">
            Se você é um profissional da área da saúde - Biomédico(a), Dentista, Médico(a), Dermatologista, 
            Fisioterapeuta, Farmacêutico(a) Esteta ou Enfermeiro(a) Esteta - e deseja DUPLICAR O FATURAMENTO 
            da sua clínica em apenas 90 dias, esta live é para você!
          </p>
        </div>
      </section>

      {/* What You'll Learn Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">
            O que você vai aprender?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Target className="w-12 h-12 text-[#75df9d]" />,
                title: 'As 3 Variáveis para Explodir Suas Vendas',
                description: 'Como transformar consultas em verdadeiros contratos de alto valor',
              },
              {
                icon: <Lightbulb className="w-12 h-12 text-[#75df9d]" />,
                title: 'A Estratégia que Multiplica o Ticket Médio',
                description: 'Como vender mais para cada paciente sem perder qualidade',
              },
              {
                icon: <Rocket className="w-12 h-12 text-[#75df9d]" />,
                title: 'O Poder da Retenção e Fidelização',
                description: 'Como fazer seus clientes retornarem e indicarem novos pacientes',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-zinc-900 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-zinc-800"
              >
                {item.icon}
                <h3 className="text-xl font-semibold mt-4 mb-2 text-white">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Barra de aviso centralizada */}
      <div className="w-full flex justify-center bg-black py-6">
        <div className="w-full bg-[#75df9d] text-black font-bold py-2 overflow-hidden whitespace-nowrap rounded-lg shadow-lg">
          <div className="animate-marquee flex space-x-8 min-w-full">
            <span className="mx-4">GARANTA SUA VAGA • DIA 31/03 ÀS 12H</span>
            <span className="mx-4">GARANTA SUA VAGA • DIA 31/03 ÀS 12H</span>
            <span className="mx-4">GARANTA SUA VAGA • DIA 31/03 ÀS 12H</span>
          </div>
        </div>
      </div>

      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-8">
          {/* Imagem do palestrante */}
          <div className="w-full md:w-1/3 flex justify-center">
            <img
              src="https://imersaotech.com.br/images/franquia/image-evento-damaface.png"
              alt="Palestrante"
              className="rounded-xl shadow-lg border border-zinc-800"
            />
          </div>

          {/* Texto e botão */}
          <div className="w-full md:w-2/3 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Wellison – CEO DamaFace | Fundador do Grupo WF</h2>
            <p className="text-gray-400 mb-6">
              Com uma trajetória sólida e resultados expressivos, <span className="text-[#75df9d] font-semibold">Wellison</span> acumulou experiência em gigantes como Ambev, Embratel, TIM, Oxylane e Pearson (Wizard, Yazigi, Skill, Microlins, People, SOS). Atuou estrategicamente na ZZO (Conserta Smart, CódigoKid, ConsertaExpress) e Polozi, passando por cargos de Consultor de Expansão, Diretor de Operações e Diretor B2B.
            </p>
            <ul className="text-gray-400 space-y-2 mb-6">
              <li className="flex items-center">
                <span className="text-[#75df9d] mr-2">🎤</span> Palestrante e mentor, já formou mais de 400 empresários, transformando negócios e acelerando crescimento.
              </li>
              <li className="flex items-center">
                <span className="text-[#75df9d] mr-2">📈</span> Especialista na expansão e crescimento do canal de franquias, liderou operações que escalaram faturamentos multimilionários, com curvas de crescimento sustentáveis, alta retenção de clientes e metodologias de implantação e formatação de novas redes.
              </li>
              <li className="flex items-center">
                <span className="text-[#75df9d] mr-2">🚀</span> Atualmente lidera o MBC – Master Business Clinical, um modelo inovador focado em maximizar a rentabilidade e a gestão de clínicas no setor de estética e saúde.
              </li>
              <li className="flex items-center">
                <span className="text-[#75df9d] mr-2"></span> É o nome por trás do Grupo WF, que reúne DamaFace, DamaPay, MBC e Dama.AI, consolidando um ecossistema completo para inovação, gestão e aceleração de negócios.
              </li>
            </ul>
            <button className="w-full bg-[#75df9d] text-black px-8 py-4 rounded-lg text-lg font-semibold flex items-center justify-center hover:bg-[#67c78b] transition-colors"
            onClick={handleClick}>
              🔴 QUERO PARTICIPAR DA LIVE!
              <ArrowRight className="ml-2" />
            </button>
          </div>
        </div>

        {/* Adicionando animação via Tailwind */}
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
          .animate-marquee {
            display: flex;
            animation: marquee 10s linear infinite;
          }
        `}</style>
      </section>    

      {/* For Who Section */}
      <section className="py-20 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">
            Para quem é essa live?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Clínicas em Busca de Crescimento',
                description: 'Clínicas que querem aumentar a previsibilidade financeira'
              },
              {
                title: 'Profissionais Independentes',
                description: 'Profissionais que não querem depender de indicações aleatórias'
              },
              {
                title: 'Empreendedores Visionários',
                description: 'Empreendedores que querem parar de perder dinheiro com estratégias ineficazes'
              }
            ].map((item, index) => (
              <div key={index} className="bg-black p-8 rounded-xl shadow-lg border border-zinc-800">
                <div className="text-4xl font-bold text-[#75df9d] mb-4">{(index + 1).toString().padStart(2, '0')}</div>
                <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Bonus Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">
            Bônus Especial para Inscritos
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-zinc-900 p-8 rounded-xl shadow-lg border border-zinc-800">
              <CheckCircle className="w-12 h-12 text-[#75df9d] mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-white">
                Modelo de Script de Vendas
              </h3>
              <p className="text-gray-400">
                Usado por clínicas milionárias para converter mais pacientes
              </p>
            </div>
            <div className="bg-zinc-900 p-8 rounded-xl shadow-lg border border-zinc-800">
              <Users className="w-12 h-12 text-[#75df9d] mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-white">
                Acesso ao Grupo VIP
              </h3>
              <p className="text-gray-400">
                Networking exclusivo com profissionais de elite do mercado
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-zinc-900 text-white"
      ref={sectionRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">VAGAS LIMITADAS!</h2>
            <p className="text-xl mb-8 text-gray-300">
              Inscreva-se agora e transforme sua clínica em uma máquina de faturamento!
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  type="text"
                  placeholder="Seu Nome"
                  className="w-full px-4 py-3 rounded-lg bg-black border border-zinc-800 text-white placeholder-gray-400"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              <div>
                <input
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  type="email"
                  placeholder="Seu E-mail"
                  className="w-full px-4 py-3 rounded-lg bg-black border border-zinc-800 text-white placeholder-gray-400"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              <div>
              <input
                required
                value={formData.whatsapp}
                onChange={(e) => {
                  const formattedValue = formatWhatsApp(e.target.value);
                  setFormData({ ...formData, whatsapp: formattedValue });
                }}
                type="tel"
                placeholder="Seu WhatsApp"
                className="w-full px-4 py-3 rounded-lg bg-black border border-zinc-800 text-white placeholder-gray-400"
                maxLength={15} // Limite máximo de caracteres (incluindo parênteses, espaços e hífen)
              />
                {errors.whatsapp && <p className="text-red-500 text-sm mt-1">{errors.whatsapp}</p>}
              </div>
              <button type="submit" className="w-full bg-[#75df9d] text-black px-8 py-4 rounded-lg text-lg font-semibold flex items-center justify-center hover:bg-[#67c78b] transition-colors">
                🔴 QUERO PARTICIPAR DA LIVE!
                <ArrowRight className="ml-2" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-gray-300 py-12 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-white">Empresa</h3>
              <ul className="space-y-2">
                <li><a href="https://www.damaface.com.br/" className="hover:text-[#75df9d]">Sobre</a></li>
                <li><a href="https://www.damaface.com.br/blog" className="hover:text-[#75df9d]">Blog</a></li>
                <li><a href="https://wa.me/5519995534809?text=Estou%20com%20duvida%2C%20sobre%20o%20a%20aula%20AO%20VIVO" className="hover:text-[#75df9d]">Contato</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-white">Legal</h3>
              <ul className="space-y-2">
                <li><a href="https://www.damaface.com.br/#privacypolicy" className="hover:text-[#75df9d]">Privacidade</a></li>
                <li><a href="https://www.damaface.com.br/#termsofservice" className="hover:text-[#75df9d]">Termos de Uso</a></li>
                <li><a href="https://www.damaface.com.br/" className="hover:text-[#75df9d]">Cookies</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-white">Recursos</h3>
              <ul className="space-y-2">
                <li><a href="https://www.damaface.com.br/" className="hover:text-[#75df9d]">FAQ</a></li>
                <li><a href="https://www.damaface.com.br/" className="hover:text-[#75df9d]">Suporte</a></li>
                <li><a href="https://www.damaface.com.br/" className="hover:text-[#75df9d]">Parceiros</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-white">Social</h3>
              <div className="flex space-x-4">
                <a href="https://www.instagram.com/damafaceoficial/" className="hover:text-[#75df9d]"><Facebook /></a>
                <a href="https://www.instagram.com/damafaceoficial/" className="hover:text-[#75df9d]"><Instagram /></a>
                <a href="https://www.instagram.com/damafaceoficial/" className="hover:text-[#75df9d]"><LinkedIn /></a>
              </div>
            </div>
          </div>
          <div className="border-t border-zinc-800 mt-12 pt-8 text-center">
            <p>&copy; 2025 WF Holding. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
