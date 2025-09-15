import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Home() {
    return (
        <>
            <Navbar />
            <div className="bg-gray-50 min-h-screen flex flex-col justify-center">
                {/* Hero Section */}
                <div className="max-w-5xl mx-auto px-6 text-center py-20">
                    <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
                        🚀 Boostez votre carrière avec <span className="text-blue-600">CareerLift</span>
                    </h1>
                    <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
                        Générez des lettres de motivation professionnelles, des messages LinkedIn impactants,
                        et recevez des conseils personnalisés pour vos CV et recherches d’emploi.
                    </p>

                    <div className="mt-8 flex justify-center gap-4">
                        <Link
                            to="/register"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition"
                        >
                            Commencer gratuitement
                        </Link>
                        <Link
                            to="/pricing"
                            className="border border-blue-600 text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition"
                        >
                            Voir les plans
                        </Link>
                    </div>
                </div>

                {/* Features */}
                <div className="bg-white py-16">
                    <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center">
                        <div className="p-6 border rounded-xl shadow-sm hover:shadow-md transition">
                            <h3 className="text-xl font-bold text-gray-900">✍️ Lettres de motivation</h3>
                            <p className="text-gray-600 mt-3">Obtenez des lettres adaptées à chaque poste en quelques secondes.</p>
                        </div>
                        <div className="p-6 border rounded-xl shadow-sm hover:shadow-md transition">
                            <h3 className="text-xl font-bold text-gray-900">💼 Messages LinkedIn</h3>
                            <p className="text-gray-600 mt-3">Contactez les recruteurs avec des messages clairs et convaincants.</p>
                        </div>
                        <div className="p-6 border rounded-xl shadow-sm hover:shadow-md transition">
                            <h3 className="text-xl font-bold text-gray-900">📄 Conseils CV</h3>
                            <p className="text-gray-600 mt-3">Améliorez votre CV grâce à des recommandations personnalisées.</p>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="bg-blue-600 text-white py-16">
                    <div className="max-w-4xl mx-auto text-center px-6">
                        <h2 className="text-3xl font-bold">Prêt à décrocher votre prochain job ?</h2>
                        <p className="mt-4 text-lg">
                            Rejoignez CareerLift aujourd’hui et accélérez vos candidatures.
                        </p>
                        <Link
                            to="/register"
                            className="mt-6 inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition"
                        >
                            Je m’inscris maintenant
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

