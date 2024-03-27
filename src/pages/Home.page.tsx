import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard.component";
import { useLatestProductsQuery } from "../redux/api/productApi";
import toast from "react-hot-toast";
import { Skeleton } from "../components/Loader.component";

const Home = () => {
  const { data, isLoading, isError } = useLatestProductsQuery("");
  const addToCartHandler = () => {};

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
