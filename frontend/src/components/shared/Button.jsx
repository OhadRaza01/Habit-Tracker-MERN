import { Link } from "react-router-dom";

const variants = {
    solid: "bg-white text-[#1a1a1a] hover:bg-white/90 shadow-md",
    outline: "border border-white/60 text-white hover:bg-white/10",
};

export default function Button({ to, variant = "solid", icon, children, className = "" }) {
    const classes = `inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[15px] font-semibold transition-colors ${variants[variant]} ${className}`;

    return (
        <Link to={to} className={classes}>
            {children}
        </Link>
    );
}
