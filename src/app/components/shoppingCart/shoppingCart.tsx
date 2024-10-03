'use client';

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, removeFromCart, updateQuantity } from '@/lib/redux/slices/cartSlice';
import { AppDispatch, RootState } from '@/lib/redux/store';

const ShoppingCart1: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { items, status } = useSelector((state: RootState) => state.cart);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProducts());
        }
    }, [status, dispatch]);

    if (status === 'loading') {
        return <div>Cargando productos...</div>;
    }

    if (status === 'failed') {
        return <div>Error al cargar productos. Por favor, intente nuevamente.</div>;
    }

    if (items.length === 0) {
        return <div>No hay productos en el carrito.</div>;
    }

    return (
        <div>
            <h2>Carrito de compras</h2>
            <ul>
                {items.map(item => (
                    <li key={item.id}>
                        {item.title} - Cantidad: {item.quantity} - Total: ${(item.price * item.quantity).toFixed(2)}
                        <button onClick={() => dispatch(removeFromCart(item.id))}>Eliminar</button>
                        <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => {
                                const newQuantity = parseInt(e.target.value, 10);
                                if (newQuantity > 0) {
                                    dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
                                }
                            }}
                            min="1"
                        />
                    </li>
                ))}
            </ul>
            <div>
                Total: ${items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
            </div>

        </div>

    );
};

export default ShoppingCart1;