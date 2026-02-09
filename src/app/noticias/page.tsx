"use client";

import { motion } from "framer-motion";
import { Heart, Calendar, ArrowRight, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

const noticias = [
    {
        id: "1",
        titulo: "Dra. Lalá visita bairros e ouve demandas da população",
        resumo: "A vereadora esteve presente em cinco bairros da cidade, ouvindo as necessidades dos moradores e registrando demandas para encaminhamento.",
        data: "05/02/2024",
        categoria: "Comunidade",
        imagem: null,
    },
    {
        id: "2",
        titulo: "Projeto de Lei de proteção à mulher é aprovado",
        resumo: "Aprovado por unanimidade na Câmara, o projeto amplia a rede de proteção às mulheres vítimas de violência doméstica.",
        data: "28/01/2024",
        categoria: "Legislativo",
        imagem: null,
    },
    {
        id: "3",
        titulo: "Mutirão de atendimento jurídico gratuito",
        resumo: "Em parceria com a OAB local, Dra. Lalá promove mutirão de orientação jurídica gratuita para a população carente.",
        data: "15/01/2024",
        categoria: "Eventos",
        imagem: null,
    },
    {
        id: "4",
        titulo: "Reunião com Secretaria de Saúde discute melhorias",
        resumo: "Vereadora se reúne com secretário para cobrar melhorias no atendimento das UBS da região sul.",
        data: "10/01/2024",
        categoria: "Saúde",
        imagem: null,
    },
    {
        id: "5",
        titulo: "Gabinete itinerante atende moradores do Travessão",
        resumo: "Mais de 50 famílias foram atendidas no gabinete itinerante realizado no bairro Travessão.",
        data: "05/01/2024",
        categoria: "Comunidade",
        imagem: null,
    },
];

const categorias = ["Todas", "Comunidade", "Legislativo", "Eventos", "Saúde"];

export default function NoticiasPage() {
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
                            Notícias
                        </span>
                        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                            Fique por <span className="gradient-text-rosa">dentro</span>
                        </h1>
                        <p className="text-lg text-gray-600">
                            Acompanhe as últimas novidades do mandato e as ações realizadas
                            em prol da nossa comunidade.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Categories */}
            <section className="py-8 bg-white border-b border-rosa-100 sticky top-20 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3 overflow-x-auto pb-2">
                        {categorias.map((cat, index) => (
                            <button
                                key={index}
                                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${index === 0
                                        ? "bg-rosa-600 text-white"
                                        : "bg-rosa-50 text-rosa-600 hover:bg-rosa-100"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* News Grid */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {noticias.map((noticia, index) => (
                            <motion.article
                                key={noticia.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="glass-card overflow-hidden group"
                            >
                                {/* Image */}
                                <div className="aspect-video bg-gradient-to-br from-rosa-200 to-rosa-300 flex items-center justify-center">
                                    <Heart className="w-16 h-16 text-rosa-400 fill-rosa-400/50 group-hover:scale-110 transition-transform" />
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="px-3 py-1 bg-rosa-100 text-rosa-600 rounded-full text-xs font-medium">
                                            {noticia.categoria}
                                        </span>
                                        <span className="text-sm text-gray-500 flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            {noticia.data}
                                        </span>
                                    </div>

                                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-rosa-600 transition-colors line-clamp-2">
                                        {noticia.titulo}
                                    </h3>

                                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                                        {noticia.resumo}
                                    </p>

                                    <Link
                                        href={`/noticias/${noticia.id}`}
                                        className="text-rosa-600 font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all"
                                    >
                                        Ler mais
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </motion.article>
                        ))}
                    </div>

                    {/* Load More */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mt-12"
                    >
                        <button className="btn-secondary">
                            Carregar mais notícias
                        </button>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
