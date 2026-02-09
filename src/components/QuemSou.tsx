"use client";

import { motion } from "framer-motion";
import { Heart, Scale, Award, BookOpen, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function QuemSou() {
    return (
        <section className="py-20 bg-white relative overflow-hidden">
            {/* Background */}
            <div className="absolute top-0 left-0 w-full h-full bg-pattern-hearts opacity-20" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-rosa-100 rounded-full blur-3xl opacity-40" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Image Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="relative">
                            {/* Main Image Container */}
                            <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                                {/* Placeholder - Replace with actual photo */}
                                <div className="w-full h-full bg-gradient-to-br from-rosa-200 via-rosa-300 to-rosa-400 flex items-center justify-center">
                                    <div className="text-center">
                                        <Heart className="w-24 h-24 text-rosa-600 mx-auto mb-4 fill-rosa-500" />
                                        <p className="text-rosa-700 font-medium text-lg">Foto da Dra. Lalá</p>
                                    </div>
                                </div>
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-rosa-600/30 via-transparent to-transparent" />
                            </div>

                            {/* Floating Card - Experience */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="absolute -bottom-6 -right-6 glass-card-rosa p-4 shadow-xl"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-rosa-600 flex items-center justify-center">
                                        <Scale className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-rosa-700">15+</p>
                                        <p className="text-sm text-gray-600">Anos de Advocacia</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Floating Heart */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="absolute -top-4 -left-4"
                            >
                                <div className="w-16 h-16 rounded-full bg-rosa-500 flex items-center justify-center shadow-lg">
                                    <Heart className="w-8 h-8 text-white fill-white" />
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Content Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="inline-flex items-center gap-2 text-rosa-600 font-medium mb-4">
                            <Heart className="w-5 h-5 fill-rosa-500" />
                            Conheça a Dra. Lalá
                        </span>

                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                            Uma advogada a serviço do{" "}
                            <span className="gradient-text-rosa">povo</span>
                        </h2>

                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Natural de Caraguatatuba, formada em Direito com especialização em
                            Direito Constitucional e de Família. Ao longo de mais de 15 anos de
                            carreira, sempre lutei pelos direitos dos mais vulneráveis,
                            especialmente mulheres e famílias em situação de vulnerabilidade.
                        </p>

                        <p className="text-gray-600 mb-8 leading-relaxed">
                            Como vereadora pelo PSD, levo para a Câmara Municipal a mesma
                            determinação que sempre me guiou na advocacia: a busca incansável
                            por <strong className="text-rosa-600">justiça social</strong> e
                            <strong className="text-rosa-600"> igualdade de direitos</strong>.
                        </p>

                        {/* Highlights */}
                        <div className="grid sm:grid-cols-2 gap-4 mb-8">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-rosa-100 flex items-center justify-center">
                                    <Scale className="w-5 h-5 text-rosa-600" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">Advogada</p>
                                    <p className="text-sm text-gray-500">OAB/SP</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-rosa-100 flex items-center justify-center">
                                    <Award className="w-5 h-5 text-rosa-600" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">Partido PSD</p>
                                    <p className="text-sm text-gray-500">Comprometida com você</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-rosa-100 flex items-center justify-center">
                                    <BookOpen className="w-5 h-5 text-rosa-600" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">Especialista</p>
                                    <p className="text-sm text-gray-500">Direito de Família</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-rosa-100 flex items-center justify-center">
                                    <Users className="w-5 h-5 text-rosa-600" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">+5.000</p>
                                    <p className="text-sm text-gray-500">Cidadãos atendidos</p>
                                </div>
                            </div>
                        </div>

                        <Link href="/quem-sou" className="btn-primary inline-flex">
                            Saiba mais sobre mim
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
