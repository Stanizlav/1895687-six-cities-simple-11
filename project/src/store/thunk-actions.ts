import { createAsyncThunk, ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { removeToken, setToken } from '../services/token';
import { ceaseLoading, fillCommentsUp, fillOffersListUp, fillOffersNearbyListUp, redirectToRoute, saveOffer, setAuthorisationStatus, setSending, setUser, startLoading } from '../store/actions';
import AdditionalURL from '../types/additional-url';
import Advert from '../types/advert';
import AppRoute from '../types/app-route';
import AuthData from '../types/auth-data';
import AuthorisationStatus from '../types/authorisation-status';
import Comment from '../types/comment';
import NewCommentData from '../types/new-comment-data';
import { AppDispatch, State} from '../types/state';
import User from '../types/user';

type ThunkApiConfig = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}

const downloadOnTemplate = async<PayloadType>(dispatch:AppDispatch, api:AxiosInstance, url: string, action: ActionCreatorWithPayload<PayloadType>) => {
  dispatch(startLoading());
  try{
    const {data} = await api.get<PayloadType>(url);
    dispatch(action(data));
  }
  finally{
    dispatch(ceaseLoading());
  }
};

export const getOffers = createAsyncThunk<void, void, ThunkApiConfig>('offers/get',
  async(_args, {dispatch, extra:api}) => {
    await downloadOnTemplate<Advert[]>(dispatch, api, AdditionalURL.Offers, fillOffersListUp);
  });

export const getTheOffer = createAsyncThunk<void, number, ThunkApiConfig>('offers/get-required-one',
  async(id,{dispatch, extra:api})=>{
    const theOfferUrl = `${AdditionalURL.Offers}/${id}`;
    await downloadOnTemplate<Advert|null>(dispatch, api, theOfferUrl, saveOffer);
  });

export const getOffersNearby = createAsyncThunk<void, number, ThunkApiConfig>('offers/get-nearby',
  async(id, {dispatch, extra:api}) => {
    const offersNearbyUrl = `${AdditionalURL.OffersNearbyPrefix}${id}${AdditionalURL.OffersNearbyPostfix}`;
    await downloadOnTemplate<Advert[]>(dispatch, api, offersNearbyUrl, fillOffersNearbyListUp);
  });

export const getComments = createAsyncThunk<void, number, ThunkApiConfig>('comments/get',
  async(id, {dispatch, extra:api})=>{
    const commentsUrl = `${AdditionalURL.CommentsPrefix}${id}`;
    await downloadOnTemplate<Comment[]>(dispatch, api, commentsUrl, fillCommentsUp);
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
  async(authData, {dispatch, extra:api})=>{
    const {data} = await api.post<User>(AdditionalURL.Login, authData);
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


export const makeComment = createAsyncThunk<void, {hotelId:number; newComment:NewCommentData}, ThunkApiConfig>('comments/make',
  async({hotelId, newComment}, {dispatch, extra:api})=>{
    const makingCommentUrl = `${AdditionalURL.CommentsPrefix}${hotelId}`;
    const {data} = await api.post<Comment[]>(makingCommentUrl, newComment);
    dispatch(fillCommentsUp(data));
    dispatch(setSending(false));
  });
