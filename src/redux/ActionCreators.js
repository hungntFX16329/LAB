import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';



export const postStaff = (name,doB,salaryScale,startDate,departmentId,annualLeave,overTime) => (dispatch)=> {
    
    const newStaff = {
        name : name,
        doB : doB,
        salaryScale : salaryScale,
        startDate: startDate,
        departmentId: departmentId,
        annualLeave: annualLeave,
        overTime: overTime
    }
    newStaff.image = '/assets/images/alberto.png';
    newStaff.salary = '5000000';

    return fetch(baseUrl + 'staffs', {
        method: 'POST',
        body: JSON.stringify(newStaff),
        headers : {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if(response.ok){
            return response;
        }
        else {
            var error = new Error('Error '+ response.status+ ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => dispatch(addStaff(response)))
    .catch(error => {console.log('Post new staff ', error.message)
        alert('New staff could not be posted\nError: '+error.message)})      
}

export const addStaff = (staff) =>({
    type: ActionTypes.ADD_STAFF,
    payload: staff
})

export const fetchStaffs = ()=> (dispatch) => {
    dispatch(staffsLoading(true));

    return fetch(baseUrl + 'staffs')
    .then(response => {
        if(response.ok){
            return response;
        }
        else {
            var error = new Error('Error '+ response.status+ ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(staffs => dispatch(addStaffs(staffs)))
    .catch(error => dispatch(staffsFailed(error.message)))
}

export const staffsLoading = ()=> ({
    type : ActionTypes.STAFFS_LOADING
})

export const staffsFailed = (errmess) => ({
    type : ActionTypes.STAFFS_FAILED,
    payload : errmess
})

export const addStaffs = (staffs)=>({
    type : ActionTypes.ADD_STAFFS,
    payload : staffs
})


export const fetchDeapartments = ()=> (dispatch) => {
    dispatch(departmentsLoading(true));

    return fetch(baseUrl + 'departments')
    .then(response => {
        if(response.ok){
            return response;
        }
        else {
            var error = new Error('Error '+ response.status+ ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(departments => dispatch(addDepartments(departments)))
    .catch(error => dispatch(departmentsFailed(error.message)))
}

export const departmentsLoading = ()=> ({
    type : ActionTypes.DEPARTMENTS_LOADING
})

export const departmentsFailed = (errmess) => ({
    type : ActionTypes.DEPARTMENTS_FAILED,
    payload : errmess
})

export const addDepartments = (departments)=>({
    type : ActionTypes.ADD_DEPARTMENTS,
    payload : departments
})