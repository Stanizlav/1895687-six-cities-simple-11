import { createSlice } from '@reduxjs/toolkit';
import { UserProcess } from '../../types/state';
import AuthorisationStatus from '../../types/authorisation-status';
import NameSpace from '../../types/name-space';
import { checkAuthorisation, logIn, logOut } from '../thunk-actions';

const initialState:UserProcess = {
  authorisationStatus: AuthorisationStatus.Unknown,
  user: null
};

const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers:{},
  extraReducers(builder) {
    builder
      .addCase(checkAuthorisation.rejected ,(state)=>{
        state.authorisationStatus = AuthorisationStatus.Unauth;
        state.user = null;
      })
      .addCase(checkAuthorisation.fulfilled ,(state, action)=>{
        state.authorisationStatus = AuthorisationStatus.Auth;
        state.user = action.payload;
      })
      .addCase(logIn.rejected ,(state)=>{
        state.authorisationStatus = AuthorisationStatus.Unauth;
        state.user = null;
      })
      .addCase(logIn.fulfilled ,(state, action)=>{
        state.authorisationStatus = AuthorisationStatus.Auth;
        state.user = action.payload;
      })
      .addCase(logOut.fulfilled, (state)=>{
        state.authorisationStatus = AuthorisationStatus.Unauth;
        state.user = null;
      });
  }
});

export default userProcess;
