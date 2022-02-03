import React, { useEffect, useMemo} from "react";
import {useSelector, useDispatch} from 'react-redux';
import {fetchListItems,itemsSelector} from './store/slices/itemsSlices'

import './App.css';

const handleItems = (items, itemId) =>{
    return items.reduce((acc, curr) => {
        if (curr.parent_id === itemId) {
            const children = handleItems(items, curr.id)

            if (children.length) {
                curr.children = children
            }
            acc.push(curr)
        }

        return acc
    }, [])

};

const App = () => {
    const items = useSelector(itemsSelector.getItems);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchListItems())
    },[])

    const listItems = useMemo(() => JSON.stringify(items), [items])

    const filteredItems = handleItems(JSON.parse(listItems), 0);
    console.log('filteredItems: ', filteredItems)

    return (
        <div className="App">
            <ul>
                {items.map((item) => (
                    <li key={item.id}>
                        {item.label}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
