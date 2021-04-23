import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import { AddNewItem } from "../../Redux/Action/CartAction";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

function AddNewItems(props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const dispatch = useDispatch();

  // Submit Form
  const handleSubmitForm = async () => {
    if (name === "" || price === "" || imageUrl === "") {
      alert("please inset all the field");
    } else {
      try {
        const FormValue = { name: name, price: price, img: imageUrl };
        const config = {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(FormValue),
        };
        let response = await fetch("http://localhost:3000/items", config);
        response = await response.json();
        dispatch(AddNewItem(response));
        setPrice("");
        setName("");
        setImageUrl("");
        toast("New Item Added Successfully!", {
          type: "success",
        });
        props.history.push("/");
      } catch (error) {
        toast("Oops there is some error!", {
          type: "error",
        });
      }
    }
  };

  return (
    <div className="form-container">
      <div className="header">
        <h3>Add New Items</h3>
      </div>
      <form>
        <div className="input-row">
          <TextField
            id="outlined-helperText"
            className="input-class"
            required
            onChange={(e) => {
              setName(e.target.value);
            }}
            label="Product-Name"
            name="name"
            value={name}
            placeholder="Enter Value..."
            variant="outlined"
          />
        </div>

        <div className="input-row">
          <TextField
            type="number"
            id="outlined-helperText"
            className="input-class"
            required
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            label="Product-Price"
            name="price"
            value={price}
            placeholder="Enter Value..."
            variant="outlined"
          />
        </div>

        <div className="input-row">
          <TextField
            type="text"
            id="outlined-helperText"
            className="input-class"
            required
            onChange={(e) => {
              setImageUrl(e.target.value);
            }}
            label="Image-Url"
            name="imageUrl"
            value={imageUrl}
            placeholder="Enter Value..."
            variant="outlined"
          />
        </div>
        <div className="input-row">
          <Button
            variant="contained"
            component="span"
            color="primary"
            onClick={handleSubmitForm}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddNewItems;
