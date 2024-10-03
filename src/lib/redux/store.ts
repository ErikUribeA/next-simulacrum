import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartReducer from './slices/cartSlice';
import { createWrapper } from 'next-redux-wrapper';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['items'], // Solo persistimos los items del carrito
};

const persistedReducer = persistReducer(persistConfig, cartReducer);

export const makeStore = () =>
  configureStore({
    reducer: {
      cart: persistedReducer,
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