import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function Dashboard() {
    const [type, setType] = useState("LETTER");
    const [input, setInput] = useState({});
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);
    const [remaining, setRemaining] = useState(null);
    const [isPremium, setIsPremium] = useState(false);
    const navigate = useNavigate();

    // Charger statut abonnement / crédits
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

            // Recharge statut
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
            <div className="flex min-h-screen bg-gray-50 mt-16">
                {/* Sidebar */}
                <aside className="w-64 bg-white border-r shadow-sm p-6 hidden md:flex flex-col">
                    {/* Navigation */}
                    <nav className="flex flex-col gap-3">
                        <SidebarButton type="LETTER" current={type} setType={setType} setInput={setInput}>
                            ✍️ Lettres de motivation
                        </SidebarButton>
                        <SidebarButton type="LINKEDIN" current={type} setType={setType} setInput={setInput}>
                            💼 Messages LinkedIn
                        </SidebarButton>
                        <SidebarButton type="CV_ADVICE" current={type} setType={setType} setInput={setInput}>
                            📄 Conseils CV
                        </SidebarButton>
                        <SidebarButton type="JOB_ADVICE" current={type} setType={setType} setInput={setInput}>
                            🚀 Conseils emploi
                        </SidebarButton>
                    </nav>

                    {/* ✅ Avis utilisateurs */}
                    <div className="mt-8">
                        <h3 className="text-sm font-semibold text-gray-700 mb-3">Avis des utilisateurs</h3>
                        <div className="space-y-3 text-sm text-gray-600">
                            <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
                                <p>“CareerLift m’a aidé à décrocher un entretien en 3 jours 🔥”</p>
                                <span className="text-xs font-medium text-gray-500">– Sofia L.</span>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
                                <p>“Les lettres générées sont très pro, j’ai gagné du temps 👌”</p>
                                <span className="text-xs font-medium text-gray-500">– Marc T.</span>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
                                <p>“Super outil pour candidater sans stress 🙌”</p>
                                <span className="text-xs font-medium text-gray-500">– Amira K.</span>
                            </div>
                        </div>
                    </div>


                    {/* Bouton Passer au Premium si non premium */}
                    {!isPremium && (
                        <button
                            onClick={() => navigate("/pricing")}
                            className="w-full mt-6 bg-yellow-400 text-white font-semibold py-2 rounded-lg shadow hover:bg-yellow-500 transition mb-6"
                        >
                            🚀 Passer en Premium
                        </button>
                    )}
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-8">
                    {/* 🔔 Alerte Premium */}
                    {!isPremium && remaining === 0 && (
                        <div className="mb-6 bg-yellow-50 border border-yellow-300 text-yellow-800 px-4 py-3 rounded-lg flex justify-between items-center">
              <span>
                ⚠️ Tu as utilisé ton essai gratuit. Passe en{" "}
                  <span className="font-semibold">Premium</span> pour continuer 🚀
              </span>
                            <button
                                onClick={() => navigate("/pricing")}
                                className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                            >
                                Passer en Premium
                            </button>
                        </div>
                    )}

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
                    </div>

                    {/* Blocs persuasifs en 3 colonnes */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Bloc 1 */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-sm text-center">
                            <h3 className="text-lg font-semibold text-blue-700 mb-2">⏳ Gagne du temps</h3>
                            <p className="text-sm text-gray-700">
                                Génère des lettres et messages en quelques secondes au lieu de passer des heures à rédiger.
                            </p>
                        </div>

                        {/* Bloc 2 */}
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 shadow-sm text-center">
                            <h3 className="text-lg font-semibold text-green-700 mb-2">🎯 Contenu personnalisé</h3>
                            <p className="text-sm text-gray-700">
                                Tes textes sont adaptés à ton profil, ton poste visé et ton secteur d’activité.
                            </p>
                        </div>

                        {/* Bloc 3 */}
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 shadow-sm text-center">
                            <h3 className="text-lg font-semibold text-yellow-700 mb-2">🚀 Boost tes chances</h3>
                            <p className="text-sm text-gray-700">
                                Mets toutes les chances de ton côté pour décrocher un entretien rapidement.
                            </p>
                        </div>
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

/* SidebarButton */
function SidebarButton({ type, current, setType, setInput, children }) {
    return (
        <button
            onClick={() => {
                setType(type);
                setInput({});
            }}
            className={`text-left px-3 py-2 rounded-lg ${
                current === type
                    ? "bg-blue-100 text-blue-700 font-semibold"
                    : "hover:bg-gray-100"
            }`}
        >
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
