import React, { useState, useContext, useEffect } from 'react'
import ListContext from "../context/ListContext";

const ListContentForm = () => {
    const listContext = useContext(ListContext);

	const [content, setContent] = useState("");

    const { current } = listContext;

    useEffect(() => {
        if (current) {
            setContent(current.content);
        }
    }, [current])
    
	const handleChange = (e) => {
		setContent(e.target.value);
	};

    const handleSubmit = (e) => {
		e.preventDefault();

        if (current) {
            listContext.updateItem(
                current._id, 
                content
            );
        } else {
            listContext.addItem(content);
        }

		setContent("");
	};

    return (
        <div>
            <form className="m-3" onSubmit={handleSubmit}>
				<input
					value={content}
					onChange={handleChange}
					className="form-control inline m-2"
					type="text"
					placeholder="Enter a todo item"
					required
				/>
				<button className="btn btn-light">
                    {current ? 'UPDATE' : 'ADD'}
                </button>
			</form>
        </div>
    )
}

export default ListContentForm
