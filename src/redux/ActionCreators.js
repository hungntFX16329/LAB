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

export const deleteStaffSuccess = (id) =>({
    type: ActionTypes.DELETE_STAFF_SUCCESS,
    payload: id
})

export const deleteStaffLoading = () =>({
    type: ActionTypes.DELETE_STAFF_LOADING
})

export const deleteStaff = (id) => (dispatch)=> {
    alert('Are you sure ?')  
        return fetch(baseUrl + `staffs/${id}`,{
            method: 'DELETE'
        })
        .then(() => dispatch(deleteStaffSuccess(id)))
}

export const updateStaffSuccess = (staff) =>({
    type: ActionTypes.UPDATE_STAFF_SUCCESS,
    payload: staff
})

export const updateStaffLoading = () =>({
    type: ActionTypes.UPDATE_STAFF_LOADING
})

export const updateStaff = (staff) => (dispatch) => {
    return fetch(baseUrl + 'staffs',{
        method: 'PATCH',
        body: JSON.stringify(staff),
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
    .then(response => dispatch(updateStaffSuccess(response)))
    .catch(error => {console.log('Update staff ', error.message)
        alert('This staff could not be updated\nError: '+error.message)})
}

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

export const fetchSalary = ()=> (dispatch) => {
    dispatch(salaryLoading(true));

    return fetch(baseUrl + 'staffsSalary')
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
    .then(salary => dispatch(addSalary(salary)))
    .catch(error => dispatch(salaryFailed(error.message)))
}

export const salaryLoading = ()=> ({
    type : ActionTypes.SALARY_LOADING
})

export const salaryFailed = (errmess) => ({
    type : ActionTypes.SALARY_FAILED,
    payload : errmess
})

export const addSalary = (salary)=>({
    type : ActionTypes.ADD_SALARY,
    payload : salary
})