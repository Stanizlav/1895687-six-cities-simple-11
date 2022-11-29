// import { ThunkAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ceaseLoading, fillCommentsUp, fillOffersListUp, fillOffersNearbyListUp, setConnectionUnsustainable, startLoading } from '../store/actions';
import Advert from '../types/advert';
import Comment from '../types/comment';
import { AppDispatch, State } from '../types/state';

const OFFERS_URL = '/hotels';

export const getOffers = () => async (dispatch: AppDispatch, getState: ()=>State, api:AxiosInstance) => {
  dispatch(startLoading());
  let {offers} = getState();
  try{
    const {data} = await api.get<Advert[]>(OFFERS_URL);
    offers = [...data];
  }
  catch{
    dispatch(setConnectionUnsustainable());
  }
  finally{
    dispatch(fillOffersListUp({offers}));
    dispatch(ceaseLoading());
  }
};

export const getOffersNearby = (id:number) => async(dispatch: AppDispatch, getState: ()=>State, api: AxiosInstance) => {
  dispatch(startLoading());
  const offersNearbyUrl = `/hotels/${id}/nearby`;
  let {offersNearby} = getState();
  try{
    const {data} = await api.get<Advert[]>(offersNearbyUrl);
    offersNearby = [...data];
  }
  catch{
    dispatch(setConnectionUnsustainable());
  }
  finally{
    dispatch(fillOffersNearbyListUp({offers: offersNearby}));
  }
};

export const getComments = (id:number) => async(dispatch: AppDispatch, getState: ()=>State, api: AxiosInstance) => {
  const commentsUrl = `/comments/${id}`;
  let {comments} = getState();
  try{
    const {data} = await api.get<Comment[]>(commentsUrl);
    comments = [...data];
  }
  catch{
    dispatch(setConnectionUnsustainable());
  }
  finally{
    dispatch(fillCommentsUp({comments}));
  }
};
