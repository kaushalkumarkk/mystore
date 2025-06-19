import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import NoDataScreen from '../helpers/NoData';
import { motion, AnimatePresence } from 'framer-motion';

const Cart: React.FC = () => {
  const cartContext = useContext(CartContext);
  const [itemToRemove, setItemToRemove] = useState<number | null>(null);

  if (!cartContext) return <p>Cart context not available.</p>;

  const { cart, removeFromCart } = cartContext;
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleConfirmRemove = () => {
    if (itemToRemove !== null) {
      removeFromCart(itemToRemove);
      setItemToRemove(null);
    }
  };

  return (
    <motion.div
      className="p-4 max-w-4xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <NoDataScreen message="Your cart is empty." height="400px" />
      ) : (
        <>
          <ul className="divide-y">
            <AnimatePresence>
              {cart.map((item) => (
                <motion.li
                  key={item.id}
                  className="py-4 flex gap-4 items-center"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-20 w-20 object-contain"
                  />
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold">{item.title}</h2>
                    <p>Quantity: {item.quantity}</p>
                    <p className="text-green-600">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <motion.button
                    onClick={() => setItemToRemove(item.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    Remove
                  </motion.button>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>

          <motion.div
            className="text-right mt-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <h2 className="text-xl font-bold">Total: ${total.toFixed(2)}</h2>
          </motion.div>
        </>
      )}

      {/* Confirmation Modal */}
      <AnimatePresence>
        {itemToRemove !== null && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg p-6 w-full max-w-md text-center shadow-lg"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <h2 className="text-xl font-semibold mb-4">Confirm Remove</h2>
              <p className="mb-6">Are you sure you want to remove this item from your cart?</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setItemToRemove(null)}
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmRemove}
                  className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
                >
                  Yes, Remove
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Cart;
