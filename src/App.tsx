import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ChangeManagement from "./pages/ChangeManagement";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/contexts/theme-context";
import { AuthProvider } from "@/contexts/auth-context";
import { Layout } from "@/components/Layout";

function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <Router>
                    <Routes>
                        <Route element={<Layout />}>
                            <Route path="/" element={<Home />} />
                            <Route path="/changes" element={<ChangeManagement />} />
                        </Route>
                    </Routes>
                    <Toaster />
                </Router>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
