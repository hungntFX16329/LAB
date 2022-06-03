import React from 'react';
import { Breadcrumb, BreadcrumbItem, CardText, CardTitle, Button} from 'reactstrap';
import { Link } from 'react-router-dom';
import dateFormat from 'dateformat';
import { Loading } from './LoadingComponent';

function RenderStaff({staff}){
    return(
        <div className="col-12">
            <div className="row">
                <div className="col-3 col-md-4">
                    <img width="100%" src={staff.image} alt={staff.name} />
                </div>
                <div className="col-9 col-md-8">
                    <CardTitle>Họ và tên: {staff.name}</CardTitle>
                    <CardText>Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}</CardText>
                    <CardText>Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}</CardText>
                    <CardText>Phòng ban: {staff.departmentId}</CardText>
                    <CardText>Số ngày nghỉ còn lại: {staff.annualLeave}</CardText>
                    <CardText>Số ngày đã làm thêm: {staff.overTime}</CardText>
                    <Button outline>
                        <span className="fa fa-pencil">  Sửa thông tin</span>
                    </Button>
                    <Button outline>
                        <span className="fa fa-trash">  Xoá nhân viên</span>
                    </Button> 
                </div>
            </div>
        </div>
    );
}


const StaffDetail = (props)=>{
   
    if(props.isLoading) {
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        )
    }
    else if (props.errMess){
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        )
    }
    else
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