import React from "react";

import List from "../components/List";
import ListContentForm from "../components/ListContentForm";

import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
	return (
		<div>
			<ListContentForm />
			<List />
		</div>
	);
};

export default Home;
