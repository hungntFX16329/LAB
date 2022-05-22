import React, { useState }from "react";
import { Card, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from 'react-router-dom';

function BangLuong(props){
    let [hesoluong,sethesoluong] = useState(false)
    let bangluong = props.salary
    .sort((a,b)=> hesoluong ? a.salaryScale - b.salaryScale : b.salaryScale - a.salaryScale)
    .map((staff)=>{
        return(
            <div key={staff.id} className="col-12 col-md-6 col-lg-4 mt-2 mb-2">
                <Card>
                    <CardTitle>{staff.name}</CardTitle>
                    <CardBody>
                        <CardText>Mã nhân viên: {staff.id}</CardText>
                        <CardText>Hệ số lương: {staff.salaryScale}</CardText>
                        <CardText>Số ngày làm thêm: {staff.overTime}</CardText>
                        <CardText className="bg-light p-2 shadow">
                            Lương: {Math.round(staff.salaryScale*3000000 + staff.overTime*200000)}
                        </CardText>
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

            <button className="btn btn-primary" onClick={()=> sethesoluong(!hesoluong)}>
                Sắp xếp theo hệ số lương
            </button>

            <div className="row shadow mb-3">
                {bangluong}
            </div>
        </div>
    )
}

export default BangLuong;