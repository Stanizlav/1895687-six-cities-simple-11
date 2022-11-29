import { createAsyncThunk, ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ceaseLoading, fillCommentsUp, fillOffersListUp, fillOffersNearbyListUp, setConnectionUnsustainable, startLoading } from '../store/actions';
import AdditionalURL from '../types/additional-url';
import Advert from '../types/advert';
import Comment from '../types/comment';
import { AppDispatch, State} from '../types/state';

type ThunkApiConfig = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}

const downloadOnTemplate = async<PayloadType>(dispatch:AppDispatch, api:AxiosInstance, url: string, action: ActionCreatorWithPayload<PayloadType>, previousData:PayloadType) => {
  dispatch(startLoading());
  let currentData: PayloadType = previousData;
  try{
    const {data} = await api.get<PayloadType>(url);
    currentData = data;
  }
  catch{
    dispatch(setConnectionUnsustainable());
  }
  finally{
    dispatch(action(currentData));
    dispatch(ceaseLoading());
  }
};

export const getOffers = createAsyncThunk<void, void, ThunkApiConfig>('offers/get',
  async(_args, {dispatch, getState:state, extra:api}) => {
    const {offers} = state();
    await downloadOnTemplate<Advert[]>(dispatch, api, AdditionalURL.Offers, fillOffersListUp, offers);
  });

export const getOffersNearby = createAsyncThunk<void, number, ThunkApiConfig>('offers-nearby/get',
  async(id, {dispatch, getState:state, extra:api}) => {
    const offersNearbyUrl = `${AdditionalURL.OffersNearbyPrefix}${id}${AdditionalURL.OffersNearbyPostfix}`;
    const {offersNearby} = state();
    await downloadOnTemplate<Advert[]>(dispatch, api, offersNearbyUrl, fillOffersNearbyListUp, offersNearby);
  });

export const getComments = createAsyncThunk<void, number, ThunkApiConfig>('comments/get',
  async(id, {dispatch, getState:state, extra:api})=>{
    const commentsUrl = `${AdditionalURL.CommentsPrefix}${id}`;
    const {comments} = state();
    await downloadOnTemplate<Comment[]>(dispatch, api, commentsUrl, fillCommentsUp, comments);
  });
