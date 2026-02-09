"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Heart,
    Phone,
    Mail,
    MapPin,
    Clock,
    Instagram,
    Facebook,
    Youtube,
    Send,
    MessageCircle,
    CheckCircle,
    Loader2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { enviarMensagem } from "@/lib/api/mensagens";

export default function ContatoPage() {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await enviarMensagem({
                nome: formData.name,
                email: formData.email,
                telefone: formData.phone || null,
                assunto: formData.subject,
                mensagem: formData.message,
            });
            setSubmitted(true);
        } catch (err) {
            console.error("Erro ao enviar mensagem:", err);
            setError("Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <main className="min-h-screen">
            <Navbar />

            {/* Hero */}
            <section className="pt-32 pb-16 bg-gradient-to-br from-rosa-100 via-white to-rosa-50 relative overflow-hidden">
                <div className="absolute inset-0 bg-pattern-hearts opacity-30" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <span className="inline-flex items-center gap-2 text-rosa-600 font-medium mb-4">
                            <Heart className="w-5 h-5 fill-rosa-500" />
                            Fale Conosco
                        </span>
                        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                            Estamos aqui para <span className="gradient-text-rosa">ouvir você</span>
                        </h1>
                        <p className="text-lg text-gray-600">
                            Entre em contato com o gabinete da Vereadora Dra. Lalá.
                            Sua participação é fundamental para um mandato transparente e eficiente.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                Informações de Contato
                            </h2>

                            <div className="space-y-6 mb-8">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-rosa-100 flex items-center justify-center flex-shrink-0">
                                        <Phone className="w-5 h-5 text-rosa-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Telefone</h3>
                                        <a href="tel:+551239999999" className="text-gray-600 hover:text-rosa-600">
                                            (12) 3999-9999
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-rosa-100 flex items-center justify-center flex-shrink-0">
                                        <MessageCircle className="w-5 h-5 text-rosa-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">WhatsApp</h3>
                                        <a
                                            href="https://wa.me/5512999999999"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-600 hover:text-rosa-600"
                                        >
                                            (12) 99999-9999
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-rosa-100 flex items-center justify-center flex-shrink-0">
                                        <Mail className="w-5 h-5 text-rosa-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">E-mail</h3>
                                        <a
                                            href="mailto:gabinete@dralala.com.br"
                                            className="text-gray-600 hover:text-rosa-600"
                                        >
                                            gabinete@dralala.com.br
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-rosa-100 flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-5 h-5 text-rosa-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Endereço</h3>
                                        <p className="text-gray-600">
                                            Câmara Municipal de Caraguatatuba<br />
                                            Rua Example, 123 - Centro<br />
                                            Caraguatatuba - SP, 11660-000
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-rosa-100 flex items-center justify-center flex-shrink-0">
                                        <Clock className="w-5 h-5 text-rosa-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Horário de Atendimento</h3>
                                        <p className="text-gray-600">
                                            Segunda a Sexta: 8h às 17h<br />
                                            Sábados: Sob agendamento
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Social */}
                            <div className="pt-6 border-t border-gray-100">
                                <h3 className="font-semibold text-gray-900 mb-4">Redes Sociais</h3>
                                <div className="flex items-center gap-4">
                                    <a
                                        href="https://instagram.com/lalavereadora"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center text-white hover:scale-110 transition-transform"
                                    >
                                        <Instagram className="w-5 h-5" />
                                    </a>
                                    <a
                                        href="https://facebook.com/lalavereadora"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white hover:scale-110 transition-transform"
                                    >
                                        <Facebook className="w-5 h-5" />
                                    </a>
                                    <a
                                        href="https://youtube.com/@lalavereadora"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white hover:scale-110 transition-transform"
                                    >
                                        <Youtube className="w-5 h-5" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            {submitted ? (
                                <div className="glass-card-rosa p-8 text-center h-full flex flex-col items-center justify-center">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6"
                                    >
                                        <CheckCircle className="w-10 h-10 text-green-600" />
                                    </motion.div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                        Mensagem Enviada!
                                    </h3>
                                    <p className="text-gray-600 mb-6">
                                        Obrigada por entrar em contato. Retornaremos em breve!
                                    </p>
                                    <button
                                        onClick={() => setSubmitted(false)}
                                        className="btn-secondary"
                                    >
                                        Enviar nova mensagem
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="glass-card-rosa p-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                        Envie sua mensagem
                                    </h2>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Nome completo *
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="input-rosa"
                                                placeholder="Seu nome"
                                            />
                                        </div>

                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    E-mail *
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    className="input-rosa"
                                                    placeholder="seu@email.com"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Telefone
                                                </label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    className="input-rosa"
                                                    placeholder="(12) 99999-9999"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Assunto *
                                            </label>
                                            <select
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                required
                                                className="input-rosa"
                                            >
                                                <option value="">Selecione um assunto</option>
                                                <option value="demanda">Registrar Demanda</option>
                                                <option value="sugestao">Sugestão de Projeto</option>
                                                <option value="duvida">Dúvida</option>
                                                <option value="elogio">Elogio</option>
                                                <option value="reclamacao">Reclamação</option>
                                                <option value="outros">Outros</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Mensagem *
                                            </label>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                                rows={5}
                                                className="input-rosa resize-none"
                                                placeholder="Escreva sua mensagem..."
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {loading ? (
                                                <>
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                    Enviando...
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="w-5 h-5" />
                                                    Enviar Mensagem
                                                </>
                                            )}
                                        </button>

                                        {error && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm text-center"
                                            >
                                                {error}
                                            </motion.div>
                                        )}
                                    </div>
                                </form>
                            )}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Map Placeholder */}
            <section className="h-96 bg-gray-200 relative">
                <div className="absolute inset-0 flex items-center justify-center bg-rosa-50">
                    <div className="text-center">
                        <MapPin className="w-16 h-16 text-rosa-400 mx-auto mb-4" />
                        <p className="text-gray-600">Mapa da localização do gabinete</p>
                        <p className="text-sm text-gray-500">
                            Integração com Google Maps pode ser adicionada aqui
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
