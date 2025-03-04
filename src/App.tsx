import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Page from "./app/dashboard/page";
import Home from "./pages/Home";
import Todo from "./pages/Todo";
import Excel from "./pages/Excel";
import Tools from "./pages/Tools";
import { ThemeProvider } from "@/components/theme-provider";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path="/" element={<Page />}>
            <Route index element={<Home />} />
            <Route path="tools" element={<Tools />} />
            <Route path="todo" element={<Todo />} />
            <Route path="excel" element={<Excel />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
