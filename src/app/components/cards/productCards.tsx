'use client'
import React, { useEffect, useState } from 'react';
import "./styles.sass";
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { ShoppingCart, Heart } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { toggleFavorite } from '@/lib/redux/slices/favoriteSlice';
import { addToCart } from '@/lib/redux/slices/cartSlice';
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";


interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
    description: string;
    category: string;
}

interface ApiResponse {
    products: Product[];
}

const CharactersCards: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const translate = useTranslations('');
    const dispatch = useAppDispatch();
    const favorites = useAppSelector(state => state.favorites);
    const { data: session } = useSession();


    useEffect(() => {
        async function fetchingData() {
            try {
                const response = await fetch('/api/post');
                if (!response.ok) {
                    throw new Error("Error fetching data");
                }
                const data: ApiResponse = await response.json();
                setProducts(data.products);
            } catch (error) {
                console.error("Error fetching the data:", error);
                setError(error instanceof Error ? error.message : 'An unknown error occurred');
            } finally {
                setIsLoading(false);
            }
        }
        fetchingData();
    }, []);

    const handleAddToCart = (product: Product) => {
        if (session) {
            dispatch(addToCart(product));
            toast.success(translate("addedToCart"));
        } else {
            toast.warn(translate("loginRequired"));
        }
    };

    const handleToggleFavorite = (id: number) => {
        dispatch(toggleFavorite(id));
    };

    const isFavorite = (productId: number) => {
        if (Array.isArray(favorites)) {
            return favorites.includes(productId);
        } else if (typeof favorites === 'object' && favorites !== null) {
            return Boolean(favorites[productId]);
        }
        return false;
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (products.length === 0) return <div>No characters found</div>;

    return (
        <div>
            <h1>{translate("title")}</h1>
            <ul className='CharacterList'>
                {products.map((product) => (
                    <div className='card' key={product.id}>
                        <div className='card-image-wrapper'>
                            <Image className='card-image' src={product.image} alt={product.title} fill />
                            <button
                                className={`favorite-button ${isFavorite(product.id) ? 'is-favorite' : ''}`}
                                onClick={() => handleToggleFavorite(product.id)}
                            >
                                <Heart size={16} fill={isFavorite(product.id) ? "red" : "none"} />
                            </button>
                        </div>
                        <div className='card-content'>
                            <h2 className='card-title'>{product.title}</h2>
                            <p className='card-price'>{translate("price")}: {product.price}</p>
                            <button
                                className='add-to-cart-button'
                                onClick={() => handleAddToCart(product)}
                            >
                                <ShoppingCart size={16} />
                                {translate("add")}
                            </button>
                        </div>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default CharactersCards;