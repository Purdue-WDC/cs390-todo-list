import React, { useContext, useEffect } from 'react'
import ListItem from './ListItem'

import "bootstrap/dist/css/bootstrap.min.css";

import ListContext from '../context/ListContext';

const List = () => {
    const listContext = useContext(ListContext);

    console.log(listContext);

    useEffect(() => {
        listContext.getItems();
        // eslint-disable-next-line
    }, [])

    return (
        <div className="d-flex flex-column justify-content-center">
            {listContext.items && listContext.items.map(listItem => (
                <ListItem item={listItem} id={listItem._id}/>
            ))}
        </div>
    )
}

export default List
