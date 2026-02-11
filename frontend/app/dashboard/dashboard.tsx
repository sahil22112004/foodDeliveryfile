'use client'

import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../redux/store'
import { useEffect, useState } from 'react'
import { apiGetAllRestaurent } from '../services/restaurentApi'
import { useRouter } from 'next/navigation'
import './dashboard.css'
import { logout } from '../redux/slice/authSlice'

export default function dashboard() {
  const dispatch = useDispatch()

  const router = useRouter()

  const [restaurents, setRestaurent] = useState<any>([])
  useEffect(() => {
    const getRestaurant = async () => {
      const data = await apiGetAllRestaurent()
      setRestaurent(data)
    }
    getRestaurant()
  }, [])


  const { currentUser, error } = useSelector((state: RootState) => state.auth)
  const user = currentUser ? currentUser : ''
  
  const handleLogout = () => {
      dispatch(logout());
      router.push("/auth/login");
    };


  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>

        <input type="text" placeholder="Search restaurants..." />
        <p className="dashboard-user">Welcome, {currentUser?.username}</p>
        <button onClick={() => router.push("/dashboard/cartpage")} className='cartButton'>Cart</button>
        <button onClick={handleLogout} className='logoutButton'>Logout</button>
      </header>



      <div className="restaurant-grid">
        {restaurents.map((restaurent: any) => {
          return (
            <div className="restaurant-card" key={restaurent.id}>
              <img src={restaurent.image} alt="restaurant" />
              <div className="restaurant-card-content">
                <h3>{restaurent.restaurantname}</h3>
                <p>{restaurent.description}</p>
                <button
                  onClick={() =>
                    router.push(`/dashboard/dishes/${restaurent.id}`)
                  }
                >
                  Order from this restaurant
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}


