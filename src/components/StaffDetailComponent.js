import React from 'react';
import { Breadcrumb, BreadcrumbItem, CardText, CardTitle} from 'reactstrap';
import { Link } from 'react-router-dom';
import dateFormat from 'dateformat';


function RenderStaff({staff}){
    return(
        <div className="col-12">
            <div className="row">
                <div className="col-3">
                    <img width="100%" src={staff.image} alt={staff.name} />
                </div>
                <div className="col-9">
                    <CardTitle>Họ và tên: {staff.name}</CardTitle>
                    <CardText>Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}</CardText>
                    <CardText>Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}</CardText>
                    <CardText>Phòng ban: {staff.department.name}</CardText>
                    <CardText>Số ngày nghỉ còn lại: {staff.annualLeave}</CardText>
                    <CardText>Số ngày đã làm thêm: {staff.overTime}</CardText>
                </div>
            </div>
        </div>
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
            <div className="row mb-3">
                <RenderStaff staff={props.staff[0]} />
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