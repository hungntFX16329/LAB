import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Media } from 'reactstrap';
import { Link } from 'react-router-dom';
import dateFormat from 'dateformat';


function RenderDish({staff}){
    return(
        <Media tag="li">
            <Media left middle className="col-md-3 col-lg-4 mt-1 mb-3">
                <img width="100%" src={staff.image} alt={staff.name} />
            </Media>
            <Media body className="col-md-9 col-lg-8 ml-5 mt-1">
                <Media heading>Họ và tên: {staff.name}</Media>
                <p>Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}</p>
                <p>Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}</p>
                <p>Phòng ban: {staff.department.name}</p>
                <p>Số ngày nghỉ còn lại: {staff.annualLeave}</p>
                <p>Số ngày đã làm thêm: {staff.overTime}</p>
            </Media>
        </Media>
    );
}


const StaffDetail = (props)=>{
    if(props.staff !=null)
        return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/nhanvien'>Nhân viên</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.staff[0].name}</BreadcrumbItem>
                </Breadcrumb>
        </div>
            <div className="row">
                <div className="col-12">
                    <RenderDish staff={props.staff[0]} />
                </div>
            </div> 
        </div>
    )
    else {
        return (
            <div></div>
        )
    }
    
}


export default StaffDetail; 