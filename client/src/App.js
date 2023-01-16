import React from "react";
import { Container } from "@material-ui/core";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Auth from "./components/Auth/Auth";

const App = () => {
	const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

	return (
		<GoogleOAuthProvider clientId={clientId}>
			<BrowserRouter>
				<Container maxWidth="lg">
					<NavBar />
					<Routes>
						<Route path="/" exact element={<Home />} />
						<Route path="/auth" exact element={<Auth />} />
					</Routes>
				</Container>
			</BrowserRouter>
		</GoogleOAuthProvider>
	);
};

export default App;
