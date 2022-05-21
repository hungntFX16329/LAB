import React from "react";
import { Card, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from 'react-router-dom';

function BangLuong(props){
    let bangluong = props.salary.map((staff)=>{
        return(
            <div key={staff.id} className="col-md-6 col-lg-4 mt-2">
                <Card>
                    <CardTitle>{staff.name}</CardTitle>
                    <CardBody>
                        <CardText>Mã nhân viên: {staff.id}</CardText>
                        <CardText>Hệ số lương: {staff.salaryScale}</CardText>
                        <CardText>Số ngày làm thêm: {staff.overTime}</CardText>
                        <CardText>Lương: {Math.round(staff.salaryScale*3000000 + staff.overTime*200000)}</CardText>
                    </CardBody>
                </Card>
            </div>
        )
    })
    return(
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/nhanvien'>Nhân viên</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Bảng lương</BreadcrumbItem>
                </Breadcrumb>
        </div>
            <div className="row mt-1 mb-2">
                {bangluong}
            </div>
        </div>
    )
}

export default BangLuong;