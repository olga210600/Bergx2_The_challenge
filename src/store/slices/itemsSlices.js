import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const GET_ITEMS_TYPE = 'items/fetchListItems';

const url = 'http://5af1eee530f9490014ead8c4.mockapi.io/items'

const initialState = {
    items: [],
    isLoading: false,
    isError: false
}

export const fetchListItems = createAsyncThunk(
    GET_ITEMS_TYPE,
    async () => await fetch(url)
        .then((response) => {
            if (!response) {
                throw Error(response.statusText)
            }

            return response
        })
        .then((response) => response.json())
        .then((items) => items)
)

const itemsSlice = createSlice({
    name: 'items',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchListItems.pending, ((state) => {
            state.isLoading = true
        }))

        builder.addCase(fetchListItems.fulfilled, ((state, action) => {
            state.items = action.payload
            state.isLoading = false
        }))

        builder.addCase(fetchListItems.rejected, ((state) => {
            state.isError = true
        }))
    }
});

export const itemsSelector = {
    getItems: (state) => state.items,
    getIsLoading: (state) => state.isLoading,
    getErrorItems: (state) => state.isError,
}

export default itemsSlice;