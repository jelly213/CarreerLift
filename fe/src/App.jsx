import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Pricing from "./pages/Pricing";
import ProtectedRoute from "./components/ProtectedRoute";

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

                {/* Fallback */}
                <Route path="*" element={<Home />} />
            </Routes>
        </Router>
    );
}
