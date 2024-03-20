import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import CartItem from "../components/CartItem.component";
import { Link } from "react-router-dom";

const cartItems = [
  {
    productId: "kljhcgfyghj",
    photo:
      "https://m.media-amazon.com/images/I/41YvjAcEc3L._SY445_SX342_QL70_FMwebp_.jpg",
    name: "Macbook",
    price: 3000,
    quantity: 4,
    stock: 10,
  },
];
const subtotal = 4000;
const tax = Math.round(subtotal * 0.18);
const shippingCharges = 200;
const discount = 400;
const total = subtotal + tax + shippingCharges;

const Cart = () => {
  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      if (Math.random() > 0.5) setIsValidCouponCode(true);
      else setIsValidCouponCode(false);
    }, 1000);

    return () => {
      clearTimeout(timeOutId);
      setIsValidCouponCode(false);
    };
  }, [couponCode]);
  return (
    <>
      <div className="cart">
        <main>
          {cartItems.length > 0 ? (
            cartItems.map((e, i) => <CartItem key={i} cartItem={e} />)
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
