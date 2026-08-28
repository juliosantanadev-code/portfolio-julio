import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
import { ContactBackground } from '../components/ui/ContactBackground';

type Channel = 'email' | 'whatsapp' | null;

export function Contact() {
  const [selectedChannel, setSelectedChannel] = useState<Channel>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    dni: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedChannel === 'whatsapp') {
      const text = `Hola Julio, mi nombre es ${formData.name}. ${formData.company ? `[Empresa/RUC: ${formData.company}] ` : ''}[DNI: ${formData.dni}]. Me contacto desde tu portfolio para el siguiente asunto: ${formData.message}`;
      const url = `https://wa.me/51917983492?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank');
    } else if (selectedChannel === 'email') {
      const body = `Nombre: ${formData.name}\nEmpresa/RUC: ${formData.company || 'N/A'}\nDNI: ${formData.dni}\n\nMensaje:\n${formData.message}`;
      const url = `mailto:juliosantana.dev@gmail.com?subject=${encodeURIComponent(`Contacto Portfolio - ${formData.name}`)}&body=${encodeURIComponent(body)}`;
      window.location.href = url;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="relative min-h-screen pt-24 pb-12 flex flex-col font-mono text-white overflow-hidden">
      <ContactBackground />
      
      {/* Overlay to ensure readability while keeping the dark aesthetic */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-black/40" />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 flex-1 flex flex-col justify-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tighter">
            CONTÁCTAME<span className="text-gray-500 animate-pulse">_</span>
          </h1>
          <p className="text-gray-400 text-[14px] uppercase tracking-widest">
            Selecciona un medio
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Email Card */}
          <motion.button
            onClick={() => setSelectedChannel('email')}
            animate={{ 
              y: selectedChannel === null ? [0, -4, 0] : 0,
            }}
            transition={{ 
              duration: 4, 
              repeat: selectedChannel === null ? Infinity : 0, 
              ease: "easeInOut",
              times: [0, 0.5, 1]
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`
              relative p-8 border text-left flex flex-col justify-between transition-all duration-300
              ${selectedChannel === 'email' 
                ? 'border-white bg-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)]' 
                : 'border-white/20 bg-black/60 hover:border-white/50 hover:bg-black/80'}
            `}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className={`p-3 border ${selectedChannel === 'email' ? 'border-white bg-white text-black' : 'border-white/30 text-white'}`}>
                <SiGmail size={24} className={selectedChannel === 'email' ? 'text-black drop-shadow-none' : 'text-[#EA4335] drop-shadow-[0_0_8px_rgba(234,67,53,0.8)]'} />
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-tight">CORREO</h2>
                <p className="text-[12px] text-gray-400 font-bold tracking-widest mt-1">juliosantana.dev@gmail.com</p>
              </div>
            </div>
            
            <p className="text-gray-400 text-[13px] mb-6">
              Para propuestas formales, solicitudes de cotización y contratos detallados.
            </p>

            <div className="flex items-center text-[12px] font-bold">
              <span className={`transition-opacity ${selectedChannel === 'email' ? 'opacity-100' : 'opacity-0'} mr-2`}>[</span>
              {selectedChannel === 'email' ? 'CANAL_SELECCIONADO' : 'SELECCIONAR_CANAL'}
              <span className={`transition-opacity ${selectedChannel === 'email' ? 'opacity-100' : 'opacity-0'} ml-2`}>]</span>
            </div>
          </motion.button>

          {/* WhatsApp Card */}
          <motion.button
            onClick={() => setSelectedChannel('whatsapp')}
            animate={{ 
              y: selectedChannel === null ? [0, 4, 0] : 0, // Desincronizado con Email
            }}
            transition={{ 
              duration: 3.5, 
              repeat: selectedChannel === null ? Infinity : 0, 
              ease: "easeInOut",
              times: [0, 0.5, 1],
              delay: 0.5
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`
              relative p-8 border text-left flex flex-col justify-between transition-all duration-300
              ${selectedChannel === 'whatsapp' 
                ? 'border-[#25D366] bg-[#25D366]/10 shadow-[0_0_15px_rgba(37,211,102,0.2)]' 
                : 'border-white/20 bg-black/60 hover:border-[#25D366]/50 hover:bg-black/80'}
            `}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className={`p-3 border ${selectedChannel === 'whatsapp' ? 'border-[#25D366] bg-[#25D366] text-black' : 'border-white/30 text-white'}`}>
                <FaWhatsapp size={24} className={selectedChannel === 'whatsapp' ? 'text-black drop-shadow-none' : 'text-[#25D366] drop-shadow-[0_0_8px_rgba(37,211,102,0.8)]'} />
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-tight">WHATSAPP</h2>
                <p className="text-[12px] text-gray-400 font-bold tracking-widest mt-1">+51 917 983 492</p>
              </div>
            </div>
            
            <p className="text-gray-400 text-[13px] mb-6">
              Para comunicación rápida, consultas directas y respuestas ágiles.
            </p>

            <div className={`flex items-center text-[12px] font-bold ${selectedChannel === 'whatsapp' ? 'text-[#25D366]' : ''}`}>
              <span className={`transition-opacity ${selectedChannel === 'whatsapp' ? 'opacity-100' : 'opacity-0'} mr-2`}>[</span>
              {selectedChannel === 'whatsapp' ? 'CANAL_SELECCIONADO' : 'SELECCIONAR_CANAL'}
              <span className={`transition-opacity ${selectedChannel === 'whatsapp' ? 'opacity-100' : 'opacity-0'} ml-2`}>]</span>
            </div>
          </motion.button>
        </div>

        {/* Dynamic Form */}
        <AnimatePresence>
          {selectedChannel && (
            <motion.div
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
              transition={{ duration: 0.4 }}
              className="border border-white/20 bg-black/80 p-8"
            >
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex items-center gap-2 mb-2 border-b border-white/20 pb-4">
                  <div className={`w-2 h-2 ${selectedChannel === 'whatsapp' ? 'bg-[#25D366]' : 'bg-white'} animate-pulse`} />
                  <span className="text-[14px] uppercase tracking-widest text-gray-400">
                    Transmisión de Datos
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[12px] text-gray-400 uppercase tracking-wider">Nombre Completo <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-transparent border border-white/30 p-3 text-[14px] focus:outline-none focus:border-white transition-colors"
                      placeholder="Ej. Alan Turing"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[12px] text-gray-400 uppercase tracking-wider">Empresa / RUC</label>
                    <input 
                      type="text" 
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="bg-transparent border border-white/30 p-3 text-[14px] focus:outline-none focus:border-white transition-colors"
                      placeholder="Opcional"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[12px] text-gray-400 uppercase tracking-wider">DNI <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    name="dni"
                    required
                    value={formData.dni}
                    onChange={handleInputChange}
                    className="bg-transparent border border-white/30 p-3 text-[14px] focus:outline-none focus:border-white transition-colors"
                    placeholder="Documento de Identidad"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[12px] text-gray-400 uppercase tracking-wider">Mensaje <span className="text-red-500">*</span></label>
                  <textarea 
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="bg-transparent border border-white/30 p-3 text-[14px] focus:outline-none focus:border-white transition-colors resize-none"
                    placeholder="Describe el objetivo de tu contacto..."
                  />
                </div>

                <button 
                  type="submit"
                  className={`
                    mt-4 p-4 flex items-center justify-center gap-3 border text-[14px] font-bold uppercase tracking-widest transition-all
                    ${selectedChannel === 'whatsapp' 
                      ? 'border-[#25D366] bg-[#25D366] text-black hover:bg-[#1fad53]' 
                      : 'border-white bg-white text-black hover:bg-gray-200'}
                  `}
                >
                  ENVIAR <ArrowRight size={18} />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
