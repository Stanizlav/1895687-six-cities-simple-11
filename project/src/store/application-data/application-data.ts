import { createSlice } from '@reduxjs/toolkit';
import NameSpace from '../../types/name-space';
import { fetchOffers, fetchTheOffer, sendComment } from '../thunk-actions';
import { ApplicationData } from '../../types/state';


const initialState: ApplicationData = {
  offers: [],
  offer: null,
  offersNearby: [],
  comments: [],
  isLoading: false,
  isSending: false
};

const applicationData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers:{},
  extraReducers(builder){
    builder
      .addCase(fetchOffers.pending, (state)=>{
        state.isLoading = true;
      })
      .addCase(fetchOffers.rejected, (state)=>{
        state.isLoading = false;
      })
      .addCase(fetchOffers.fulfilled, (state, action)=>{
        state.offers = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchTheOffer.pending, (state)=>{
        state.isLoading = true;
      })
      .addCase(fetchTheOffer.rejected, (state)=>{
        state.isLoading = false;
      })
      .addCase(fetchTheOffer.fulfilled, (state, action)=>{
        state.offer = action.payload.offer;
        state.offersNearby = action.payload.offersNearby;
        state.comments = action.payload.comments;
        state.isLoading = false;
      })
      .addCase(sendComment.pending, (state)=>{
        state.isSending = true;
      })
      .addCase(sendComment.fulfilled, (state, action)=>{
        state.comments = action.payload;
        state.isSending = false;
      });
  }
});

export default applicationData;
