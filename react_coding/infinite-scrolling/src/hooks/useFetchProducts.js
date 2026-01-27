import React from 'react'
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react'

const useFetchProducts = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [error, setError] = useState();
    const totalCount = useRef(0);
    const currentProductCount = useRef(0);

    const fetchProducts = async (skip, limit) => {
        const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}&select=title,price`);

        if (!response.ok) {
            throw new Error();
        }

        const responseData = await response.json();

        return responseData;
    }

    const fetchInit = async () => {
        try {
            setIsLoading(true);
            const responseData = await fetchProducts(0, 20);
            totalCount.current = responseData.total;
            currentProductCount.current += responseData.products.length;
            setData(responseData.products);
        } catch (err) {
            setError(err)
        } finally {
            setIsLoading(false)
        }
    }

    const fetchMore = async () => {
        try {
            setIsLoadingMore(true);
            const responseData = await fetchProducts(currentProductCount.current, 10);
            currentProductCount.current += responseData.products.length;
            setData(prev => [...prev, ...responseData.products]);
        } catch (err) {
            setError(err)
        } finally {
            setIsLoadingMore(false)
        }
    }

    useEffect(() => {
        if (currentProductCount.current > 0)
            return
        fetchInit();
    }, [])

    return {
        products: data,
        isLoading,
        isLoadingMore,
        error,
        total: totalCount.current,
        currentCount: currentProductCount.current,
        fetchMore
    }
}

export default useFetchProducts