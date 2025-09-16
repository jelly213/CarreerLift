import { FaStar, FaQuestionCircle, FaLifeRing } from "react-icons/fa";

export default function Sidebar() {
    const reviews = [
        {
            name: "Sofia L.",
            text: "CareerLift m'a permis de décrocher un entretien en 3 jours seulement 🔥",
            rating: 5,
        },
        {
            name: "Marc T.",
            text: "Les lettres générées sont claires et professionnelles. Super utile 👌",
            rating: 4,
        },
        {
            name: "Amira K.",
            text: "Enfin une solution simple pour mes candidatures !",
            rating: 5,
        },
    ];

    return (
        <aside className="w-72 bg-white shadow-lg border-r border-gray-200 h-screen flex flex-col justify-between">
            {/* --- Header Sidebar --- */}
            <div>
                <h2 className="text-xl font-bold px-6 py-4 border-b">CareerLift</h2>

                {/* --- Avis Clients --- */}
                <div className="px-6 py-4">
                    <h3 className="text-lg font-semibold mb-3">Avis des utilisateurs ⭐</h3>
                    <div className="space-y-4">
                        {reviews.map((review, index) => (
                            <div key={index} className="bg-gray-50 p-3 rounded-lg shadow-sm">
                                <p className="text-sm italic">“{review.text}”</p>
                                <div className="flex items-center justify-between mt-2">
                                    <span className="text-xs font-medium">{review.name}</span>
                                    <div className="flex text-yellow-400">
                                        {Array.from({ length: review.rating }).map((_, i) => (
                                            <FaStar key={i} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- Liens rapides --- */}
                <div className="px-6 py-4 border-t">
                    <h3 className="text-lg font-semibold mb-3">Liens rapides</h3>
                    <ul className="space-y-3 text-gray-700">
                        <li className="flex items-center gap-2 hover:text-blue-600 cursor-pointer">
                            <FaQuestionCircle /> FAQ
                        </li>
                        <li className="flex items-center gap-2 hover:text-blue-600 cursor-pointer">
                            <FaLifeRing /> Support
                        </li>
                    </ul>
                </div>
            </div>

            {/* --- Footer Sidebar --- */}
            <div className="px-6 py-4 border-t text-center text-sm text-gray-500">
                © 2025 CareerLift
            </div>
        </aside>
    );
}
