"use client";

import { motion } from "framer-motion";
import {
    Heart,
    Scale,
    Award,
    BookOpen,
    Users,
    GraduationCap,
    Briefcase,
    MapPin,
    Calendar,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const timeline = [
    {
        year: "2008",
        title: "Formação em Direito",
        description: "Graduação em Direito pela Universidade de Taubaté (UNITAU)",
        icon: GraduationCap,
    },
    {
        year: "2010",
        title: "OAB/SP",
        description: "Aprovação no Exame da Ordem dos Advogados do Brasil",
        icon: Scale,
    },
    {
        year: "2012",
        title: "Especialização",
        description: "Pós-graduação em Direito de Família e Sucessões",
        icon: BookOpen,
    },
    {
        year: "2015",
        title: "Advocacia Social",
        description: "Início do trabalho voluntário em defesa dos direitos das mulheres",
        icon: Users,
    },
    {
        year: "2020",
        title: "Candidatura",
        description: "Primeira candidatura a vereadora pelo PSD",
        icon: Award,
    },
    {
        year: "2021",
        title: "Vereadora Eleita",
        description: "Eleita vereadora de Caraguatatuba com expressiva votação",
        icon: Heart,
    },
];

const values = [
    {
        title: "Transparência",
        description: "Prestação de contas clara e acessível a toda população",
        icon: "🔍",
    },
    {
        title: "Compromisso",
        description: "Dedicação total ao mandato e às demandas da comunidade",
        icon: "🤝",
    },
    {
        title: "Justiça",
        description: "Luta incansável pelos direitos de todos os cidadãos",
        icon: "⚖️",
    },
    {
        title: "Empatia",
        description: "Escuta ativa e acolhimento às necessidades do povo",
        icon: "💗",
    },
];

export default function QuemSouPage() {
    return (
        <main className="min-h-screen">
            <Navbar />

            {/* Hero */}
            <section className="pt-32 pb-20 bg-gradient-to-br from-rosa-100 via-white to-rosa-50 relative overflow-hidden">
                <div className="absolute inset-0 bg-pattern-hearts opacity-30" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Image */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="relative"
                        >
                            <div className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
                                <div className="w-full h-full bg-gradient-to-br from-rosa-200 via-rosa-300 to-rosa-400 flex items-center justify-center">
                                    <div className="text-center">
                                        <Heart className="w-32 h-32 text-rosa-600 mx-auto mb-4 fill-rosa-500" />
                                        <p className="text-rosa-700 font-medium text-xl">Foto da Dra. Lalá</p>
                                    </div>
                                </div>
                            </div>

                            {/* Badge */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="absolute -bottom-4 left-1/2 -translate-x-1/2 glass-card-rosa px-6 py-3 shadow-xl"
                            >
                                <div className="flex items-center gap-3">
                                    <Scale className="w-6 h-6 text-rosa-600" />
                                    <span className="font-bold text-rosa-700">Advogada | PSD</span>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Content */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <span className="inline-flex items-center gap-2 text-rosa-600 font-medium mb-4">
                                <Heart className="w-5 h-5 fill-rosa-500" />
                                Quem Sou
                            </span>

                            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                                Vereadora{" "}
                                <span className="gradient-text font-[var(--font-playfair)]">
                                    Dra. Lalá
                                </span>
                            </h1>

                            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                Nascida e criada em Caraguatatuba, sou advogada há mais de 15 anos,
                                com especialização em Direito de Família e Constitucional. Minha
                                trajetória sempre foi marcada pela defesa dos mais vulneráveis.
                            </p>

                            <p className="text-gray-600 mb-8 leading-relaxed">
                                Como vereadora eleita pelo PSD, trago para o legislativo a mesma
                                paixão e dedicação que sempre tive na advocacia. Acredito que a
                                política deve ser feita com amor, transparência e compromisso
                                com quem mais precisa.
                            </p>

                            <div className="flex flex-wrap gap-3">
                                <span className="badge-psd">
                                    <Heart className="w-4 h-4" />
                                    Partido PSD
                                </span>
                                <span className="badge-advogada">
                                    <Scale className="w-4 h-4" />
                                    OAB/SP
                                </span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Meus <span className="gradient-text-rosa">Valores</span>
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Princípios que guiam cada ação do meu mandato
                        </p>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="glass-card-rosa p-6 text-center"
                            >
                                <span className="text-4xl mb-4 block">{value.icon}</span>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    {value.title}
                                </h3>
                                <p className="text-gray-600 text-sm">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-20 bg-gradient-rosa">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Minha <span className="gradient-text-rosa">Trajetória</span>
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Uma história construída com dedicação e amor ao próximo
                        </p>
                    </motion.div>

                    <div className="relative">
                        {/* Timeline Line */}
                        <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-rosa-300 -translate-x-1/2" />

                        {/* Timeline Items */}
                        <div className="space-y-8">
                            {timeline.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className={`relative flex items-center ${index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                                        }`}
                                >
                                    {/* Dot */}
                                    <div className="absolute left-4 sm:left-1/2 w-4 h-4 bg-rosa-500 rounded-full border-4 border-rosa-200 -translate-x-1/2 z-10" />

                                    {/* Content */}
                                    <div
                                        className={`ml-12 sm:ml-0 sm:w-1/2 ${index % 2 === 0 ? "sm:pr-12 sm:text-right" : "sm:pl-12"
                                            }`}
                                    >
                                        <div className="glass-card p-4">
                                            <div className="flex items-center gap-2 mb-2">
                                                <item.icon className="w-5 h-5 text-rosa-600" />
                                                <span className="text-rosa-600 font-bold">{item.year}</span>
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-900 mb-1">
                                                {item.title}
                                            </h3>
                                            <p className="text-gray-600 text-sm">{item.description}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
