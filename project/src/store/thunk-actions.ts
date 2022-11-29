import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ceaseLoading, fillCommentsUp, fillOffersListUp, fillOffersNearbyListUp, setConnectionUnsustainable, startLoading } from '../store/actions';
import Advert from '../types/advert';
import Comment from '../types/comment';
import { AppDispatch, State} from '../types/state';

const OFFERS_URL = '/hotels';

type ThunkApiConfig = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}

export const getOffers = createAsyncThunk<void, void, ThunkApiConfig>('offers/get',
  async(_args, {dispatch, getState:state, extra:api}) => {
    dispatch(startLoading());
    let {offers} = state();
    try{
      const {data} = await api.get<Advert[]>(OFFERS_URL);
      offers = [...data];
    }
    catch{
      dispatch(setConnectionUnsustainable());
    }
    finally{
      dispatch(fillOffersListUp(offers));
      dispatch(ceaseLoading());
    }
  });

export const getOffersNearby = createAsyncThunk<void, number, ThunkApiConfig>('offers-nearby/get',
  async(id, {dispatch, getState:state, extra:api}) => {
    dispatch(startLoading());
    const offersNearbyUrl = `/hotels/${id}/nearby`;
    let {offersNearby} = state();
    try{
      const {data} = await api.get<Advert[]>(offersNearbyUrl);
      offersNearby = [...data];
    }
    catch{
      dispatch(setConnectionUnsustainable());
    }
    finally{
      dispatch(fillOffersNearbyListUp(offersNearby));
      dispatch(ceaseLoading());
    }
  });

export const getComments = createAsyncThunk<void, number, ThunkApiConfig>('comments/get',
  async(id, {dispatch, getState:state, extra:api}) => {
    dispatch(startLoading());
    const commentsUrl = `/comments/${id}`;
    let {comments} = state();
    try{
      const {data} = await api.get<Comment[]>(commentsUrl);
      comments = [...data];
    }
    catch{
      dispatch(setConnectionUnsustainable());
    }
    finally{
      dispatch(fillCommentsUp(comments));
      dispatch(ceaseLoading());
    }
  });
