import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { useSearchParams, useNavigate } from 'react-router-dom';
import type { Product } from '../types';
import Loading from '../helpers/Loading';
import { motion, AnimatePresence } from 'framer-motion';

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const selectedCategories = searchParams.getAll('category');
  const sort = searchParams.get('sort') || 'asc';

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let result: Product[] = [];

      if (selectedCategories.length > 0) {
        const promises = selectedCategories.map(cat =>
          axios.get<Product[]>(`https://fakestoreapi.com/products/category/${cat}`)
        );
        const responses = await Promise.all(promises);
        result = responses.flatMap(r => r.data);
      } else {
        const res = await axios.get<Product[]>('https://fakestoreapi.com/products');
        result = res.data;
      }

      const sorted = [...result].sort((a, b) =>
        sort === 'asc' ? a.price - b.price : b.price - a.price
      );

      setProducts(sorted);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const fetchCategories = async () => {
    const res = await axios.get<string[]>('https://fakestoreapi.com/products/categories');
    setCategories(res.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [searchParams]);

  const toggleCategory = (cat: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    const existing = searchParams.getAll('category');
    if (existing.includes(cat)) {
      const updated = existing.filter(c => c !== cat);
      newParams.delete('category');
      updated.forEach(c => newParams.append('category', c));
    } else {
      newParams.append('category', cat);
    }
    setSearchParams(newParams);
  };

  const handleSortChange = (val: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('sort', val);
    setSearchParams(newParams);
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl mb-4 font-bold">Products</h1>

      <div className="flex flex-wrap gap-4 mb-4 items-center">
        {categories.map(cat => (
          <motion.button
            key={cat}
            onClick={() => toggleCategory(cat)}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className={`border px-3 py-1 rounded ${
              selectedCategories.includes(cat) ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            {cat}
          </motion.button>
        ))}

        <select
          value={sort}
          onChange={(e) => handleSortChange(e.target.value)}
          className="ml-auto border px-2 py-1 rounded"
        >
          <option value="asc">Sort: Low to High</option>
          <option value="desc">Sort: High to Low</option>
        </select>
      </div>

      {loading ? (
        <Loading type="block" height="500px" width="100%" />
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <AnimatePresence>
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default Home;
