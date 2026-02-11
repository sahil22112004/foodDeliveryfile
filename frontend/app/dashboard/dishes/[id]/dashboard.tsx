"use client";

import { useEffect, useState } from "react";
import "./dashboard.css";
import Card from "./card/card";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../../redux/store";
import { loadProducts, setSearch } from "../../../redux/slice/dishSlice";
import { useRouter } from "next/navigation";
import { logout } from "../../../redux/slice/authSlice";

type DashboardProps = {
  restaurantId: string;
};

function Dashboard({ restaurantId }: DashboardProps) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { dishes, loading, hasMore, offset, dishname } = useSelector(
    (state: RootState) => state.dish
  );

  const [searchInput, setSearchInput] = useState(dishname);

  useEffect(() => {
    if (!restaurantId) return;

    dispatch(loadProducts({ offset: 0, dishname: "", restaurantId }));
  }, [restaurantId, dispatch]);

  useEffect(() => {
    if (!restaurantId) return;

    const handler = setTimeout(() => {
      dispatch(setSearch(searchInput));
      dispatch(loadProducts({ offset: 0, dishname: searchInput, restaurantId }));
    }, 800);

    return () => clearTimeout(handler);
  }, [searchInput, restaurantId, dispatch]);

  const loadMore = () => {
    if (!loading && hasMore) {
      dispatch(loadProducts({ offset, dishname, restaurantId }));
    }
  };

  useEffect(() => {
    const onScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
        loadMore();
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [offset, dishname, loading, hasMore, restaurantId]);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/auth/login");
  };

  return (
    <>
      <header className="navbar">
        <h2 className="nav-logo">Food App</h2>

        <div className="nav-center">
          <input
            type="text"
            placeholder="Search dishes..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="nav-search"
          />
        </div>

        <div className="nav-right">
          <button onClick={()=>router.push("/dashboard")}>Home</button>

          <button onClick={() => router.push("/dashboard/cartpage")}>Cart</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <main>
        {dishes.length ? (
          dishes.map((dish: any) => <Card key={dish.id} dish={dish} />)
        ) : (
          <p style={{ textAlign: "center" }}>
            {loading ? "Loading..." : "No dishes found"}
          </p>
        )}
      </main>

      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}

      {!hasMore && dishes.length > 0 && (
        <p style={{ textAlign: "center" }}>No more dishes</p>
      )}

      <footer className="footer">food site</footer>
    </>
  );
}

export default Dashboard;
