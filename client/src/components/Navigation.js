import React, { useContext } from "react";
import { NavLink, withRouter } from "react-router-dom";
import AuthContext from "../context/AuthContext";

import "bootstrap/dist/css/bootstrap.min.css";

const Navigation = (props) => {
	const { user, authenticated, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
		props.history.push('/login');
    }
    
	return (
		<header>
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<a className="navbar-brand m-2" href="/">
					Todo List
				</a>
				<ul className="navbar-nav position-absolute end-0 m-2">
					{authenticated ? (
						<li className="float-right">
							<p>{user.name}</p>
							<button className="btn btn-ligt" onClick={handleLogout}>Logout</button>
						</li>
					) : (
						<>
							<li className="nav-item">
								<NavLink className="nav-link" exact to="/login">
									Login
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link" exact to="/register">
									Register
								</NavLink>
							</li>
						</>
					)}
				</ul>
			</nav>
		</header>
	);
};

export default withRouter(Navigation);
