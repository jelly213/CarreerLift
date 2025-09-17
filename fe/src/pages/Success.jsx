// Success.jsx
import Navbar from "../components/Navbar";

export default function Success() {
    return (
        <>
            <Navbar />
            <div className="flex items-center justify-center min-h-screen bg-green-50">
                <div className="bg-white p-8 rounded-xl shadow text-center">
                    <h1 className="text-2xl font-bold text-green-600 mb-4">✅ Paiement réussi !</h1>
                    <p className="text-gray-700">Ton compte est maintenant Premium 🚀</p>
                </div>
            </div>
        </>
    );
}
