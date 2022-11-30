import { Middleware, PayloadAction } from '@reduxjs/toolkit';
import { REDIRECT_ACTION_TYPE } from '../../consts';
import browserHistory from '../../services/browser-history';

const redirect: Middleware = (store)=>(nextDispatch)=>(action: PayloadAction<string>)=>{
  if(action.type === REDIRECT_ACTION_TYPE){
    browserHistory.push(action.payload);
  }
  nextDispatch(action);
};

export default redirect;
