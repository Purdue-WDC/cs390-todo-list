import React from "react";
import { Switch, Route } from "react-router";
import Navigation from "./components/Navigation";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PrivateRoute from "./components/PrivateRoute";

import { AuthContextProvider } from "./context/AuthContext";
import { ListContextProvider } from "./context/ListContext";

import "./App.css";

function App() {
	return (
		<div className="App">
			<AuthContextProvider>
				<ListContextProvider>
					<Navigation />
					<Switch>
						<PrivateRoute path="/" exact component={Home} />
						<Route path="/login" exact component={Login} />
						<Route path="/register" exact component={Signup} />
					</Switch>
				</ListContextProvider>
			</AuthContextProvider>
		</div>
	);
}

export default App;
