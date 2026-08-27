import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

export default function Navbar() {
    const links = ["Home", "Features", "How it works", "Get started"];

    return (
        <nav className="relative z-21 flex items-center justify-between px-6 py-6 md:px-12 ">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
                <img src={logo} alt="Habitus logo" className="h-8 w-8 shrink-0 object-contain brightness-0 invert" />
                <span className="text-xl font-bold text-white tracking-tight">Habitus</span>
            </Link>

            {/*links*/ }
            <ul className="hidden lg:flex items-center gap-8">
                {links.map((link) => (
                    <li key={link}>
                        <a
                            href="#"
                            className="text-[15px] font-medium text-white/90 hover:text-white transition-colors"
                        >
                            {link}
                        </a>
                    </li>
                ))}
            </ul>

            <Link
                to="/login"
                className="rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-orange-600 shadow-sm hover:bg-white/90 transition-colors"
            >
                Log In
            </Link>
        </nav>
    );
}
