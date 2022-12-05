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

export const fetchTheOffer = createAsyncThunk<Advert, number, ThunkApiConfig>('data/fetchTheOffer',
  async(id,{extra:api})=>{
    const theOfferUrl = `${AdditionalURL.Offers}/${id}`;
    const {data} = await api.get<Advert>(theOfferUrl);
    return data;
  });

export const fetchOffersNearby = createAsyncThunk<Advert[], number, ThunkApiConfig>('data/fetchOffersNearby',
  async(id, {extra:api})=>{
    const offersNearbyUrl = `${AdditionalURL.OffersNearbyPrefix}${id}${AdditionalURL.OffersNearbyPostfix}`;
    const {data} = await api.get<Advert[]>(offersNearbyUrl);
    return data;
  });

export const fetchComments = createAsyncThunk<Comment[], number, ThunkApiConfig>('data/fetchComments',
  async(id, {extra:api})=>{
    const commentsUrl = `${AdditionalURL.CommentsPrefix}${id}`;
    const {data} = await api.get<Comment[]>(commentsUrl);
    return data;
  });

export const sendComment = createAsyncThunk<Comment[], {hotelId:number; newComment:NewCommentData}, ThunkApiConfig>('data/sendComment',
  async({hotelId, newComment}, {dispatch, extra:api})=>{
    const makingCommentUrl = `${AdditionalURL.CommentsPrefix}${hotelId}`;
    const {data} = await api.post<Comment[]>(makingCommentUrl, newComment);
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
