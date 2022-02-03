import React, {useEffect, useMemo} from "react";
import {useSelector, useDispatch} from 'react-redux';
import {fetchListItems, itemsSelector} from './store/slices/itemsSlices'

import './App.css';

const handleItems = (items, id) => {
    return items.reduce((acc, curr) => {
        if (curr.parent_id === id) {
            const children = handleItems(items, curr.id)

            if (children.length) {
                curr.children = children
            }
            acc.push(curr)
        }

        return acc
    }, [])
};

const renderingItems = (arr) => (
    <ul>
        {arr.map((filteredItem) => (
            <li key={filteredItem.id}>
                {filteredItem.label}
                {filteredItem.children && filteredItem.children.length ? renderingItems(filteredItem.children) : null}

            </li>
        ))}
    </ul>
)

const App = () => {
    const items = useSelector(itemsSelector.getItems);
    const isLoading = useSelector(itemsSelector.getIsLoading);
    const isError = useSelector(itemsSelector.getErrorItems);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchListItems())
    }, [dispatch])

    const listItems = useMemo(() => JSON.stringify(items), [items])

    const filteredItems = handleItems(JSON.parse(listItems), 0);

    if (isError) {
        return (
            <div>Sorry, but you have an error with loading items. Try to do it later :)</div>
        )
    }

    return (
        <div className="App">
            {isLoading ? (
                <span>Loading...</span>
            ) : (
                <div>
                    <h2>Original:</h2>

                    <ul>
                        {items.map((item) => (
                            <li key={item.id}>
                                {item.label}
                            </li>
                        ))}
                    </ul>

                    <h2>Filtered:</h2>

                    {renderingItems(filteredItems)}
                </div>
            )}

        </div>
    );
}

export default App;
