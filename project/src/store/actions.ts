import { createAction } from '@reduxjs/toolkit';
import { REDIRECT_ACTION_TYPE } from '../consts/consts';
import AppRoute from '../types/app-route';

export const redirectToRoute = createAction<AppRoute>(REDIRECT_ACTION_TYPE);
