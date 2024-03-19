import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard.component";

const Home = () => {
  const addToCartHandler = () => {};

  return (
    <div className="home">
      <section>
        <div className="big">
          <p>Quick Delivery</p>
          <h2>GET YOUR</h2>
          <h4>Gateway to Gadgets Galore.</h4>
        </div>

        <div className="offer-card">
          <p>Special</p>
          <p>Offers For You ! ! !</p>
          <strong>CODE!@!$</strong>
        </div>
      </section>

      <h1>
        Latest Product
        <Link className="findmore" to="/search">
          More
        </Link>
      </h1>

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
