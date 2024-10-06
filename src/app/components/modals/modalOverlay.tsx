'use client'
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '@/lib/redux/slices/cartSlice';
import { AppDispatch, RootState } from '@/lib/redux/store';
import { ShoppingCart } from 'lucide-react';
import styled from 'styled-components';
import { useTranslations } from 'next-intl';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: flex-end;
  z-index: 1000;
`;

const ModalContent = styled.div`
  width: 400px;
  height: 100%;
  background-color: white;
  padding: 20px;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const CartList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const CartItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
`;

const ItemInfo = styled.div`
  flex-grow: 1;
`;

const ItemTitle = styled.h3`
  margin: 0;
  font-size: 1rem;
`;

const ItemPrice = styled.p`
  margin: 5px 0 0;
  font-size: 0.9rem;
  color: #666;
`;

const QuantityInput = styled.input`
  width: 50px;
  padding: 5px;
  margin-right: 10px;
`;

const RemoveButton = styled.button`
  background-color: #ff4d4f;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;
`;

const TotalPrice = styled.div`
  margin-top: 20px;
  font-weight: bold;
  text-align: right;
`;

const CartButton = styled.button`
  display: flex;
  align-items: center;
  background-color: #1890ff;
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 4px;
`;

const ShoppingCartModal: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector((state: RootState) => state.cart);
  const [isOpen, setIsOpen] = React.useState(false);

  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

  const toggleModal = () => setIsOpen(!isOpen);
  const translate = useTranslations("shoppingCart")

  return (
    <>
      <CartButton onClick={toggleModal}>
        <ShoppingCart size={18} style={{ marginRight: '8px' }} />
        {translate("cart")} ({items.length})
      </CartButton>

      {isOpen && (
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>
              <h2> {translate("shoppingCart")} </h2>
              <CloseButton onClick={toggleModal}>&times;</CloseButton>
            </ModalHeader>

            {items.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <CartList>
                {items.map(item => (
                  <CartItem key={item.id}>
                    <ItemInfo>
                      <ItemTitle>{item.title}</ItemTitle>
                      <ItemPrice>${item.price} x {item.quantity}</ItemPrice>
                    </ItemInfo>
                    <div>
                      <QuantityInput
                        type="number"
                        value={item.quantity}
                        onChange={(e) => {
                          const newQuantity = parseInt(e.target.value, 10);
                          if (newQuantity > 0) {
                            dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
                          }
                        }}
                        min="1"
                      />
                      <RemoveButton onClick={() => dispatch(removeFromCart(item.id))}>
                        {translate("remove")}
                      </RemoveButton>
                    </div>
                  </CartItem>
                ))}
              </CartList>
            )}

            <TotalPrice>
              Total: ${totalPrice}
            </TotalPrice>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default ShoppingCartModal;