import { configureMockStore } from '@jedmao/redux-mock-store';
import { AnyAction } from 'redux';
import { State } from '../../types/state';
import redirect from './redirect';
import { redirectToRoute } from '../actions';
import AppRoute from '../../types/app-route';

const fakeHistory = {
  location: {
    pathname: ''
  },
  push(path:string){
    this.location.pathname = path;
  }
};

jest.mock('../../services/browser-history', () => fakeHistory);

const middlewares = [redirect];
const mockStore = configureMockStore<State, AnyAction>(middlewares);
const store = mockStore();

describe('Middleware: redirect', ()=>{

  beforeEach(()=>fakeHistory.push(''));

  it('should redirect to "/"', ()=>{
    store.dispatch(redirectToRoute(AppRoute.Main));
    expect(fakeHistory.location.pathname).toBe(AppRoute.Main);
    expect(store.getActions()).toEqual([
      redirectToRoute(AppRoute.Main)
    ]);
  });

  it('should not redirect to anywhere when action is unknown', ()=>{
    store.dispatch({type: 'UNKNOWN_ACTION', payload: AppRoute.Main});
    expect(fakeHistory.location.pathname).not.toBe(AppRoute.Main);
  });

});

