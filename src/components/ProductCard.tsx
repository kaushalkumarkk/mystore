import React from 'react';
import type { Product } from '../types';
import { Link } from 'react-router-dom';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} className="block border rounded p-4 hover:shadow-lg transition">
      <img src={product.image} alt={product.title} className="h-40 object-contain w-full mb-4" />
      <h2 className="font-semibold text-lg truncate">{product.title}</h2>
      <p className="text-gray-700">${product.price.toFixed(2)}</p>
    </Link>
  );
};

export default ProductCard;
