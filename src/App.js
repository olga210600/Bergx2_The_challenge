import React, {useEffect, useMemo} from "react";
import {useSelector, useDispatch} from 'react-redux';

import {fetchListItems, itemsSelector} from './store/slices/itemsSlices'
import LoadingPage from "./components/LoadingPage/LoadingPage";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import {Wrapper, WrapperUl, WrapperLi, Title, WrapperLiFiltered} from "./store/App.styled";

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
    <WrapperUl>
        {arr.map((filteredItem) => (
            <WrapperLiFiltered key={filteredItem.id}>
                {filteredItem.label}
                {filteredItem.children && filteredItem.children.length ? renderingItems(filteredItem.children) : null}

            </WrapperLiFiltered>
        ))}
    </WrapperUl>
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
            <ErrorPage/>
        )
    }

    return (
        <Wrapper className="App">
            {isLoading ? (
                <LoadingPage/>
            ) : (
                <div>
                    <Title>Original:</Title>

                    <WrapperUl>
                        {items.map((item) => (
                            <WrapperLi key={item.id}>
                                {item.label}
                            </WrapperLi>
                        ))}
                    </WrapperUl>

                    <Title>Filtered:</Title>

                    {renderingItems(filteredItems)}
                </div>
            )}

        </Wrapper>
    );
}

export default App;
