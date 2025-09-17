// Cancel.jsx
import Navbar from "../components/Navbar";

export default function Cancel() {
    return (
        <>
            <Navbar />
            <div className="flex items-center justify-center min-h-screen bg-red-50">
                <div className="bg-white p-8 rounded-xl shadow text-center">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">❌ Paiement annulé</h1>
                    <p className="text-gray-700">Pas de souci, tu peux réessayer plus tard.</p>
                </div>
            </div>
        </>
    );
}
