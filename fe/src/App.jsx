import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Pricing from "./pages/Pricing";
import ProtectedRoute from "./components/ProtectedRoute";
import Cancel from "./pages/Cancel.jsx";
import Success from "./pages/Success.jsx";

export default function App() {
    return (
        <Router>
            <Routes>
                {/* Public */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protégé */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/pricing"
                    element={
                        <ProtectedRoute>
                            <Pricing />
                        </ProtectedRoute>
                    }
                />
                <Route path="/success" element={<Success />} />
                <Route path="/cancel" element={<Cancel />} />


                {/* Fallback */}
                <Route path="*" element={<Home />} />
            </Routes>
        </Router>
    );
}
