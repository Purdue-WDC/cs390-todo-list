import React, { useReducer } from 'react'
import axios from 'axios';

const initialState = {
    items: [],
    current: null
};

const ADD_ITEM = 'ADD_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';
const UPDATE_ITEM = 'UPDATE_ITEM';
const GET_ITEMS = 'GET_ITEMS';
const SET_CURRENT = 'SET_CURRENT';
const CLEAR_CURRENT = 'CLEAR_CURRENT';

const ListContext = React.createContext({
    ...initialState,
    addItem: () => {},
    removeItem: () => {},
    getItems: () => {},
    updateItem: () => {},
    setCurrent: () => {},
    clearCurrent: () => {}
});

const ListReducer = (state, action) => {
    switch(action.type) {
        case ADD_ITEM:
            return {
                ...state,
                items: [action.payload, ...state.items]
            }
        case REMOVE_ITEM:
            return {
                ...state,
                items: state.items.filter(item => item._id !== action.payload)
            }
        case UPDATE_ITEM:
            const temp = state.items.map(item => {
                if (item._id === action.payload._id) {
                    return action.payload
                } else {
                    return item;
                }
            });
            return {
                ...state,
                items: temp
            }
        case GET_ITEMS:
            return {
                ...state,
                items: action.payload
            }
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload
            }
        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            }
        default:
            return state
    }
}

export const ListContextProvider = (props) => {
    const [state, dispatch] = useReducer(ListReducer, initialState);

    // Add an item
    const addItem = async (content) => {
        try {
            const data = {
                content
            }

            const res = await axios.post('/api/todo', data);

            const item = res.data.todoItem;

            dispatch({
                type: ADD_ITEM,
                payload: item
            });
        } catch (err) {
            alert('Something went wrong');
        }

    }

    // Remove an item
    const removeItem = async (id) => {
        try {
            await axios.delete(`/api/todo/${id}`);

            dispatch({
                type: REMOVE_ITEM,
                payload: id
            })
        } catch (err) {
            alert('Something went wrong');
        }
        
    }

    // Clear current selection
    const clearCurrent = () => {
        dispatch({
            type: CLEAR_CURRENT
        })
    }

    // Update item
    const updateItem = async (id, content) => {
        try {
            const data = {
                content
            }

            const res = await axios.put(`/api/todo/${id}`, data);

            const item = res.data.updatedItem;

            dispatch({
                type: UPDATE_ITEM,
                payload: item
            })

            clearCurrent();
        } catch (err) {
            alert('Something went wrong');
        }
    }

    // Get logged in user's items
    const getItems = async () => {
        try {
            const res = await axios.get('/api/todo',  {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            });

            // console.log(res.data);
            const items = res.data.items;

            dispatch({
                type: GET_ITEMS,
                payload: items
            })
        } catch (err) {

        }
    }

    // Set current item for update
    const setCurrent = (item) => {
        console.log('current', item);
        dispatch({
            type: SET_CURRENT,
            payload: item
        })
    }

    return (
        <ListContext.Provider value={{
            items: state.items,
            current: state.current,
            addItem,
            removeItem,
            getItems,
            updateItem,
            setCurrent,
            clearCurrent
        }}>
            {props.children}
        </ListContext.Provider>
    )
}

export default ListContext
