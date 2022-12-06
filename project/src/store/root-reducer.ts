import { combineReducers } from '@reduxjs/toolkit';
import NameSpace from '../types/name-space';
import applicationData from './application-data/application-data';
import userProcess from './user-process/user-process';
import { applicationProcess } from './application-process/application-process';

const rootReducer = combineReducers({
  [NameSpace.Data]: applicationData.reducer,
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Application]: applicationProcess.reducer
});

export default rootReducer;
