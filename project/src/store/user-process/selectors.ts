import { State } from '../../types/state';
import NameSpace from '../../types/name-space';
import AuthorisationStatus from '../../types/authorisation-status';

export const getUser = (state: State) => state[NameSpace.User].user;

export const isStatusAuthorised = (state:State) => state[NameSpace.User].authorisationStatus === AuthorisationStatus.Auth;
