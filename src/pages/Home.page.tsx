import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Skeleton } from "../components/Loader.component";
import ProductCard from "../components/ProductCard.component";
import { useLatestProductsQuery } from "../redux/api/productApi";
import { addToCart } from "../redux/reducer/cartReducer";
import { CartItem } from "../types/types";

const Home = () => {
  const { data, isLoading, isError } = useLatestProductsQuery("");
  const dispatch = useDispatch();
  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of Stock");
    dispatch(addToCart(cartItem));
    toast.success("Added to Cart");
  };

  if (isError) toast.error("Cannot fetch the products!");
  return (
    <div className="home">
      <section>
        <div className="big">
          <p>Quick Delivery</p>
          <h4>Gateway to Gadgets Galore.</h4>
        </div>
      </section>

      <h2>
        Latest Product
        <Link to="/search">More</Link>
      </h2>

      <main>
        {isLoading ? (
          <Skeleton width="80vw" />
        ) : (
          data?.products.map((ele) => (
            <ProductCard
              key={ele._id}
              productId={ele._id}
              name={ele.name}
              price={ele.price}
              stock={ele.stock}
              photo={ele.photo}
              handler={addToCartHandler}
            />
          ))
        )}
      </main>
    </div>
  );
};

export default Home;
