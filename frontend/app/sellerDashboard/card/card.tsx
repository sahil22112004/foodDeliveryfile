"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useRouter } from "next/navigation";
import "./card.css";
import { changeisAvailabledish, deleteProduct } from "@/app/services/dishApi";


function Card({ dish, fetchsellerDishes }: { dish: any, fetchsellerDishes: any }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.currentUser);
  console.log('sdsfsd', dish)


  const handleDeletedish = async (id: any) => {

    try {
      await deleteProduct(id)
      fetchsellerDishes()

    } catch (error: any) {
      console.log(error)
    }
  }

  const handleisAvalaibale = async (id:any,isAvailable:boolean)=>{
    console.log('werwerewr',isAvailable)
    try{

      await changeisAvailabledish(id,!isAvailable)
      fetchsellerDishes()

    }catch(error){
      console.log(error)

    }

  }

  return (
    <div className="card">

      <img src={dish.image} alt={dish.productName} className="card-img" />

      <div className="container">
        <h4><b>{dish.dishname}</b></h4>
        <p>{dish.description}</p>
        <h2>₹{dish.price}</h2>
      </div>

      <div className="button-group">
        <button className="availableButton" onClick={()=>handleisAvalaibale(dish?.id,dish?.isAvailable)} >
          {dish.isAvailable ? 'UnAvailable' : 'Available'}
        </button>
        <button className="deleteButton" onClick={() => handleDeletedish(dish?.id)}>
          Delete
        </button>
        <button className="editbutton">
          Edit
        </button>

      </div>


    </div>
  );
}

export default Card;