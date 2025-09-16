import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function Pricing() {
    const [status, setStatus] = useState({ premium: false, email: "" });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const res = await api.get("/subscription/status");
                setStatus(res.data);
            } catch {
                // ignore
            } finally {
                setLoading(false);
            }
        };
        fetchStatus();
    }, []);

    return (
        <>
            <Navbar />
            <div className="bg-gray-50 min-h-screen py-16 px-6 mt-16">
                <div className="max-w-5xl mx-auto text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900">Nos offres</h1>
                    <p className="text-gray-600 mt-3">
                        Choisissez le plan qui correspond à vos besoins et boostez votre carrière 🚀
                    </p>
                </div>

                {loading ? (
                    <div className="text-center text-gray-500">Chargement...</div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {/* Plan Gratuit */}
                        <div className="bg-white border rounded-2xl shadow hover:shadow-lg transition p-8 flex flex-col">
                            <h2 className="text-2xl font-bold text-gray-900">Gratuit</h2>
                            <p className="mt-2 text-gray-600">Idéal pour démarrer</p>
                            <p className="text-4xl font-extrabold mt-6">0$</p>
                            <ul className="mt-6 space-y-3 text-gray-700 text-left">
                                <li>✅ 3 générations incluses</li>
                                <li>✅ Lettres de motivation</li>
                                <li>✅ Messages LinkedIn</li>
                                <li>❌ Conseils CV illimités</li>
                                <li>❌ Support prioritaire</li>
                            </ul>
                            <button className="mt-8 w-full border border-gray-300 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition">
                                Plan actuel
                            </button>
                        </div>

                        {/* Plan Premium */}
                        <div className="bg-blue-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition p-8 flex flex-col relative">
                            <div className="absolute -top-3 right-4 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full shadow">
                                RECOMMANDÉ
                            </div>
                            <h2 className="text-2xl font-bold">Premium</h2>
                            <p className="mt-2 opacity-90">Pour les utilisateurs ambitieux</p>
                            <p className="text-4xl font-extrabold mt-6">$9.99 <span className="text-base font-medium">/mois</span></p>
                            <ul className="mt-6 space-y-3 text-left">
                                <li>✅ Générations illimitées</li>
                                <li>✅ Lettres & LinkedIn sans limites</li>
                                <li>✅ Conseils CV & emploi avancés</li>
                                <li>✅ Support prioritaire</li>
                                <li>✅ Historique complet</li>
                            </ul>
                            {status.premium ? (
                                <button className="mt-8 w-full bg-green-500 py-3 rounded-lg font-semibold hover:bg-green-600 transition">
                                    ✅ Actif
                                </button>
                            ) : (
                                <button
                                    className="mt-8 w-full bg-white text-blue-600 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
                                    onClick={() => alert("Intégrer Stripe Checkout ici 🚀")}
                                >
                                    Passer en Premium
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
