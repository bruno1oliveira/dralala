"use client";

import { motion } from "framer-motion";
import { Heart, Scale, Users, GraduationCap, Stethoscope, Home } from "lucide-react";

const pilares = [
    {
        icon: Scale,
        title: "Justiça Social",
        description: "Como advogada, luto pelos direitos de todos os cidadãos, especialmente os mais vulneráveis.",
        color: "from-rosa-500 to-rosa-600",
    },
    {
        icon: Users,
        title: "Mulheres",
        description: "Empoderamento feminino, combate à violência e políticas públicas para as mulheres.",
        color: "from-rosa-400 to-rosa-500",
    },
    {
        icon: Stethoscope,
        title: "Saúde",
        description: "Acesso à saúde de qualidade para toda a população, com dignidade e respeito.",
        color: "from-rosa-600 to-rosa-700",
    },
    {
        icon: GraduationCap,
        title: "Educação",
        description: "Educação transformadora como base para o desenvolvimento da nossa cidade.",
        color: "from-psd-blue to-psd-blue-light",
    },
    {
        icon: Home,
        title: "Moradia",
        description: "O direito de morar com dignidade é fundamental para toda família.",
        color: "from-rosa-500 to-psd-gold",
    },
    {
        icon: Heart,
        title: "Cultura",
        description: "Valorização da cultura local e apoio aos artistas da nossa cidade.",
        color: "from-rosa-400 to-rosa-600",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
    },
};

export default function Pilares() {
    return (
        <section className="py-20 bg-white relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-rosa-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-rosa-200 rounded-full blur-3xl opacity-40 translate-y-1/2 -translate-x-1/2" />

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
                        Pilares do Mandato
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        Nossas <span className="gradient-text-rosa">Bandeiras</span>
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Trabalho focado no que realmente importa para a nossa comunidade,
                        sempre com transparência e compromisso.
                    </p>
                </motion.div>

                {/* Pilares Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {pilares.map((pilar, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="glass-card p-6 group cursor-pointer"
                        >
                            <div
                                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${pilar.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}
                            >
                                <pilar.icon className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-rosa-600 transition-colors">
                                {pilar.title}
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {pilar.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
