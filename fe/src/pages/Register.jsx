import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import { Eye, EyeOff, CheckCircle, XCircle } from "lucide-react";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("❌ Les mots de passe ne correspondent pas.");
            return;
        }

        setLoading(true);
        try {
            await api.post("/auth/register", { email, password });
            alert("✅ Compte créé avec succès !");
            navigate("/login");
        } catch (err) {
            setError(
                err?.response?.data?.error ||
                err?.response?.data?.message ||
                "❌ Une erreur est survenue."
            );
        } finally {
            setLoading(false);
        }
    };

    // Vérification dynamique du mot de passe
    const passwordChecks = [
        { label: "8 caractères minimum", valid: password.length >= 8 },
        { label: "1 majuscule", valid: /[A-Z]/.test(password) },
        { label: "1 minuscule", valid: /[a-z]/.test(password) },
        { label: "1 chiffre", valid: /\d/.test(password) },
        { label: "1 caractère spécial (@$!%*?&)", valid: /[@$!%*?&]/.test(password) },
    ];

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
                    {/* Header */}
                    <h2 className="text-3xl font-extrabold text-gray-900 text-center">
                        Créer un compte
                    </h2>
                    <p className="text-gray-600 text-center mt-2">
                        Rejoins <span className="text-blue-600 font-semibold">CareerLift</span>
                    </p>

                    {/* Form */}
                    <form onSubmit={handleRegister} className="mt-8 space-y-5">
                        {error && (
                            <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-2 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="votre@email.com"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        {/* Champ mot de passe avec icône 👁️ */}
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Mot de passe
                            </label>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="********"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        {/* ✅ Checklist dynamique */}
                        <ul className="text-sm space-y-1 mt-2">
                            {passwordChecks.map((check, i) => (
                                <li key={i} className="flex items-center gap-2">
                                    {check.valid ? (
                                        <CheckCircle className="text-green-500" size={16} />
                                    ) : (
                                        <XCircle className="text-gray-400" size={16} />
                                    )}
                                    <span
                                        className={
                                            check.valid ? "text-green-600" : "text-gray-600"
                                        }
                                    >
                                        {check.label}
                                    </span>
                                </li>
                            ))}
                        </ul>

                        {/* Confirmation mot de passe */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Confirmer le mot de passe
                            </label>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="********"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                        >
                            {loading ? "Création..." : "Créer mon compte"}
                        </button>
                    </form>

                    {/* Footer */}
                    <p className="text-center text-sm text-gray-600 mt-6">
                        Déjà un compte ?{" "}
                        <Link to="/login" className="text-blue-600 font-medium hover:underline">
                            Se connecter
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}
