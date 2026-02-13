import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiLogin,
  apiRegister,
} from '../../services/authApi';

export interface User {
  id?: number | string;
  email: string;
  username?: string;
  role:string
}

interface AuthState {
  currentUser: User | null;
  cart:any;
  loading: boolean;
  error: string | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  currentUser: null,
  cart:[],
  loading: false,
  error: null,
  isLoggedIn: false,
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async (user: any, {rejectWithValue }) => {
    console.log('in redux',user)
    try {
      return await apiLogin(user);
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (user: any, { rejectWithValue }) => {
    console.log(user)
    try {
      return await apiRegister(user);
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      state.isLoggedIn = false;
      state.error = null;
    },
    addToCart: (state, action) => {
      console.log('comming in yhis ',action.payload)
      const product = action.payload;
      const existingItem = state.cart?.find((item: any) => item.id === product.id);

      if (existingItem) {
        console.log('in this aiso jaoij')
        existingItem.quantity += 1;
      } else {
        console.log('coming in else')
        state.cart = state.cart.filter((dish:any)=>dish.restaurantId==action.payload.restaurantId)
        state.cart?.push({...product, quantity: 1});
      }
      console.log("CART AFTER:",state.cart);
    },

    incrementQuantity: (state, action) => {
      const item = state.cart?.find((item: any) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },

    decrementQuantity: (state, action) => {
      const item = state.cart?.find((item: any) => item.id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          console.log('in this cart')
          state.cart = state.cart?.filter((x: any) => x.id !== action.payload);
        }
      }
    },

    clearCart :(state)=>{
      state.cart=[]
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state,action:any) => {
        console.log('in action payload',action.payload)
        state.loading = false;
        state.currentUser = action.payload;
        state.isLoggedIn = true;
        state.error=null
      })
      .addCase(loginUser.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })


      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout,addToCart ,incrementQuantity,decrementQuantity,clearCart} = authSlice.actions;
export default authSlice.reducer;
