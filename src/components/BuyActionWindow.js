import { useState } from "react";
//import { Link } from "react-router-dom";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [message, setMessage] = useState("");
  const handleBuyClick = () => {
  axios.post("http://localhost:3002/newOrder", {
    name: uid,
    qty: stockQuantity,
    price: stockPrice,
    mode: "BUY",
  })
  .then(res => {
    setMessage(res.data); 
    GeneralContext.closeBuyWindow();
  })
  .catch(err => {
    setMessage("Order failed");
    console.log(err);
  });
};
<p>{message}</p>
  const handleCancelClick = () => {
    GeneralContext.closeBuyWindow();
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>

          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹140.65</span>
        <div>
          <button className="btn btn-blue" onClick={handleBuyClick}>
  Buy
</button>

          <button className="btn btn-grey" onClick={handleCancelClick}>
  Cancel
</button>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;