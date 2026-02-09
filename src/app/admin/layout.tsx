"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    Heart,
    LayoutDashboard,
    ClipboardList,
    Users,
    Newspaper,
    Settings,
    LogOut,
    Menu,
    X,
    Bell,
    ChevronDown,
    FileCheck,
    BarChart3,
} from "lucide-react";

const menuItems = [
    { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/admin/demandas", icon: ClipboardList, label: "Demandas" },
    { href: "/admin/contatos", icon: Users, label: "Contatos" },
    { href: "/admin/noticias", icon: Newspaper, label: "Notícias" },
    { href: "/admin/aprovacoes", icon: FileCheck, label: "Aprovações" },
    { href: "/admin/relatorios", icon: BarChart3, label: "Relatórios" },
    { href: "/admin/configuracoes", icon: Settings, label: "Configurações" },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const pathname = usePathname();

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {sidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                {/* Logo */}
                <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100">
                    <Link href="/admin" className="flex items-center gap-2">
                        <Heart className="w-8 h-8 text-rosa-600 fill-rosa-500" />
                        <div>
                            <span className="text-xs text-rosa-600">Gabinete</span>
                            <h1 className="text-lg font-bold text-gray-900 -mt-1">Dra. Lalá</h1>
                        </div>
                    </Link>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-1">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                        ? "bg-rosa-50 text-rosa-600 font-medium"
                                        : "text-gray-600 hover:bg-gray-50"
                                    }`}
                            >
                                <item.icon className={`w-5 h-5 ${isActive ? "text-rosa-600" : "text-gray-400"}`} />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom Section */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
                    <Link
                        href="/"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                        <LogOut className="w-5 h-5 text-gray-400" />
                        Ver Site
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <div className="lg:ml-64">
                {/* Top Bar */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
                    >
                        <Menu className="w-5 h-5 text-gray-600" />
                    </button>

                    <div className="lg:flex-1" />

                    <div className="flex items-center gap-4">
                        {/* Notifications */}
                        <button className="relative p-2 rounded-lg hover:bg-gray-100">
                            <Bell className="w-5 h-5 text-gray-600" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rosa-500 rounded-full" />
                        </button>

                        {/* User Menu */}
                        <div className="relative">
                            <button
                                onClick={() => setUserMenuOpen(!userMenuOpen)}
                                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100"
                            >
                                <div className="w-8 h-8 rounded-full bg-rosa-100 flex items-center justify-center">
                                    <Heart className="w-4 h-4 text-rosa-600 fill-rosa-500" />
                                </div>
                                <span className="hidden sm:block text-sm font-medium text-gray-700">
                                    Dra. Lalá
                                </span>
                                <ChevronDown className="w-4 h-4 text-gray-400" />
                            </button>

                            <AnimatePresence>
                                {userMenuOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50"
                                    >
                                        <Link
                                            href="/admin/perfil"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                        >
                                            Meu Perfil
                                        </Link>
                                        <Link
                                            href="/admin/configuracoes"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                        >
                                            Configurações
                                        </Link>
                                        <hr className="my-2 border-gray-100" />
                                        <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                                            Sair
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-4 lg:p-6">{children}</main>
            </div>
        </div>
    );
}
