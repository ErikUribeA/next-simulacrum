    'use client'
    import { useEffect, useState } from 'react'
    import "./styles.sass"
    import { useTranslations } from 'next-intl'
    import Image from 'next/image'
    import { ShoppingCart } from 'lucide-react'
    import { useAppDispatch } from '@/lib/redux/hooks' // Asegúrate de que la ruta sea correcta
    import { addToCart } from '@/lib/redux/slices/cartSlice' // Asegúrate de que la ruta sea correcta

    interface Product {
        id: number
        title: string
        price: number
        image: string
        description: string
        category: string
    }

    interface ApiResponse {
        products: Product[]
    }

    export default function CharactersCards() {
        const [products, setProducts] = useState<Product[]>([]);
        const [isLoading, setIsLoading] = useState(true);
        const [error, setError] = useState<string | null>(null);
        const translate = useTranslations('');
        const dispatch = useAppDispatch();

        useEffect(() => {
            async function fetchingData() {
                try {
                    const response = await fetch('/api/post');
                    if (!response.ok) {
                        console.log("Error fetching data ")
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
            dispatch(addToCart(product));
        };

        if (isLoading) return <div>Loading...</div>;
        if (error) return <div>Error: {error}</div>;
        if (products.length === 0) return <div>No characters found</div>;

        return (
            <div>
                <h1> {translate("title")} </h1>
                <ul className='CharacterList'>
                    {products.map((product) => (
                        <div className='card' key={product.id}>
                            <div className='card-image-wrapper'>
                                <Image className='card-image' src={product.image} alt={product.title} fill />
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
    }