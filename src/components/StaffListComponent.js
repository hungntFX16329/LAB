import React, { Component } from 'react';
import { Card, CardImg , CardText, CardBody, CardTitle, Alert } from 'reactstrap';
import { DEPARTMENTS } from '../shared/staffs';
import dateFormat from 'dateformat';

class StaffList extends Component {

    constructor(props){
        super(props);

        this.state = {
            selectedStaff: null,
            department: DEPARTMENTS,
            columnDefault: "col-12 col-md-5 col-lg-3 m-1"
        }
    }
    onStaffSeclect(staff){
        this.setState({ selectedStaff: staff});
    }
    onColumnSelect(col){
        this.setState({columnDefault: col})
    }
    renderStaff(staff){
        if (staff !=null){
            return(
                    <div className="col-12">
                        <Card>
                            <CardImg width="100%" src={staff.image} alt={staff.name} />
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
                <div key={staff.id} className={this.state.columnDefault}>
                    <Card onClick={()=>this.onStaffSeclect(staff)} body color="light" className="rounded-3 shadow-sm">
                            <CardTitle className="text-center">{staff.name}</CardTitle>
                    </Card>
                </div>
            )
        });
        
        return (
            <div className="container">
                <div className='mt-3 mb-3'>
                    <button onClick={()=>this.onColumnSelect("col-md-2 mt-1")} type="button" className="btn btn-outline-primary mr-3">6 Cột</button>
                    <button onClick={()=>this.onColumnSelect("col-md-3 mt-1")} type="button" className="btn btn-outline-primary mr-3">4 Cột</button>
                    <button onClick={()=>this.onColumnSelect("col-md-4 mt-1")} type="button" className="btn btn-outline-primary mr-3">3 Cột</button>
                    <button onClick={()=>this.onColumnSelect("col-md-6 mt-1")} type="button" className="btn btn-outline-primary mr-3">2 Cột</button>
                    <button onClick={()=>this.onColumnSelect("col-md-12 mt-1")} type="button" className="btn btn-outline-primary mr-3">1 Cột</button>
                </div>
                <div className="row">
                    {menu}
                </div>
                
                <div className="row mt-3 mb-3 ml-1">
                    <Alert color="primary">
                        Bấm vào tên nhân viên để xem thông tin
                    </Alert>
                </div>
                
                <div className="row">
                    {this.renderStaff(this.state.selectedStaff)}
                </div>
            </div>
        );
        
    }
}

export default StaffList;