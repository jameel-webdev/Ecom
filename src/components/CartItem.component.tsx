import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CartItem } from "../types/types";

type CartItemsProps = {
  cartItem: CartItem;
  incrementHandler: (cartItem: CartItem) => void;
  decrementHandler: (cartItem: CartItem) => void;
  removeHandler: (id: string) => void;
};

const Cartitem = ({
  cartItem,
  incrementHandler,
  decrementHandler,
  removeHandler,
}: CartItemsProps) => {
  const { productId, photo, name, price, quantity } = cartItem;

  return (
    <div className="cart-item">
      <img src={`${import.meta.env.VITE_SERVER}/${photo}`} alt="photo" />
      <article>
        <Link to={`/product/${productId}`}>{name}</Link>
        <span>₹{price}</span>
      </article>

      <div>
        <button onClick={() => decrementHandler(cartItem)}>-</button>
        <p>{quantity}</p>
        <button onClick={() => incrementHandler(cartItem)}>+</button>
      </div>

      <button onClick={() => removeHandler(productId)}>
        <FaTrash />
      </button>
    </div>
  );
};

export default Cartitem;
