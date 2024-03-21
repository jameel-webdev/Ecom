import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard.component";

const Home = () => {
  const addToCartHandler = () => {};

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
        <ProductCard
          productId="adjbhguhjbj"
          name="Macbook"
          price={21233}
          stock={12}
          photo="https://m.media-amazon.com/images/I/41YvjAcEc3L._SY445_SX342_QL70_FMwebp_.jpg"
          handler={addToCartHandler}
        />
      </main>
    </div>
  );
};

export default Home;
