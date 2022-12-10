import { generateComment, generateComments, generateOffer, generateOffers } from '../../utils/mocks';
import { fetchOffers, fetchTheOffer, sendComment } from '../thunk-actions';
import applicationData from './application-data';

const initialState = applicationData.getInitialState();

describe('Reducer: applicationData',()=>{
  it('without necessary parameters should return the initial state', ()=>{
    expect(applicationData.reducer(undefined, {type: 'UNKNOWN_TYPE'}))
      .toEqual(initialState);
  });

  it('with the "fetchOffers.pending" action should start loading', ()=>{
    expect(applicationData.reducer(initialState, fetchOffers.pending))
      .toEqual({...initialState, isLoading: true});
  });

  it('with the "fetchOffers.rejected" action should stop loading', ()=>{
    const state = {...initialState, isLoading: true};
    expect(applicationData.reducer(state, fetchOffers.rejected))
      .toEqual({...state, isLoading: false});
  });

  it('with the "fetchOffers.fulfilled" action should stop loading and set the "offers" field in accordance with recieved offers', ()=>{
    const state = {...initialState, isLoading: true};
    const recievedOffers = generateOffers(3);
    expect(applicationData.reducer(state, {type: fetchOffers.fulfilled.type, payload: recievedOffers}))
      .toEqual({...state, isLoading: false, offers: recievedOffers});
  });

  it('with the "fetchTheOffer.pending" action should start loading', ()=>{
    expect(applicationData.reducer(initialState, fetchTheOffer.pending))
      .toEqual({...initialState, isLoading: true});
  });

  it('with the "fetchTheOffer.rejected" action should stop loading', ()=>{
    const state = {...initialState, isLoading: true};
    expect(applicationData.reducer(state, fetchTheOffer.rejected))
      .toEqual({...state, isLoading: false});
  });

  it('with the "fetchTheOffer.fulfilled" action should stop loading and set fields in accordance with recieved data',()=>{
    const state = {...initialState, isLoading: true};
    const recievedOffer = generateOffer();
    const recievedOffersNearby = generateOffers(3);
    const recievedComments = generateComments(2);
    const action = {
      type: fetchTheOffer.fulfilled.type,
      payload: {
        offer: recievedOffer,
        offersNearby: recievedOffersNearby,
        comments: recievedComments
      }
    };

    expect(applicationData.reducer(state,action))
      .toEqual({
        ...state,
        isLoading: false,
        offer: recievedOffer,
        offersNearby: recievedOffersNearby,
        comments: recievedComments
      });
  });

  it('with the "sendComment.pending" action should start sending',()=>{
    expect(applicationData.reducer(initialState, sendComment.pending))
      .toEqual({...initialState, isSending: true});
  });

  it('with the "sendComment.fulfilled" action should stop sending and set the "comments" field in accordance with recieved comments',()=>{
    const previousComments = generateComments(2);
    const state = {...initialState, isSending: true, comments: previousComments};
    const recievedComments = previousComments.concat(generateComment());
    expect(applicationData.reducer(state, {type: sendComment.fulfilled.type, payload: recievedComments}))
      .toEqual({...state, isSending: false, comments: recievedComments});
  });

});
