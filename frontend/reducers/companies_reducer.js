import {RECEIVE_COMPANY, RECEIVE_COMPANIES} from '../actions/company_actions';
import { merge } from 'lodash';

const companyReducer = (state={}, action) => {
    Object.freeze(state);
    switch (action.type){
        case RECEIVE_COMPANY:
            return merge( {}, state, {[action.company.id]: action.company})
        case RECEIVE_COMPANIES:
            return merge( {}, state, action.companies)
        default: return state;
    }
}

export default companyReducer;