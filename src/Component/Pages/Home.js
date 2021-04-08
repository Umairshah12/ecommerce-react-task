import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div className="form-container">
      <div className="buttons">
        <Link to="/product-list" className="links">
          <Button variant="contained" color="primary">
            VIEW LIST
          </Button>
        </Link>

        <Link to="/checkout-item" className="links">
          <Button variant="contained" color="primary">
            CHECKOUT
          </Button>
        </Link>

        <Link to="/add-new-item" className="links">
          <Button variant="contained" color="primary">
            ADD NEW ITEMS
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
