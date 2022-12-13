import { generateComment, generateComments, generateOffer, generateOffers } from '../../utils/mocks';
import { fetchOffers, fetchTheOffer, sendComment } from '../thunk-actions';
import applicationData from './application-data';

const initialState = applicationData.getInitialState();

describe('Reducer: applicationData',()=>{
  const MOCK_OFFERS_COUNT = 3;
  const MOCK_COMMENTS_COUNT = 2;

  it('without necessary parameters should return the initial state', ()=>{
    expect(applicationData.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should start loading if fetchOffers is pending', ()=>{
    expect(applicationData.reducer(initialState, fetchOffers.pending))
      .toEqual({...initialState, isLoading: true});
  });

  it('should stop loading if fetchOffers is rejected', ()=>{
    const state = {...initialState, isLoading: true};

    expect(applicationData.reducer(state, fetchOffers.rejected))
      .toEqual({...state, isLoading: false});
  });

  it('should stop loading and set the "offers" field in accordance with recieved offers if fetchOffers is fulfilled', ()=>{
    const state = {...initialState, isLoading: true};
    const recievedOffers = generateOffers(MOCK_OFFERS_COUNT);

    expect(applicationData.reducer(state, {type: fetchOffers.fulfilled.type, payload: recievedOffers}))
      .toEqual({...state, isLoading: false, offers: recievedOffers});
  });

  it('should start loading if fetchTheOffer is pending', ()=>{
    expect(applicationData.reducer(initialState, fetchTheOffer.pending))
      .toEqual({...initialState, isLoading: true});
  });

  it('should stop loading if fetchTheOffer is rejected', ()=>{
    const state = {...initialState, isLoading: true};

    expect(applicationData.reducer(state, fetchTheOffer.rejected))
      .toEqual({...state, isLoading: false});
  });

  it('should stop loading and set fields in accordance with recieved data if fetchTheOffer is fulfilled',()=>{
    const state = {...initialState, isLoading: true};
    const recievedOffer = generateOffer();
    const recievedOffersNearby = generateOffers(MOCK_OFFERS_COUNT);
    const recievedComments = generateComments(MOCK_COMMENTS_COUNT);
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

  it('should start sending if sendComment is pending',()=>{
    expect(applicationData.reducer(initialState, sendComment.pending))
      .toEqual({...initialState, isSending: true});
  });

  it('should stop sending and turn the "hasSendingError" on if sendComment is rejected',()=>{
    const state = {...initialState, isSending: true};
    expect(applicationData.reducer(state, sendComment.rejected))
      .toEqual({...state, isSending: false, hasSendingError: true});
  });

  it('should stop sending, turn the "hasSendingError" off and set the "comments" field in accordance with recieved data if sendComment is fulfilled',()=>{
    const previousComments = generateComments(MOCK_COMMENTS_COUNT);
    const state = {...initialState, isSending: true, comments: previousComments};
    const recievedComments = previousComments.concat(generateComment());

    expect(applicationData.reducer(state, {type: sendComment.fulfilled.type, payload: recievedComments}))
      .toEqual({...state, isSending: false, comments: recievedComments});
  });

});
