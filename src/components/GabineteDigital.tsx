"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Heart,
    Lightbulb,
    Construction,
    HeartHandshake,
    Stethoscope,
    GraduationCap,
    Bus,
    Home,
    ClipboardList,
    ArrowRight,
    ArrowLeft,
    Send,
    CheckCircle,
    Phone,
    Mail,
    MapPin,
    User,
    Loader2,
} from "lucide-react";
import { createDemanda } from "@/lib/api/demandas";
import type { DemandaTipo } from "@/types/database.types";

const demandTypes = [
    { id: "iluminacao", icon: Lightbulb, label: "Iluminação", emoji: "💡" },
    { id: "buraco", icon: Construction, label: "Buraco/Via", emoji: "🕳️" },
    { id: "assistencia", icon: HeartHandshake, label: "Assistência Social", emoji: "❤️" },
    { id: "saude", icon: Stethoscope, label: "Saúde", emoji: "🏥" },
    { id: "educacao", icon: GraduationCap, label: "Educação", emoji: "📚" },
    { id: "transporte", icon: Bus, label: "Transporte", emoji: "🚌" },
    { id: "moradia", icon: Home, label: "Moradia", emoji: "🏠" },
    { id: "outros", icon: ClipboardList, label: "Outros", emoji: "📋" },
];

const bairros = [
    "Centro",
    "Martim de Sá",
    "Indaiá",
    "Massaguaçu",
    "Tabatinga",
    "Sumaré",
    "Jaraguazinho",
    "Porto Novo",
    "Caputera",
    "Travessão",
    "Outro",
];

export default function GabineteDigital() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        type: "",
        name: "",
        phone: "",
        email: "",
        bairro: "",
        title: "",
        description: "",
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleTypeSelect = (typeId: string) => {
        setFormData({ ...formData, type: typeId });
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);

        try {
            await createDemanda({
                titulo: formData.title,
                descricao: formData.description,
                tipo: formData.type as DemandaTipo,
                cidadao_nome: formData.name,
                cidadao_telefone: formData.phone,
                cidadao_email: formData.email || null,
                bairro: formData.bairro,
            });
            setSubmitted(true);
        } catch (err) {
            console.error("Erro ao enviar demanda:", err);
            setError("Ocorreu um erro ao enviar sua demanda. Por favor, tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    const canProceedStep1 = formData.type !== "";
    const canProceedStep2 = formData.name !== "" && formData.phone !== "" && formData.bairro !== "";
    const canProceedStep3 = formData.title !== "" && formData.description !== "";

    if (submitted) {
        return (
            <section id="gabinete-digital" className="py-20 bg-white">
                <div className="max-w-2xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-card-rosa p-8 text-center"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring" }}
                            className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6"
                        >
                            <CheckCircle className="w-10 h-10 text-green-600" />
                        </motion.div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            Demanda Enviada com Sucesso!
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Obrigada por entrar em contato! Nossa equipe analisará sua solicitação
                            e retornará em até 24 horas.
                        </p>
                        <div className="flex items-center justify-center gap-2 text-rosa-600">
                            <Heart className="w-5 h-5 fill-rosa-500" />
                            <span className="font-medium">Gabinete Vereadora Dra. Lalá</span>
                        </div>
                        <button
                            onClick={() => {
                                setSubmitted(false);
                                setStep(1);
                                setFormData({
                                    type: "",
                                    name: "",
                                    phone: "",
                                    email: "",
                                    bairro: "",
                                    title: "",
                                    description: "",
                                });
                            }}
                            className="btn-secondary mt-6"
                        >
                            Enviar Nova Demanda
                        </button>
                    </motion.div>
                </div>
            </section>
        );
    }

    return (
        <section id="gabinete-digital" className="py-20 bg-white relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-pattern-hearts opacity-30" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <span className="inline-flex items-center gap-2 text-rosa-600 font-medium mb-4">
                        <Heart className="w-5 h-5 fill-rosa-500" />
                        Gabinete Digital
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        Envie sua <span className="gradient-text-rosa">Demanda</span>
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        O Gabinete Digital é o canal direto entre você e a vereadora Dra. Lalá.
                        Aqui você pode registrar suas demandas e acompanhar o andamento.
                    </p>
                </motion.div>

                {/* Progress Steps */}
                <div className="flex items-center justify-center gap-4 mb-12">
                    {[1, 2, 3].map((s) => (
                        <div key={s} className="flex items-center gap-2">
                            <div
                                className={`wizard-step ${step === s ? "active" : step > s ? "completed" : "inactive"
                                    }`}
                            >
                                {step > s ? <CheckCircle className="w-5 h-5" /> : s}
                            </div>
                            {s < 3 && (
                                <div
                                    className={`w-12 sm:w-20 h-1 rounded-full ${step > s ? "bg-psd-gold" : "bg-gray-200"
                                        }`}
                                />
                            )}
                        </div>
                    ))}
                </div>

                {/* Step Labels */}
                <div className="flex justify-between mb-8 px-4">
                    <span className={`text-sm ${step >= 1 ? "text-rosa-600" : "text-gray-400"}`}>
                        Tipo
                    </span>
                    <span className={`text-sm ${step >= 2 ? "text-rosa-600" : "text-gray-400"}`}>
                        Identificação
                    </span>
                    <span className={`text-sm ${step >= 3 ? "text-rosa-600" : "text-gray-400"}`}>
                        Descrição
                    </span>
                </div>

                {/* Form Container */}
                <div className="glass-card-rosa p-6 sm:p-8">
                    <AnimatePresence mode="wait">
                        {/* Step 1: Type Selection */}
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                            >
                                <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
                                    Qual o tipo da sua demanda?
                                </h3>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                    {demandTypes.map((type) => (
                                        <button
                                            key={type.id}
                                            onClick={() => handleTypeSelect(type.id)}
                                            className={`demand-type-card ${formData.type === type.id ? "selected" : ""
                                                }`}
                                        >
                                            <span className="demand-type-icon">{type.emoji}</span>
                                            <span className="text-sm font-medium text-gray-700">
                                                {type.label}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Step 2: Identification */}
                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                            >
                                <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
                                    Seus dados de contato
                                </h3>
                                <div className="space-y-4 max-w-md mx-auto">
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                            <User className="w-4 h-4" />
                                            Nome completo *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder="Seu nome completo"
                                            className="input-rosa"
                                        />
                                    </div>
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                            <Phone className="w-4 h-4" />
                                            Telefone/WhatsApp *
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            placeholder="(12) 99999-9999"
                                            className="input-rosa"
                                        />
                                    </div>
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                            <Mail className="w-4 h-4" />
                                            E-mail (opcional)
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="seu@email.com"
                                            className="input-rosa"
                                        />
                                    </div>
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                            <MapPin className="w-4 h-4" />
                                            Bairro *
                                        </label>
                                        <select
                                            name="bairro"
                                            value={formData.bairro}
                                            onChange={handleInputChange}
                                            className="input-rosa"
                                        >
                                            <option value="">Selecione seu bairro</option>
                                            {bairros.map((bairro) => (
                                                <option key={bairro} value={bairro}>
                                                    {bairro}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 3: Description */}
                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                            >
                                <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
                                    Descreva sua demanda
                                </h3>
                                <div className="space-y-4 max-w-md mx-auto">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                                            Título da demanda *
                                        </label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            placeholder="Resumo curto da sua demanda"
                                            className="input-rosa"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                                            Descrição detalhada *
                                        </label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            placeholder="Descreva sua demanda com o máximo de detalhes possível: localização exata, problema, há quanto tempo ocorre, etc."
                                            rows={5}
                                            className="input-rosa resize-none"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-8">
                        {step > 1 ? (
                            <button
                                onClick={() => setStep(step - 1)}
                                className="btn-secondary"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Voltar
                            </button>
                        ) : (
                            <div />
                        )}

                        {step < 3 ? (
                            <button
                                onClick={() => setStep(step + 1)}
                                disabled={step === 1 ? !canProceedStep1 : !canProceedStep2}
                                className={`btn-primary ${(step === 1 && !canProceedStep1) || (step === 2 && !canProceedStep2)
                                    ? "opacity-50 cursor-not-allowed"
                                    : ""
                                    }`}
                            >
                                Continuar
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                disabled={!canProceedStep3 || loading}
                                className={`btn-primary ${!canProceedStep3 || loading ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Enviando...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4" />
                                        Enviar Demanda
                                    </>
                                )}
                            </button>
                        )}
                    </div>

                    {/* Error Message */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm text-center"
                        >
                            {error}
                        </motion.div>
                    )}
                </div>

                {/* Trust Note */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center text-sm text-gray-500 mt-6 flex items-center justify-center gap-2"
                >
                    <Heart className="w-4 h-4 text-rosa-400 fill-rosa-400" />
                    Suas informações são tratadas com sigilo e respeito
                </motion.p>
            </div>
        </section>
    );
}
