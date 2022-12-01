import { createAsyncThunk, ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { removeToken, setToken } from '../services/token';
import { ceaseLoading, fillCommentsUp, fillOffersListUp, fillOffersNearbyListUp, redirectToRoute, setAuthorisationStatus, setConnectionUnsustainable, setTheOffer, setUser, startLoading } from '../store/actions';
import AdditionalURL from '../types/additional-url';
import Advert from '../types/advert';
import AppRoute from '../types/app-route';
import AuthData from '../types/auth-data';
import AuthorisationStatus from '../types/authorisation-status';
import Comment from '../types/comment';
import { AppDispatch, State} from '../types/state';
import User from '../types/user';

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

export const getTheOffer = createAsyncThunk<void, number, ThunkApiConfig>('offers/get-required-one',
  async(id,{dispatch, extra:api})=>{
    const theOfferUrl = `${AdditionalURL.Offers}/${id}`;
    await downloadOnTemplate<Advert|null>(dispatch, api, theOfferUrl, setTheOffer, null);
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

export const checkAuthorisation = createAsyncThunk<void, void, ThunkApiConfig>('user/check-authorisation',
  async(_args, {dispatch, extra:api})=>{
    try{
      const {data} = await api.get<User>(AdditionalURL.Login);
      dispatch(setAuthorisationStatus(AuthorisationStatus.Auth));
      dispatch(setUser(data));
    }
    catch{
      dispatch(setAuthorisationStatus(AuthorisationStatus.Unauth));
    }
  });

export const logIn = createAsyncThunk<void, AuthData, ThunkApiConfig>('user/log-in',
  async(body, {dispatch, extra:api})=>{
    const {data} = await api.post<User>(AdditionalURL.Login, body);
    const {token} = data;
    setToken(token);
    dispatch(setAuthorisationStatus(AuthorisationStatus.Auth));
    dispatch(setUser(data));
    dispatch(redirectToRoute(AppRoute.Main));
  });

export const logOut = createAsyncThunk<void, void, ThunkApiConfig>('user/log-out',
  async(_args, {dispatch, extra:api})=>{
    await api.delete(AdditionalURL.Logout);
    removeToken();
    dispatch(setAuthorisationStatus(AuthorisationStatus.Unauth));
    dispatch(setUser(null));
  });
