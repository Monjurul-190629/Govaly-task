'use client';
import { useState, memo } from 'react';
import Link from 'next/link';
import {
    ShoppingCart,
    ClipboardList,
    Menu,
    X,
    Home,
    LogIn,
    UserPlus,
    Users
} from 'lucide-react';

const NavbarLinks = memo(() => (
    <>
        <Link href="/" className="flex items-center gap-1 text-white hover:text-blue-300">
            <Home className="w-5 h-5" />
            <span>Home</span>
        </Link>
        <Link href="/order" className="flex items-center gap-1 hover:text-blue-300">
            <ClipboardList className="w-5 h-5" />
            <span>Orders</span>
        </Link>
        <Link href="/cart" className="flex items-center gap-1 hover:text-blue-300">
            <ShoppingCart className="w-5 h-5" />
            <span>Cart</span>
        </Link>
        <Link href="/users" className="flex items-center gap-1 hover:text-blue-300">
            <Users className="w-5 h-5" />
            <span>Users</span>
        </Link>
        <Link href="/" className="flex items-center gap-1 hover:text-blue-300">
            <LogIn className="w-5 h-5" />
            <span>Login</span>
        </Link>
        <Link href="/" className="flex items-center gap-1 hover:text-blue-300">
            <UserPlus className="w-5 h-5" />
            <span>Register</span>
        </Link>
    </>
));

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(prev => !prev);

    return (
        <nav className="sticky top-0 z-50 bg-pink-700 shadow-md px-4 py-3 text-white">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold text-white italic">
                    Govaly_task
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-6">
                    <NavbarLinks />
                </div>

                {/* Mobile Toggle Button */}
                <button className="md:hidden" onClick={toggleMenu}>
                    {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden mt-2 space-y-4 px-2 pb-4 border-t pt-4">
                    <NavbarLinks />
                </div>
            )}
        </nav>
    );
};

export default Navbar;
