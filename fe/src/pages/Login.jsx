import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.post("/auth/login", { email, password });
            localStorage.setItem("token", res.data.token);
            navigate("/dashboard");
        } catch (err) {
            alert(err?.response?.data?.error || "❌ Identifiants invalides.");
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
                        Connexion
                    </h2>
                    <p className="text-gray-600 text-center mt-2">
                        Accédez à votre compte <span className="text-blue-600 font-semibold">CareerLift</span>
                    </p>

                    {/* Form */}
                    <form onSubmit={handleLogin} className="mt-8 space-y-5">
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
                            {loading ? "Connexion..." : "Se connecter"}
                        </button>
                    </form>

                    {/* Footer */}
                    <p className="text-center text-sm text-gray-600 mt-6">
                        Pas encore de compte ?{" "}
                        <Link to="/register" className="text-blue-600 font-medium hover:underline">
                            Créer un compte
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}
