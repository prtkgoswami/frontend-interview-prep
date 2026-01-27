import React, { useRef, useEffect } from "react";
import useFetchProducts from "../hooks/useFetchProducts";

const ProductList = () => {
  const loadMoreRef = useRef(null);
  const {
    products,
    isLoading,
    isLoadingMore,
    error,
    currentCount,
    total,
    fetchMore,
  } = useFetchProducts();

  useEffect(() => {
    const currentRef = loadMoreRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver((entry) => {
      if (entry[0] && entry[0].isIntersecting && !isLoadingMore) {
        fetchMore();
      }
    });
    observer.observe(currentRef);

    return () => {
      observer.disconnect();
    };
  }, [loadMoreRef.current, fetchMore, isLoadingMore]);

  if (isLoading) {
    return (
      <div>
        <p>Fetching products...</p>
      </div>
    );
  }

  if (currentCount === 0 && error) {
    return (
      <div>
        <p>Failed to Fetch Products</p>
      </div>
    );
  }

  return (
    <div id="product-list-container">
      <ul id="product-list">
        {products.map((product) => (
          <li key={product.id}>
            {product.title} - {product.price}
          </li>
        ))}
        {currentCount < total && (
          <li id="load-more-indicator" ref={loadMoreRef}>
            {isLoadingMore && "Loading More ..."}
            {error && "Something went wrong."}
          </li>
        )}
      </ul>
      <div id="product-list-counts">
        {currentCount} / {total}
      </div>
    </div>
  );
};

export default ProductList;
