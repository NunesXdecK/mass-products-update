import React, { useEffect, useState } from 'react';
import { ProductFromDB } from '../types/mass-price-update-types';

export default function useProducts() {
    const [loading, setLoading] = useState<boolean>(false)
    const [products, setProducts] = useState<ProductFromDB[]>([])

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true)
            try {
              const response = await fetch('http://localhost:4000/api/products')
              const data = await response.json()
              setProducts(data)
            } catch (error) {
              console.error('Erro ao buscar os produtos:', error);
            }
            setLoading(false)
          };
          fetchProducts();
    }, [])

    return {
        productLoading: loading,
        products: products
    }
}