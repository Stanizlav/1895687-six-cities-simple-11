import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { removeToken, saveToken } from '../services/token';
import { redirectToRoute } from '../store/actions';
import AdditionalURL from '../types/additional-url';
import Advert from '../types/advert';
import AppRoute from '../types/app-route';
import AuthData from '../types/auth-data';
import Comment from '../types/comment';
import NewCommentData from '../types/new-comment-data';
import { AppDispatch, State} from '../types/state';
import User from '../types/user';

type ThunkApiConfig = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}

export const fetchOffers = createAsyncThunk<Advert[], void, ThunkApiConfig>('data/fetchOffers',
  async(_args, {extra:api})=>{
    const {data} = await api.get<Advert[]>(AdditionalURL.Offers);
    return data;
  });

type OfferData = {
  offer: Advert;
  offersNearby: Advert[];
  comments: Comment[];
}

export const fetchTheOffer = createAsyncThunk<OfferData, number, ThunkApiConfig>('data/fetchTheOffer',
  async(id,{extra:api})=>{
    const theOfferUrl = `${AdditionalURL.Offers}/${id}`;
    const offerResponse = await api.get<Advert>(theOfferUrl);

    const offersNearbyUrl = `${AdditionalURL.OffersNearbyPrefix}${id}${AdditionalURL.OffersNearbyPostfix}`;
    const offersNearbyResponse = await api.get<Advert[]>(offersNearbyUrl);

    const commentsUrl = `${AdditionalURL.CommentsPrefix}${id}`;
    const commentsResponse = await api.get<Comment[]>(commentsUrl);

    return ({
      offer: offerResponse.data,
      offersNearby: offersNearbyResponse.data,
      comments: commentsResponse.data
    });
  });

export const sendComment = createAsyncThunk<Comment[], {hotelId:number; newComment:NewCommentData}, ThunkApiConfig>('data/sendComment',
  async({hotelId, newComment}, {dispatch, extra:api})=>{
    const sendingCommentUrl = `${AdditionalURL.CommentsPrefix}${hotelId}`;
    const {data} = await api.post<Comment[]>(sendingCommentUrl, newComment);
    return data;
  });

export const checkAuthorisation = createAsyncThunk<User, void, ThunkApiConfig>('user/checkAuthorisation',
  async(_args, {extra:api})=>{
    const {data} = await api.get<User>(AdditionalURL.Login);
    return data;
  });

export const logIn = createAsyncThunk<User, AuthData, ThunkApiConfig>('user/logIn',
  async(authData, {dispatch, extra:api})=>{
    const {data} = await api.post<User>(AdditionalURL.Login, authData);
    const {token} = data;
    saveToken(token);
    dispatch(redirectToRoute(AppRoute.Main));
    return data;
  });

export const logOut = createAsyncThunk<void, void, ThunkApiConfig>('user/logOut',
  async(_args, {extra:api})=>{
    await api.delete(AdditionalURL.Logout);
    removeToken();
  });
