import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import type { Product } from '../types';
import Loading from '../helpers/Loading';
import { motion } from 'framer-motion';
import { BiArrowBack } from 'react-icons/bi'; 


const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const cartContext = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await axios.get<Product>(`https://fakestoreapi.com/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error('Product fetch failed:', err);
      }
      setLoading(false);
    };

    if (id) fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product && cartContext) {
      cartContext.addToCart(product);
      navigate('/cart');
    }
  };

  if (loading) return <Loading type="block" height="500px" />;
  if (!product) return <p className="p-4 text-red-500">Product not found.</p>;

  return (
    <motion.div
      className="p-4 max-w-4xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.button
  className="flex items-center gap-2 text-blue-600 font-medium mb-6 px-4 py-2 rounded hover:bg-blue-100 transition"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  onClick={() => navigate(-1)}
>
  <BiArrowBack className="text-lg" />
  Back
</motion.button>


      <div className="flex flex-col md:flex-row gap-6">
        <motion.img
          src={product.image}
          alt={product.title}
          className="h-80 object-contain w-full md:w-1/2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        <motion.div
          className="flex-1"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h1 className="text-3xl font-semibold mb-2">{product.title}</h1>
          <p className="text-gray-600 mb-2">{product.category}</p>
          <p className="text-xl text-green-600 mb-4">${product.price.toFixed(2)}</p>
          <p className="mb-4">{product.description}</p>
          <motion.button
            onClick={handleAddToCart}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Add to Cart
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductDetail;
