import * as APIEntitiesUtil from '../util/entities_api_util';

export const RECEIVE_COMPANY = "RECEIVE_COMPANY";
export const RECEIVE_COMPANIES = "RECEIVE_COMPANIES";

const receiveCompany = company => {
    return {
        type: RECEIVE_COMPANY,
        company 
    }
}

const receiveCompanies = companies => {
    return {
        type: RECEIVE_COMPANIES,
        companies
    }
}

export const fetchCompanyInfo = id => dispatch => {
    return APIEntitiesUtil.fetchCompanyInfo(id)
        .then(resp => dispatch(receiveCompany(resp)))
}

export const fetchCompaniesInfo = () => dispatch => {
    return APIEntitiesUtil.fetchAllCompany()
        .then(resp => dispatch(receiveCompanies(resp)))
}

