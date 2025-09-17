import { useState } from "react";
import api from "../api/axios";

export default function Pricing() {
    const [loading, setLoading] = useState(false);

    const handleCheckout = async () => {
        setLoading(true);
        try {
            const { data } = await api.post("/payment/checkout", { priceId: "price_XXXX_PREMIUM" });
            window.location.href = data.url; // Redirection Stripe
        } catch (error) {
            console.error("Erreur Stripe:", error);
            alert("Une erreur est survenue. Réessaie plus tard.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-16 px-6">
            {/* Titre */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-gray-900">
                    Passe au <span className="text-yellow-500">Premium</span> 🚀
                </h1>
                <p className="mt-3 text-gray-600 text-lg">
                    Débloque tout le potentiel de <span className="font-semibold text-blue-600">CareerLift</span>.
                </p>
            </div>

            {/* Carte Premium */}
            <div className="bg-white border-2 border-yellow-500 rounded-2xl shadow-lg p-10 flex flex-col w-full max-w-md text-center">
                <span className="absolute top-0 right-0 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-2xl">
                    Recommandé
                </span>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Premium</h3>
                <p className="text-gray-500 mb-6">Maximise tes chances de décrocher un emploi.</p>
                <p className="text-5xl font-extrabold text-gray-900">9,99€</p>
                <p className="text-sm text-gray-500 mb-6">/ mois</p>
                <ul className="mt-6 space-y-3 text-gray-700 text-left">
                    <li>✔ Générations illimitées (lettres, LinkedIn, CV)</li>
                    <li>✔ Conseils emploi personnalisés</li>
                    <li>✔ Support prioritaire</li>
                    <li>✔ Accès anticipé aux nouvelles fonctionnalités</li>
                </ul>
                <button
                    onClick={handleCheckout}
                    disabled={loading}
                    className="mt-8 w-full bg-yellow-500 text-white py-3 rounded-lg font-semibold hover:bg-yellow-600 transition disabled:opacity-50"
                >
                    {loading ? "Redirection..." : "Passer en Premium"}
                </button>
            </div>
        </div>
    );
}
