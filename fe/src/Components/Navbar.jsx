import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();
    const isAuth = !!localStorage.getItem("token");

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="w-full fixed top-0 left-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

                {/* Logo */}
                <Link to="/" className="font-extrabold text-2xl text-blue-600 tracking-tight">
                    CareerLift
                </Link>

                {/* Navigation Links */}
                <div className="hidden md:flex items-center gap-6">
                    <NavLink to="/">Accueil</NavLink>
                    {isAuth && <NavLink to="/dashboard">Dashboard</NavLink>}
                    <NavLink to="/pricing">Pricing</NavLink>
                </div>

                {/* Auth Buttons */}
                <div className="flex items-center gap-3">
                    {isAuth ? (
                        <button
                            onClick={logout}
                            className="px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition"
                        >
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-blue-600 transition"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 shadow transition"
                            >
                                Sign up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

/* Petit composant interne pour liens avec underline animé */
function NavLink({ to, children }) {
    return (
        <Link
            to={to}
            className="relative text-lg px-2 font-semibold text-gray-700 hover:text-blue-600 transition"
        >
            {children}
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
        </Link>
    );
}
