import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchdishes } from '../../services/dishApi'

export const loadProducts = createAsyncThunk(
  'products/load',
  async (props: { offset: number; dishname: string; restaurantId: string }) => {

    console.log('comming in this ')
    return await fetchdishes(props.offset, 10, props.dishname, props.restaurantId)
  }
)
interface DishState {
  dishes: any[]
  loading: boolean
  error: string | null
  offset: number
  hasMore: boolean
  dishname: string
  category: string
}

const initialState: DishState = {
  dishes: [],
  loading: false,
  error: null,
  offset: 0,
  hasMore: true,
  dishname: '',
  category: ''
}

const dishSlice = createSlice({
  name: 'dishes',
  initialState,
  reducers: {
    setSearch(state, action) {
      state.dishname = action.payload
      state.dishes = []
      state.offset = 0
      state.hasMore = true
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadProducts.pending, (state) => {
      state.loading = true
    })
    builder.addCase(loadProducts.fulfilled, (state, action) => {
      console.log('action payload',action.payload)
      state.loading = false
      const list = action.payload || []

      const existingIds = new Set(state.dishes.map(p => p.id))
      const newItems = list.filter((item:any) => !existingIds.has(item.id))

      state.dishes.push(...newItems)
      state.offset += 10
      if (list.length < 10) state.hasMore = false
    })
    builder.addCase(loadProducts.rejected, (state, action) => {
      state.loading = false
      state.error = String(action.error)
    })
  }
})

export const { setSearch } = dishSlice.actions
export default dishSlice.reducer


