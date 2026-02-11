"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../../redux/slice/authSlice";
import { RootState } from "../../../../redux/store";
import { useRouter } from "next/navigation";
import "./card.css";


function Card({ dish }: { dish: any }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.currentUser);
  console.log('sdsfsd',dish)

  return (
    <div className="card">

      <img src={dish.image} alt={dish.dishname} className="card-img" />

      <div className="container">
        <h4><b>{dish.dishname}</b></h4>
        <p>{dish.description}</p>
        <h2>₹{dish.price}</h2>
      </div>
    
        <div className="button-group">
          {!dish.isAvailable ? (
            <button className="outStockButton" disabled>
              UnAvailable
            </button>
          ) : (
            <button className="addCartButton" onClick={() => dispatch(addToCart(dish))}>
              Add To Cart
            </button>
          )}

        </div>
      

    </div>
  );
}

export default Card;