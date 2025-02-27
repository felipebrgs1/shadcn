import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Page from "./app/dashboard/page";
import Home from "./pages/Home";
import About from "./pages/About";
import LoginPage from "./app/login/page";
import { ThemeProvider } from "@/components/theme-provider";
import { LightThemeWrapper } from "@/components/LightThemeWrapper";

export default function App() {
	return (
		<ThemeProvider
			defaultTheme="dark"
			storageKey="vite-ui-theme"
		>
			<Router>
				<Routes>
					<Route
						path="login"
						element={
							<LightThemeWrapper>
								<LoginPage />
							</LightThemeWrapper>
						}
					/>
					<Route
						path="/"
						element={<Page />}
					>
						<Route
							index
							element={<Home />}
						/>
						<Route
							path="about"
							element={<About />}
						/>
					</Route>
				</Routes>
			</Router>
		</ThemeProvider>
	);
}
