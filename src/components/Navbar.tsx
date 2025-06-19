import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AiFillHome, AiOutlineShoppingCart } from 'react-icons/ai';

const Navbar: React.FC = () => {
  const cartContext = useContext(CartContext);
  const totalItems = cartContext?.cart.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <nav className="flex justify-between items-center bg-gray-800 text-white px-6 py-4">
      <Link to="/" className="text-xl font-bold">
        MyStore
      </Link>
      <div className="space-x-6 flex items-center">
        <Link to="/" className="flex items-center gap-1 hover:text-blue-300 transition">
          <AiFillHome className="text-lg" />
          <span>Home</span>
        </Link>
        <Link to="/cart" className="flex items-center gap-1 hover:text-blue-300 transition">
          <AiOutlineShoppingCart className="text-lg" />
          <span>Cart ({totalItems})</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
