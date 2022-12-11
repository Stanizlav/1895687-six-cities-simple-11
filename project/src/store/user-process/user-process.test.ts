import AuthorisationStatus from '../../types/authorisation-status';
import { generateUser } from '../../utils/mocks';
import { checkAuthorisation, logIn, logOut } from '../thunk-actions';
import userProcess from './user-process';

const initialState = userProcess.getInitialState();

describe('Reducer: userProcess', ()=>{
  it('without necessary parameters should return the initial state', ()=>{
    expect(userProcess.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should set the "Unauth" status and reset the user if checkAuthorisation is rejected',()=>{
    expect(userProcess.reducer(initialState, checkAuthorisation.rejected))
      .toEqual({...initialState, authorisationStatus: AuthorisationStatus.Unauth, user: null});
  });

  it('should set the "Auth" status and the user if checkAuthorisation is fulfilled',()=>{
    const authorisedUser = generateUser();

    expect(userProcess.reducer(initialState, {type: checkAuthorisation.fulfilled.type, payload: authorisedUser}))
      .toEqual({...initialState, authorisationStatus: AuthorisationStatus.Auth, user: authorisedUser});
  });

  it('should set the "Unauth" status and reset the user if logIn is rejected',()=>{
    const state = {...initialState, authorisationStatus: AuthorisationStatus.Unauth};

    expect(userProcess.reducer(state, logIn.rejected))
      .toEqual({...state, authorisationStatus: AuthorisationStatus.Unauth, user: null});
  });

  it('should set the "Auth" status and the user if logIn is fulfilled',()=>{
    const authorisedUser = generateUser();
    const state = {...initialState, authorisationStatus: AuthorisationStatus.Unauth};

    expect(userProcess.reducer(state, {type: logIn.fulfilled.type, payload: authorisedUser}))
      .toEqual({...state, authorisationStatus: AuthorisationStatus.Auth, user: authorisedUser});
  });

  it('should set the "Unauth" status and reset the user if logOut is fulfilled',()=>{
    const authorisedUser = generateUser();
    const state = {...initialState, authorisationStatus: AuthorisationStatus.Auth, user: authorisedUser};

    expect(userProcess.reducer(state, logOut.fulfilled))
      .toEqual({...state, authorisationStatus: AuthorisationStatus.Unauth, user: null});
  });

});
