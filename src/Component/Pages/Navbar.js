import React from "react";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";
import cartImg from "../assets/images/icon.png";
import { useSelector } from "react-redux";

function Navbar() {
  let cartItems = useSelector((state) => state.CartItemReducer.addedItems);
  return (
    <div className="nav app-color">
      <div className="main-container">
        <div className="nav-container">
          <div className="nav-left">
            <img src={cartImg} />
          </div>
          <Typography variant="h6" className="title">
            <Link to="/" className="icon-color m-1 app-heading">
              Ecommerce App
            </Link>
          </Typography>

          <div className="nav-right">
            <Link to="/checkout-item">
              <IconButton aria-label="cart">
                <Badge
                  className="badge"
                  badgeContent={ cartItems.length > 0 ? cartItems.length:  "0"}
                  color="secondary"
                >
                  <ShoppingCartIcon className="icon-color" />
                </Badge>
              </IconButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
