import React, { useContext } from "react";
import ListContext from "../context/ListContext";

import "bootstrap/dist/css/bootstrap.min.css";

const ListItem = (props) => {
	const { _id, content } = props.item;
	const { removeItem, setCurrent } = useContext(ListContext);

	const handleDelete = () => {
		removeItem(_id);
	};

	const handleEdit = () => {
		setCurrent(props.item);
	}

	return (
		<div className="card m-3" id={_id}>
			<div className="card-body d-flex justify-content-between align-items-center">
				<p>{content}</p>
				<div className="d-flex justify-content-between">
					<button className="btn btn-warning m-1" onClick={handleEdit}>
						Edit
					</button>
					<button className="btn btn-danger m-1" onClick={handleDelete}>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
};

export default ListItem;
