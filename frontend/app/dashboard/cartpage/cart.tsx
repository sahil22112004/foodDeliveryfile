"use client";

import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../redux/store";
import {
  incrementQuantity,
  decrementQuantity,
  clearCart,
} from "../../redux/slice/authSlice";
import { useRouter } from "next/navigation";
import "./cart.css";
import { useSnackbar } from "notistack";

export default function CartPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { enqueueSnackbar } = useSnackbar();

  const cart = useSelector((state: RootState) => state.auth.cart) || [];
  console.log(cart,'cart is ')

  const totalAmount = cart.reduce(
    (sum: number, item: any) => sum + Number(item.price) * Number(item.quantity),
    0
  );

  const handleCheckout = () => {
    if (cart.length === 0) {
      enqueueSnackbar("Cart is empty!", { variant: "warning" });
      return;
    }

    enqueueSnackbar("Order placed successfully!", { variant: "success" });
    dispatch(clearCart());
    // router.push("/dashboard/trackorder");
  };

  return (
    <div className="cart-wrapper">
      <div className="cart-header">
        <button onClick={() => router.push("/dashboard")}>Home</button>
        <h2>Food Cart</h2>
        <button >
          Track Orders
        </button>
      </div>

      {cart.length > 0 ? (
        <div className="cart-container">
          <div className="cart-items">
            {cart.map((item: any) => {


              return (
                <div className="cart-item" key={item.id}>
                  <img
                    src={item.image}
                    alt={item.dishname || "Dish"}
                    className="cart-img"
                  />

                  <div className="cart-info">
                    <h3>{item.dishname}</h3>
                    <p>{item.description}</p>

                    <p className="cart-price">₹{item.price}</p>

                    <div className="qty-controls">
                      <button
                        onClick={() => dispatch(decrementQuantity(item.id))}
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() => dispatch(incrementQuantity(item.id))}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="cart-summary">
            <h3>Total: ₹{totalAmount.toFixed(2)}</h3>

            <button className="checkout-btn" onClick={handleCheckout}>
              Place Order
            </button>
          </div>
        </div>
      ) : (
        <div className="cart-empty">
          <h2>Your Cart is Empty</h2>
          <button onClick={() => router.push("/dashboard")}>Go to Home</button>
        </div>
      )}
    </div>
  );
}
