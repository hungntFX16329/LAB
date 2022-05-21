import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import dateFormat from 'dateformat';


function RenderDish({staff}){
    return(
        <Card>
            <CardImg width="100%" src={staff.image} alt={staff.name} />
            <CardBody>
                <CardTitle>Họ và tên: {staff.name}</CardTitle>
                <CardText>Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}</CardText>
                <CardText>Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}</CardText>
                <CardText>Phòng ban: {staff.department.name}</CardText>
                <CardText>Số ngày nghỉ còn lại: {staff.annualLeave}</CardText>
                <CardText>Số ngày đã làm thêm: {staff.overTime}</CardText>
            </CardBody>
        </Card>
    );
}


const StaffDetail = (props)=>{
    console.log(props);
    console.log(props.staff);
    console.log(props.staff[0].name);
    console.log(props.staff[0].department)
    if(props.staff !=null)
        return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/nhanvien'>Nhân viên</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.staff[0].name}</BreadcrumbItem>
                </Breadcrumb>
            <div className="col-12">
                <h3>{props.staff[0].name}</h3>
                <hr />
            </div>
        </div>
            <div className="row">
                <div className="col-12 col-md-5 m-1">
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