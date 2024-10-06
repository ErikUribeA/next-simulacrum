import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartReducer from './slices/cartSlice';
import { createWrapper } from 'next-redux-wrapper';
import  favoritesReducer  from './slices/favoriteSlice'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['items'], // Solo persistimos los items del carrito
};

const favoritesPersistConfig = {
  key: 'favorites',
  storage,
};

const persistedReducer = persistReducer(persistConfig, cartReducer);
const persistedFavoritesReducer = persistReducer(favoritesPersistConfig, favoritesReducer);


export const makeStore = () =>
  configureStore({
    reducer: {
      cart: persistedReducer,
      favorites: persistedFavoritesReducer,
    },

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore);

export const store = makeStore();
export const persistor = persistStore(store);