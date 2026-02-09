"use client";

import { motion } from "framer-motion";
import { Heart, Scale, MessageCircle, ArrowDown } from "lucide-react";
import Image from "next/image";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden bg-pattern-hearts">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-rosa-100 via-white to-rosa-50" />

            {/* Decorative Hearts */}
            <motion.div
                animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-20 left-10 text-rosa-200 opacity-50"
            >
                <Heart className="w-16 h-16 fill-current" />
            </motion.div>
            <motion.div
                animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute bottom-40 right-20 text-rosa-300 opacity-40"
            >
                <Heart className="w-24 h-24 fill-current" />
            </motion.div>
            <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 3.5, repeat: Infinity }}
                className="absolute top-1/3 right-10 text-rosa-200 opacity-30"
            >
                <Heart className="w-12 h-12 fill-current" />
            </motion.div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center lg:text-left"
                    >
                        {/* Badges */}
                        <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-6">
                            <motion.span
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 }}
                                className="badge-psd"
                            >
                                <Heart className="w-4 h-4" />
                                PSD
                            </motion.span>
                            <motion.span
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4 }}
                                className="badge-advogada"
                            >
                                <Scale className="w-4 h-4" />
                                Advogada
                            </motion.span>
                        </div>

                        {/* Title */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
                        >
                            <span className="text-gray-800">Vereadora</span>
                            <br />
                            <span className="gradient-text font-[var(--font-playfair)]">
                                Dra. Lalá
                            </span>
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-lg sm:text-xl text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0"
                        >
                            Comprometida com a <strong className="text-rosa-600">justiça social</strong>,
                            os <strong className="text-rosa-600">direitos das mulheres</strong> e o
                            <strong className="text-rosa-600"> desenvolvimento</strong> da nossa cidade.
                        </motion.p>

                        {/* Trust Indicator */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="flex items-center gap-2 justify-center lg:justify-start mb-8"
                        >
                            <div className="flex -space-x-2">
                                <div className="w-8 h-8 rounded-full bg-rosa-200 border-2 border-white flex items-center justify-center text-rosa-600 text-xs font-bold">+</div>
                                <div className="w-8 h-8 rounded-full bg-rosa-300 border-2 border-white flex items-center justify-center text-rosa-700 text-xs font-bold">5</div>
                                <div className="w-8 h-8 rounded-full bg-rosa-400 border-2 border-white flex items-center justify-center text-white text-xs font-bold">K</div>
                            </div>
                            <span className="text-sm text-gray-600">
                                <strong className="text-rosa-600">+5.000</strong> cidadãos atendidos
                            </span>
                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                        >
                            <a
                                href="https://wa.me/5512999999999"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-whatsapp"
                            >
                                <MessageCircle className="w-5 h-5" />
                                Fale pelo WhatsApp
                            </a>
                            <a href="#gabinete-digital" className="btn-primary">
                                <Heart className="w-5 h-5" />
                                Envie sua Demanda
                            </a>
                        </motion.div>

                        {/* Response Time */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="mt-6 text-sm text-gray-500 flex items-center gap-2 justify-center lg:justify-start"
                        >
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            Respondemos em até 24 horas
                        </motion.p>
                    </motion.div>

                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative flex justify-center lg:justify-end"
                    >
                        <div className="relative">
                            {/* Heart Frame */}
                            <motion.div
                                animate={{ rotate: [0, 5, 0, -5, 0] }}
                                transition={{ duration: 6, repeat: Infinity }}
                                className="absolute -inset-4 sm:-inset-8"
                            >
                                <svg viewBox="0 0 100 100" className="w-full h-full">
                                    <defs>
                                        <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#db2777" />
                                            <stop offset="50%" stopColor="#ec4899" />
                                            <stop offset="100%" stopColor="#f472b6" />
                                        </linearGradient>
                                    </defs>
                                    <path
                                        d="M50 88 C20 60, 0 40, 10 25 C20 10, 35 10, 50 25 C65 10, 80 10, 90 25 C100 40, 80 60, 50 88"
                                        fill="none"
                                        stroke="url(#heartGradient)"
                                        strokeWidth="2"
                                        opacity="0.5"
                                    />
                                </svg>
                            </motion.div>

                            {/* Photo Container */}
                            <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-full overflow-hidden border-4 border-rosa-300 shadow-2xl">
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-rosa-600/20" />
                                {/* Placeholder - Replace with actual photo */}
                                <div className="w-full h-full bg-gradient-to-br from-rosa-200 to-rosa-300 flex items-center justify-center">
                                    <div className="text-center">
                                        <Heart className="w-20 h-20 text-rosa-500 mx-auto mb-2 fill-rosa-400" />
                                        <p className="text-rosa-600 font-medium">Foto da Dra. Lalá</p>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Badge */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute -bottom-4 left-1/2 -translate-x-1/2 glass-card-rosa px-6 py-3"
                            >
                                <p className="text-sm font-semibold text-rosa-700 flex items-center gap-2">
                                    <Heart className="w-4 h-4 fill-rosa-500 text-rosa-500" />
                                    Caraguatatuba
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="flex flex-col items-center gap-2 text-rosa-400"
                    >
                        <span className="text-xs font-medium">Role para descobrir mais</span>
                        <ArrowDown className="w-5 h-5" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
