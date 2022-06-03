import React, { useState }from "react";
import { Card, CardText, CardBody, CardFooter, Breadcrumb, BreadcrumbItem, CardHeader } from "reactstrap";
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';

function BangLuong(props){

    if (props.salary.isLoading){
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        )
    }
    else if (props.salary.errMess){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h4>{props.salary.errMess}</h4>
                    </div>
                </div>
            </div>
        )
    }
    else {
        let [ma_nhan_vien,set_ma_nhan_vien] = useState(true)
        let bangluong = props.salary.salary
        .sort((a,b)=> ma_nhan_vien ? a.id - b.id : b.id - a.id)
        .map((staff)=>{
            return(
                <div key={staff.id} className="col-12 col-md-6 col-lg-4 mt-2 mb-2 rounded-3" color="light">
                    <Card>
                        <CardHeader className="text-center">{staff.name}</CardHeader>
                        <CardBody className="text-center">
                            <CardText>Mã nhân viên: {staff.id}</CardText>
                            <CardText>Hệ số lương: {staff.salaryScale}</CardText>
                            <CardText>Số ngày làm thêm: {staff.overTime}</CardText>
                        </CardBody>
                        <CardFooter className="text-center">
                            Lương: {staff.salary}
                        </CardFooter>
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
    
                <button className="btn btn-primary" onClick={()=> set_ma_nhan_vien(!ma_nhan_vien)}>
                    Sắp xếp theo mã nhân viên
                </button>
               
                <div className="row shadow mb-3">
                    {bangluong}
                </div>
            </div>
        )
    }

}

export default BangLuong;