import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
    items: [],
}

export const fetchListItems = createAsyncThunk(
    'items/fetchListItems',
    async () => {
        const response = await fetch('http://5af1eee530f9490014ead8c4.mockapi.io/items')
            .then((response) => {
                if (!response) {
                    throw Error(response.statusText)
                }

                return response
            })
            .then((response) => response.json())
            .then((items) => items)

        return response
    }
)

const itemsSlice = createSlice({
    name: 'items',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchListItems.fulfilled, ((state, action) => {
            state.items = action.payload
        }))
    }
});

export const itemsSelector = {
    getItems: (state) => state.items,
}

export const {} = itemsSlice.actions;

export default itemsSlice;