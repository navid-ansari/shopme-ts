import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IProduct } from '../../types/Product'
import getProductDetail from '../../client-request/get-product-detail'
//import axios from 'axios'
import { getApiUrl } from '../../utils/get-api-url'
//import { axiosGet } from '../../utils/axios-rest-client'
//import { useParams } from 'react-router-dom'

const initialState: IProduct = {} as IProduct

//const productId = useParams().productId || ''

const productDetailsSlice = createSlice({
  name: 'clearProductDetails',
  initialState,
  reducers: {
    clearProductDetails: (state) => {
      return initialState
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getProductDetailsAsync.pending, () => {
      console.log('fetching product detail')
    }),
      builder.addCase(getProductDetailsAsync.fulfilled, (state, action: PayloadAction<IProduct>) => {
        console.log('promise fulfilled')
        return { ...action.payload }
      })
  }
})

export const getProductDetailsAsync = createAsyncThunk(
  'productDetails/getProductDetailsAsync',
  async ({ productId }: { productId: string }) => {
    const url = `${getApiUrl('productDetails')}/${productId}`
    //const response: any = await axiosGet(url) // working
    //const response: any = await axios.get<any>(url) // working
    const response: any = await getProductDetail(productId) // working
    return response.data
  }
)

/*{
  setProductDetails: (state, action: PayloadAction<IProduct>) => {
    return { ...action.payload }
  }
}*/
export const { clearProductDetails } = productDetailsSlice.actions

export default productDetailsSlice.reducer
