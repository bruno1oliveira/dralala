"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Users, FileText, MapPin, Heart } from "lucide-react";

const stats = [
    {
        icon: Users,
        value: 500,
        suffix: "+",
        label: "Famílias Atendidas",
        description: "Pessoas que receberam apoio do gabinete",
    },
    {
        icon: FileText,
        value: 47,
        suffix: "",
        label: "Projetos de Lei",
        description: "Propostas apresentadas na Câmara",
    },
    {
        icon: MapPin,
        value: 15,
        suffix: "",
        label: "Bairros Visitados",
        description: "Presença constante na comunidade",
    },
    {
        icon: Heart,
        value: 100,
        suffix: "%",
        label: "Compromisso",
        description: "Dedicação ao mandato popular",
    },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            const duration = 2000;
            const steps = 60;
            const increment = value / steps;
            let current = 0;
            const timer = setInterval(() => {
                current += increment;
                if (current >= value) {
                    setCount(value);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(current));
                }
            }, duration / steps);
            return () => clearInterval(timer);
        }
    }, [isInView, value]);

    return (
        <span ref={ref} className="stat-number">
            {count}{suffix}
        </span>
    );
}

export default function Stats() {
    return (
        <section className="py-20 bg-gradient-rosa relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-10 left-10 w-20 h-20 border-4 border-rosa-200 rounded-full opacity-30" />
            <div className="absolute bottom-10 right-10 w-32 h-32 border-4 border-rosa-300 rounded-full opacity-20" />
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 right-20 text-rosa-200 opacity-20"
            >
                <Heart className="w-40 h-40 fill-current" />
            </motion.div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="inline-flex items-center gap-2 text-rosa-600 font-medium mb-4">
                        <Heart className="w-5 h-5 fill-rosa-500" />
                        Impacto do Mandato
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        Números que <span className="gradient-text-rosa">Transformam</span>
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Cada número representa uma história de mudança, uma família atendida,
                        um projeto em defesa da nossa comunidade.
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="stat-card"
                        >
                            <div className="w-12 h-12 rounded-full bg-rosa-100 flex items-center justify-center mx-auto mb-4">
                                <stat.icon className="w-6 h-6 text-rosa-600" />
                            </div>
                            <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                            <h3 className="text-lg font-semibold text-gray-900 mt-2">
                                {stat.label}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                                {stat.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
