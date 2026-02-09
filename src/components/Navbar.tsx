"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Heart, Phone, Instagram, Facebook, Youtube } from "lucide-react";

const navLinks = [
    { href: "/", label: "Início" },
    { href: "/quem-sou", label: "Quem Sou" },
    { href: "/atuacao", label: "Atuação" },
    { href: "/noticias", label: "Notícias" },
    { href: "/contato", label: "Contato" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "navbar-glass shadow-lg" : "bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="relative">
                            <Heart className="w-10 h-10 text-rosa-600 fill-rosa-500 group-hover:scale-110 transition-transform" />
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                <Heart className="w-10 h-10 text-rosa-400 opacity-50" />
                            </motion.div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-rosa-600">Vereadora</span>
                            <span className="text-xl font-bold gradient-text-rosa font-[var(--font-playfair)]">
                                Dra. Lalá
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="nav-link"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="hidden md:flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <a
                                href="https://instagram.com/lalavereadora"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-full hover:bg-rosa-100 transition-colors"
                            >
                                <Instagram className="w-5 h-5 text-rosa-600" />
                            </a>
                            <a
                                href="https://facebook.com/lalavereadora"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-full hover:bg-rosa-100 transition-colors"
                            >
                                <Facebook className="w-5 h-5 text-rosa-600" />
                            </a>
                        </div>
                        <a href="#gabinete-digital" className="btn-primary text-sm">
                            <Phone className="w-4 h-4" />
                            Fale Comigo
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-rosa-100 transition-colors"
                    >
                        {isOpen ? (
                            <X className="w-6 h-6 text-rosa-600" />
                        ) : (
                            <Menu className="w-6 h-6 text-rosa-600" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-t border-rosa-100"
                    >
                        <div className="px-4 py-4 space-y-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="block nav-link"
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="pt-4 border-t border-rosa-100">
                                <a href="#gabinete-digital" className="btn-primary w-full justify-center text-sm">
                                    <Phone className="w-4 h-4" />
                                    Fale Comigo
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
