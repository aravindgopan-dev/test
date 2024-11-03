import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import userReducer from './userSlice'; // Assuming userSlice is in the same directory

// Persist config to store only 'name' and 'isAuth' properties in local storage
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user', 'isAuth'], // persist both 'name' and 'isAuth' properties
};

// Wrap the userReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
    reducer: {
        user: persistedReducer, // Persisted user slice reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Disable serializability check
        }),
});

export const persistor = persistStore(store);
export default store;
