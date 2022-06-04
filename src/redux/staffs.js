import * as ActionTypes from './ActionTypes';

export const Staffs = (state = {
    isLoading : true,
    errMess: null,
    staffs: []
}, action) =>{
    switch (action.type){
        case ActionTypes.ADD_STAFFS:
            return {...state, isLoading:false, errMess: null, staffs: action.payload}
        case ActionTypes.STAFFS_LOADING:
            return {...state, isLoading:true, errMess: null, staffs:[]}
        case ActionTypes.STAFFS_FAILED:
            return {...state, isLoading:false, errMess: action.payload, staffs:[]}
        case ActionTypes.ADD_STAFF:
            return {...state, isLoading:false, errMess: null, staffs: action.payload}
        case ActionTypes.DELETE_STAFF_LOADING:
            return {...state, isLoading:true, errMess: null, staffs:[]}
        case ActionTypes.DELETE_STAFF_SUCCESS:
            const filteredStaff = state.staffs.filter((staff)=>staff.id !== action.payload)
            return {...state, isLoading:false, errMess: null, staffs:filteredStaff}
        case ActionTypes.UPDATE_STAFF_SUCCESS:
            return {...state, isLoading:false, errMess: null, staffs: action.payload}
        case ActionTypes.UPDATE_STAFF_LOADING:
            return {...state, isLoading:true, errMess: null, staffs:[]}
        default:
            return state
    }
}