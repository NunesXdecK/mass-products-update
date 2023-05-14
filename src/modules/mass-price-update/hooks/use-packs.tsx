import React, { useEffect, useState } from 'react';
import { PacksFromDB } from '../types/mass-price-update-types';

export default function usePacks() {
    const [loading, setLoading] = useState<boolean>(false)
    const [packs, setPacks] = useState<PacksFromDB[]>([])

    useEffect(() => {
        const fetchPacks = async () => {
            setLoading(true)
            try {
              const response = await fetch('http://localhost:4000/api/packs')
              const data = await response.json()
              setPacks(data)
            } catch (error) {
              console.error('Erro ao buscar os produtos:', error);
            }
            setLoading(false)
          };
          fetchPacks();
    }, [])

    return {
        packLoading: loading,
        packs: packs
    }
}