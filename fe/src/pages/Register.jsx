import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post("/auth/register", { email, password });
            alert("✅ Compte créé avec succès ! Connecte-toi maintenant.");
            navigate("/login");
        } catch (err) {
            alert(err?.response?.data?.error || "❌ Erreur lors de l'inscription.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
                    {/* Header */}
                    <h2 className="text-3xl font-extrabold text-gray-900 text-center">
                        Créez votre compte
                    </h2>
                    <p className="text-gray-600 text-center mt-2">
                        Rejoignez <span className="text-blue-600 font-semibold">CareerLift</span> gratuitement
                    </p>

                    {/* Form */}
                    <form onSubmit={handleRegister} className="mt-8 space-y-5">
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

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Mot de passe
                            </label>
                            <input
                                type="password"
                                placeholder="********"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                        >
                            {loading ? "Création en cours..." : "Créer un compte"}
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
