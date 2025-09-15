import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import {
    PencilSquareIcon,
    BriefcaseIcon,
    DocumentTextIcon,
    RocketLaunchIcon,
} from "@heroicons/react/24/outline";

export default function Dashboard() {
    const [type, setType] = useState("LETTER");
    const [input, setInput] = useState({});
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);
    const [remaining, setRemaining] = useState(null);
    const [isPremium, setIsPremium] = useState(false);
    const navigate = useNavigate();

    // Charger statut abonnement / crédits depuis le backend
    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const res = await api.get("/subscription/status");
                setIsPremium(res.data.premium);
                setRemaining(res.data.remaining);
            } catch (err) {
                console.error("Erreur récupération statut:", err);
            }
        };
        fetchStatus();
    }, []);

    const handleGenerate = async () => {
        if (!Object.values(input).some((val) => val && val.trim() !== "")) {
            alert("Merci de remplir le formulaire avant de générer.");
            return;
        }

        setLoading(true);
        try {
            const res = await api.post(`/generate/${type}`, input);
            setResult(res.data.output);

            // Recharge statut après chaque génération
            const statusRes = await api.get("/subscription/status");
            setIsPremium(statusRes.data.premium);
            setRemaining(statusRes.data.remaining);
        } catch (err) {
            alert(err?.response?.data?.message || "❌ Limite atteinte ou erreur API.");
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(result);
        alert("Texte copié !");
    };

    return (
        <>
            <Navbar />
            <div className="flex min-h-screen bg-gray-50">
                {/* Sidebar améliorée */}
                <aside className="w-64 bg-white border-r shadow-md p-6 hidden md:flex flex-col">
                    {/* Logo */}
                    <h2 className="text-2xl font-extrabold text-blue-600 mb-8">
                        CareerLift
                    </h2>

                    {/* Navigation */}
                    <nav className="flex flex-col gap-2 flex-1">
                        <SidebarButton
                            type="LETTER"
                            current={type}
                            setType={setType}
                            icon={<PencilSquareIcon className="w-5 h-5 mr-2" />}
                        >
                            Lettres de motivation
                        </SidebarButton>
                        <SidebarButton
                            type="LINKEDIN"
                            current={type}
                            setType={setType}
                            icon={<BriefcaseIcon className="w-5 h-5 mr-2" />}
                        >
                            Messages LinkedIn
                        </SidebarButton>
                        <SidebarButton
                            type="CV_ADVICE"
                            current={type}
                            setType={setType}
                            icon={<DocumentTextIcon className="w-5 h-5 mr-2" />}
                        >
                            Conseils CV
                        </SidebarButton>
                        <SidebarButton
                            type="JOB_ADVICE"
                            current={type}
                            setType={setType}
                            icon={<RocketLaunchIcon className="w-5 h-5 mr-2" />}
                        >
                            Conseils emploi
                        </SidebarButton>
                    </nav>

                    {/* Etat premium / crédits */}
                    <div className="pt-6 border-t">
                        {isPremium ? (
                            <p className="text-green-600 font-semibold">🌟 Premium actif</p>
                        ) : (
                            <p className="text-sm text-gray-600">
                                Essais restants :{" "}
                                <span className="font-bold text-gray-900">{remaining}</span>/1
                            </p>
                        )}
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-6">
                        {type === "LETTER" && "✍️ Générateur de lettres de motivation"}
                        {type === "LINKEDIN" && "💼 Générateur de messages LinkedIn"}
                        {type === "CV_ADVICE" && "📄 Conseils pour ton CV"}
                        {type === "JOB_ADVICE" && "🚀 Conseils pour trouver un emploi"}
                    </h1>

                    {/* Formulaire adapté */}
                    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                        <FormInputs type={type} input={input} setInput={setInput} />

                        <button
                            onClick={handleGenerate}
                            disabled={loading || (!isPremium && remaining === 0)}
                            className="mt-4 w-full bg-blue-600 text-white font-semibold py-2 rounded-lg shadow hover:bg-blue-700 transition disabled:opacity-50"
                        >
                            {loading
                                ? "Génération en cours..."
                                : !isPremium && remaining === 0
                                    ? "Limite atteinte"
                                    : "Générer"}
                        </button>

                        {/* 🔔 Alerte essai juste sous le bouton */}
                        {!isPremium && remaining === 0 && (
                            <div className="mt-4 bg-yellow-50 border border-yellow-300 text-yellow-800 px-4 py-3 rounded-lg">
                                ⚠️ Tu as utilisé ton essai gratuit. Passe en{" "}
                                <span className="font-semibold">Premium</span> pour continuer 🚀
                                <button
                                    onClick={() => navigate("/pricing")}
                                    className="ml-3 inline-block bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-blue-700 transition"
                                >
                                    Passer en Premium
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Résultat */}
                    {result && (
                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-inner">
                            <div className="flex justify-between items-center mb-3">
                                <h2 className="text-lg font-bold text-gray-800">Résultat</h2>
                                <button
                                    onClick={copyToClipboard}
                                    className="text-sm text-blue-600 hover:underline"
                                >
                                    Copier
                                </button>
                            </div>
                            <p className="whitespace-pre-line text-gray-700 leading-relaxed">
                                {result}
                            </p>
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}

/* SidebarButton amélioré */
function SidebarButton({ type, current, setType, children, icon }) {
    return (
        <button
            onClick={() => {
                setType(type);
            }}
            className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition ${
                current === type
                    ? "bg-blue-100 text-blue-700 font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
            }`}
        >
            {icon}
            {children}
        </button>
    );
}

/* FormInputs dynamiques */
function FormInputs({ type, input, setInput }) {
    if (type === "LETTER") {
        return (
            <div className="space-y-4">
                <input
                    type="text"
                    placeholder="Entreprise"
                    className="w-full border rounded-lg px-3 py-2"
                    onChange={(e) => setInput({ ...input, company: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Poste visé"
                    className="w-full border rounded-lg px-3 py-2"
                    onChange={(e) => setInput({ ...input, jobTitle: e.target.value })}
                />
                <textarea
                    placeholder="Tes points forts..."
                    className="w-full border rounded-lg px-3 py-2 h-24"
                    onChange={(e) => setInput({ ...input, strengths: e.target.value })}
                />
            </div>
        );
    }

    if (type === "LINKEDIN") {
        return (
            <div className="space-y-4">
                <input
                    type="text"
                    placeholder="Nom du recruteur"
                    className="w-full border rounded-lg px-3 py-2"
                    onChange={(e) => setInput({ ...input, recruiter: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Poste ou sujet"
                    className="w-full border rounded-lg px-3 py-2"
                    onChange={(e) => setInput({ ...input, subject: e.target.value })}
                />
                <textarea
                    placeholder="Message complémentaire"
                    className="w-full border rounded-lg px-3 py-2 h-24"
                    onChange={(e) => setInput({ ...input, extra: e.target.value })}
                />
            </div>
        );
    }

    if (type === "CV_ADVICE") {
        return (
            <textarea
                placeholder="Colle ici ton CV"
                className="w-full border rounded-lg px-3 py-2 h-32"
                onChange={(e) => setInput({ content: e.target.value })}
            />
        );
    }

    if (type === "JOB_ADVICE") {
        return (
            <div className="space-y-4">
        <textarea
            placeholder="Ton profil (études, compétences...)"
            className="w-full border rounded-lg px-3 py-2 h-20"
            onChange={(e) => setInput({ ...input, profile: e.target.value })}
        />
                <input
                    type="text"
                    placeholder="Type d'emploi/stage recherché"
                    className="w-full border rounded-lg px-3 py-2"
                    onChange={(e) => setInput({ ...input, targetJob: e.target.value })}
                />
                <textarea
                    placeholder="Difficultés rencontrées"
                    className="w-full border rounded-lg px-3 py-2 h-20"
                    onChange={(e) => setInput({ ...input, difficulties: e.target.value })}
                />
            </div>
        );
    }

    return null;
}
