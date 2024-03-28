import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItemCard from "../components/CartItem.component";
import {
  addToCart,
  calculatePrice,
  discountApply,
  removeCartItem,
} from "../redux/reducer/cardReducer";
import { CartReducerInitialState } from "../types/reducer.types";
import { CartItem } from "../types/types";
import axios from "axios";

const Cart = () => {
  const { cartItems, subtotal, tax, discount, shippingCharges, total } =
    useSelector(
      (state: { cartReducer: CartReducerInitialState }) => state.cartReducer
    );
  const dispatch = useDispatch();
  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);
  const incrementHandler = (cartItem: CartItem) => {
    if (cartItem.quantity >= cartItem.stock) return;
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }));
  };
  const decrementHandler = (cartItem: CartItem) => {
    if (cartItem.quantity <= 1) return;

    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }));
  };
  const removeHandler = (productId: string) => {
    dispatch(removeCartItem(productId));
  };
  useEffect(() => {
    const { token, cancel } = axios.CancelToken.source();
    const timeOutId = setTimeout(() => {
      axios
        .get(
          `${
            import.meta.env.VITE_SERVER
          }/api/payment/discount?couponCode=${couponCode}`,
          { cancelToken: token }
        )
        .then((res) => {
          dispatch(discountApply(res.data.discount));
          setIsValidCouponCode(true);
          dispatch(calculatePrice());
        })
        .catch(() => {
          dispatch(discountApply(0));
          setIsValidCouponCode(false);
          dispatch(calculatePrice());
        });
    }, 1000);

    return () => {
      clearTimeout(timeOutId);
      cancel();
      setIsValidCouponCode(false);
    };
  }, [couponCode]);

  useEffect(() => {
    dispatch(calculatePrice());
  }, [dispatch, cartItems]);

  return (
    <>
      <div className="cart">
        <main>
          {cartItems.length > 0 ? (
            cartItems.map((e, i) => (
              <CartItemCard
                incrementHandler={incrementHandler}
                decrementHandler={decrementHandler}
                removeHandler={removeHandler}
                key={i}
                cartItem={e}
              />
            ))
          ) : (
            <h1>No Items Added</h1>
          )}
        </main>
        <aside>
          <p>Subtotal: ₹{subtotal}</p>
          <p>Shipping Charges: ₹{shippingCharges}</p>
          <p>Tax(18%): ₹{tax}</p>
          <p>
            Discount: <em className="red">- ₹{discount}</em>
          </p>
          <p>
            <strong>Total: ₹{total}</strong>{" "}
          </p>
          <input
            type="text"
            placeholder="Coupon Code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />
          {couponCode &&
            (isValidCouponCode ? (
              <span className="green">
                <code>{couponCode}</code> ₹{discount} Discounted
              </span>
            ) : (
              <span className="red">
                Invalid Coupon Code <VscError />
              </span>
            ))}

          {cartItems.length > 0 && <Link to={"/shipping"}>Checkout</Link>}
        </aside>
      </div>
    </>
  );
};

export default Cart;
