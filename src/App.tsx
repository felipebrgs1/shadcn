import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Page from "./app/dashboard/page";
import Home from "./pages/Home";
import About from "./pages/About";
import { ThemeProvider } from "@/components/theme-provider";

export default function App() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Router>
                <Routes>
                    <Route path="/" element={<Page />}>
                        <Route index element={<Home />} />
                        <Route path="about" element={<About />} />
                    </Route>
                </Routes>
            </Router>
        </ThemeProvider>
    );
}