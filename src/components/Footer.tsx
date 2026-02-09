"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
    Heart,
    MapPin,
    Phone,
    Mail,
    Instagram,
    Facebook,
    Youtube,
    ExternalLink,
} from "lucide-react";

const footerLinks = {
    institucional: [
        { href: "/quem-sou", label: "Quem Sou" },
        { href: "/atuacao", label: "Atuação" },
        { href: "/noticias", label: "Notícias" },
        { href: "/contato", label: "Contato" },
    ],
    servicos: [
        { href: "#gabinete-digital", label: "Gabinete Digital" },
        { href: "/transparencia", label: "Transparência" },
        { href: "/agenda", label: "Agenda" },
        { href: "/projetos", label: "Projetos de Lei" },
    ],
};

const socialLinks = [
    { href: "https://instagram.com/lalavereadora", icon: Instagram, label: "Instagram" },
    { href: "https://facebook.com/lalavereadora", icon: Facebook, label: "Facebook" },
    { href: "https://youtube.com/@lalavereadora", icon: Youtube, label: "YouTube" },
];

export default function Footer() {
    return (
        <footer className="footer-gradient text-white">
            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {/* Brand Column */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="sm:col-span-2 lg:col-span-1"
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <Heart className="w-8 h-8 fill-white" />
                            <div>
                                <span className="text-sm opacity-80">Vereadora</span>
                                <h3 className="text-xl font-bold font-[var(--font-playfair)]">
                                    Dra. Lalá
                                </h3>
                            </div>
                        </div>
                        <p className="text-rosa-100 text-sm mb-6 leading-relaxed">
                            Advogada e Vereadora pelo PSD, comprometida com a justiça social,
                            os direitos das mulheres e o desenvolvimento da nossa cidade.
                        </p>
                        <div className="flex items-center gap-2">
                            <span className="badge-psd text-xs">
                                <Heart className="w-3 h-3" />
                                PSD
                            </span>
                        </div>
                    </motion.div>

                    {/* Institucional Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <h4 className="font-bold mb-4 flex items-center gap-2">
                            <Heart className="w-4 h-4 fill-white opacity-60" />
                            Institucional
                        </h4>
                        <ul className="space-y-2">
                            {footerLinks.institucional.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-rosa-100 hover:text-white transition-colors text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Serviços Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <h4 className="font-bold mb-4 flex items-center gap-2">
                            <Heart className="w-4 h-4 fill-white opacity-60" />
                            Serviços
                        </h4>
                        <ul className="space-y-2">
                            {footerLinks.servicos.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-rosa-100 hover:text-white transition-colors text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <h4 className="font-bold mb-4 flex items-center gap-2">
                            <Heart className="w-4 h-4 fill-white opacity-60" />
                            Contato
                        </h4>
                        <ul className="space-y-3">
                            <li>
                                <a
                                    href="tel:+551239999999"
                                    className="flex items-center gap-2 text-rosa-100 hover:text-white transition-colors text-sm"
                                >
                                    <Phone className="w-4 h-4" />
                                    (12) 3999-9999
                                </a>
                            </li>
                            <li>
                                <a
                                    href="mailto:gabinete@dralala.com.br"
                                    className="flex items-center gap-2 text-rosa-100 hover:text-white transition-colors text-sm"
                                >
                                    <Mail className="w-4 h-4" />
                                    gabinete@dralala.com.br
                                </a>
                            </li>
                            <li className="flex items-start gap-2 text-rosa-100 text-sm">
                                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                <span>
                                    Câmara Municipal de Caraguatatuba
                                    <br />
                                    Rua Example, 123 - Centro
                                </span>
                            </li>
                        </ul>

                        {/* Social Links */}
                        <div className="flex items-center gap-3 mt-6">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-rosa-100 text-sm text-center sm:text-left">
                            © {new Date().getFullYear()} Gabinete Vereadora Dra. Lalá. Todos os direitos reservados.
                        </p>
                        <div className="flex items-center gap-4 text-sm">
                            <Link
                                href="/privacidade"
                                className="text-rosa-100 hover:text-white transition-colors"
                            >
                                Política de Privacidade
                            </Link>
                            <span className="text-rosa-300">•</span>
                            <a
                                href="https://www.camaradecaraguatatuba.sp.gov.br"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-rosa-100 hover:text-white transition-colors flex items-center gap-1"
                            >
                                Câmara Municipal
                                <ExternalLink className="w-3 h-3" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
