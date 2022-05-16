import React, { Component } from 'react';
import { Card, CardText, CardBody, CardTitle } from 'reactstrap';
import { DEPARTMENTS } from '../shared/staffs';
import dateFormat from 'dateformat';

class StaffList extends Component {

    constructor(props){
        super(props);

        this.state = {
            selectedStaff: null,
            department: DEPARTMENTS,
        }
    }
    onDishSeclect(staff){
        this.setState({ selectedStaff: staff});
    }
    
    renderDish(staff){
        if (staff !=null){
            return(
                    <div className="col-12 col-md-5 col-lg-3 m-1 float-left">
                        <Card>
                            <CardBody>
                                <CardTitle><h5>Họ và tên: {staff.name}</h5></CardTitle>
                                <CardText>Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}</CardText>
                                <CardText>Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}</CardText>
                                <CardText>Phòng ban: {staff.department.name}</CardText>
                                <CardText>Số ngày nghỉ còn lại: {staff.annualLeave}</CardText>
                                <CardText>Số ngày đã làm thêm: {staff.overTime}</CardText>
                            </CardBody>
                        </Card>
                    </div> 
            )
        }
        else {
            return(
                <div></div>
            )
        }
    }
   
    render(){
        const menu=this.props.staffs.map((staff)=>{
            return (
                <div key={staff.id} className="col-12 col-md-5 col-lg-3 m-1">
                    <Card onClick={()=>this.onDishSeclect(staff)}>
                            <CardTitle>{staff.name}</CardTitle>
                    </Card>
                </div>
            )
            
        });
    
        return (
            <div className="container">
                <div className="row">
                    {menu}
                </div>
                <div className="row">
                    Bấm vào tên nhân viên để xem thông tin
                </div>
                <div className="row">
                    {this.renderDish(this.state.selectedStaff)}
                </div>
            </div>
        );
        
    }
}

export default StaffList;