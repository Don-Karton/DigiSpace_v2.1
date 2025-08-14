import React from 'react';
import { X, Plus, Minus, ShoppingCart, Coins, CreditCard } from 'lucide-react';

interface CartItem {
  cartId: number;
  id: number;
  name: string;
  price: number;
  coinPrice: number;
  image: string;
  quantity: number;
  venue: string;
  venueName: string;
  description?: string;
}

interface CartModalProps {
  cartItems: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (cartId: number, quantity: number) => void;
  onRemoveItem: (cartId: number) => void;
  onCheckout: () => void;
  totalPrice: number;
  totalCashPrice: number;
  barCoinBalance: number;
}

const CartModal: React.FC<CartModalProps> = ({
  cartItems,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  totalPrice,
  totalCashPrice,
  barCoinBalance
}) => {
  const canPay = barCoinBalance >= totalPrice;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end">
      <div className="bg-white w-full max-h-[90vh] rounded-t-2xl overflow-hidden">
        <div className="sticky top-0 bg-white border-b px-4 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <ShoppingCart size={24} />
              Корзина ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <ShoppingCart size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-lg">Корзина пуста</p>
              <p className="text-sm">Добавьте товары из меню</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.cartId} className="bg-gray-50 rounded-2xl p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center text-2xl">
                      {item.image}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600">{item.venueName}</p>
                      {item.description && (
                        <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                      )}
                      
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center gap-1 text-purple-600 font-bold">
                          <Coins size={14} />
                          {item.coinPrice}
                        </div>
                        <div className="text-gray-500 text-sm line-through">
                          {item.price} ₾
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex items-center gap-2 bg-white rounded-lg p-1">
                        <button
                          onClick={() => onUpdateQuantity(item.cartId, item.quantity - 1)}
                          className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-md flex items-center justify-center transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center font-bold">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.cartId, item.quantity + 1)}
                          className="w-8 h-8 bg-purple-600 hover:bg-purple-700 text-white rounded-md flex items-center justify-center transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      
                      <button
                        onClick={() => onRemoveItem(item.cartId)}
                        className="text-red-500 hover:text-red-700 text-sm font-medium"
                      >
                        Удалить
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="sticky bottom-0 bg-white border-t p-4">
            <div className="space-y-3 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Итого наличными:</span>
                <span className="font-bold text-gray-900">{totalCashPrice.toFixed(2)} ₾</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-purple-600 font-medium">Цена в BarCoin:</span>
                <div className="flex items-center gap-1 text-purple-600 font-bold text-lg">
                  <Coins size={20} />
                  {totalPrice.toFixed(1)}
                </div>
              </div>
              
              <div className="flex justify-between items-center text-green-600">
                <span className="font-medium">Экономия:</span>
                <span className="font-bold">{(totalCashPrice - totalPrice).toFixed(2)} ₾</span>
              </div>
              
              <div className="flex justify-between items-center pt-2 border-t">
                <span className="text-gray-600">Ваш баланс:</span>
                <div className="flex items-center gap-1 font-bold">
                  <Coins size={16} />
                  {barCoinBalance.toFixed(1)}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                disabled
                className="bg-gray-200 text-gray-500 py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
              >
                <CreditCard size={20} />
                Наличные
              </button>
              
              <button
                onClick={onCheckout}
                disabled={!canPay}
                className={`py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                  canPay 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Coins size={20} />
                {canPay ? 'Оплатить BarCoin' : 'Недостаточно средств'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;