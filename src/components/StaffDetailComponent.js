import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, CardText, CardTitle,Col, Row,Label, Modal, ModalBody,ModalHeader} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm } from 'react-redux-form';
import dateFormat from 'dateformat';
import { Loading } from './LoadingComponent';

//const required = (val) => val && val.length;
//const maxLength = (len) => (val) => !(val) || (val.length <= len)
//const minLength = (len) => (val) => (val) && (val.length >= len)

class StaffDetail extends Component{
    constructor(props){
        super(props);
        //let a = this.props.department.filter((d)=>d.id === this.props.staff[0].departmentId)
        this.state={
            id: this.props.staff[0].id,
            name: this.props.staff[0].name,
            doB: this.props.staff[0].doB,
            salaryScale:this.props.staff[0].salaryScale,
            startDate:this.props.staff[0].startDate,
            department: this.props.staff[0].departmentId,
            annualLeave:this.props.staff[0].annualLeave,
            overTime:this.props.staff[0].overTime,
            image: "/assets/images/alberto.png"
        }
        this.handleSubmit= this.handleSubmit.bind(this);
        this.toggleModel= this.toggleModel.bind(this);
    }

    toggleModel(staff){
        console.log(staff);
        let a = this.props.department.filter((d)=>d.id === this.props.staff[0].departmentId)
        this.setState({
            isModelOpen : !this.state.isModelOpen,
            name: staff.name,
            doB: staff.doB,
            salaryScale:staff.salaryScale,
            startDate:staff.startDate,
            department: a[0].name,
            annualLeave:staff.annualLeave,
            overTime:staff.overTime
        })
    }
   /*
    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
          [name]: value
        });
      };
    */
    handleSubmit = (value)=>{
        console.log(value);
        console.log(this.state);
        /*
        this.setState({
            name: value.name,
            doB: value.doB,
            salaryScale:value.salaryScale,
            startDate:value.startDate,
            department: value.department,
            annualLeave:value.annualLeave,
            overTime:value.overTime
        })
        */
        //console.log(this.state);
    }

    render(){
        console.log(this.state);
        console.log(this.props.staff[0]);
        if(this.props.isLoading) {
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            )
        }
        else if (this.props.errMess){
            return(
                <div className="container">
                    <div className="row">
                        <h4>{this.props.errMess}</h4>
                    </div>
                </div>
            )
        }
        else
        if(this.props.staff !=null){
            console.log(this.props.staff); 
            console.log(this.props.staff[0].name);
            console.log(this.props.staff[0].departmentId)
            
            //let a = this.props.department.filter((d)=>d.id === this.props.staff[0].departmentId)
            //console.log(a);
            return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/nhanvien'>Nhân viên</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{this.state.name}</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="row mb-3">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-3 col-md-4">
                                <img width="100%" src={this.state.image} alt={this.state.name} />
                            </div>
                            <div className="col-9 col-md-8">
                                <CardTitle>Họ và tên: {this.state.name}</CardTitle>
                                <CardText>Ngày sinh: {dateFormat(this.state.doB, "dd/mm/yyyy")}</CardText>
                                <CardText>Ngày vào công ty: {dateFormat(this.state.startDate, "dd/mm/yyyy")}</CardText>
                                <CardText>Phòng ban: {this.state.department}</CardText>
                                <CardText>Số ngày nghỉ còn lại: {this.state.annualLeave}</CardText>
                                <CardText>Số ngày đã làm thêm: {this.state.overTime}</CardText>
                                <Button color='primary' outline className="fa fa-pencil" onClick={()=>this.toggleModel(this.state)}> Edit information</Button>
                            </div>
                        </div>
                    </div>
                </div>


                <div>
                <Modal isOpen={this.state.isModelOpen} toggle={this.toggleModel}>
                    <ModalHeader toggle={this.toggleModel}>Sửa thông tin nhân viên</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={this.handleSubmit}>
                            <Row className="form-group">
                                <Label htmlFor="name" sm={4}>Tên</Label>
                                <Col sm={8}>
                                <Control.text 
                                model=".name"
                                id="name" 
                                name="name"
                                placeholder="Tên"
                                value={this.state.name}
                                className="form-control"
                                //onChange={this.handleInputChange}
                                />
                                
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="doB" sm={4}>Ngày sinh</Label>
                                <Col sm={8}>
                                <Control type="date" 
                                model=".doB" 
                                id="doB" 
                                name="doB"
                                placeholder="dd/mm/yyyy"
                                value={this.state.doB}
                                //onChange={this.handleInputChange}
                                className="form-control"
                                //value={this.state.tenState}
                               />
                                
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="startDate" sm={4}>Ngày vào công ty</Label>
                                <Col sm={8}>
                                <Control type="date" 
                                model=".startDate" 
                                id="startDate" 
                                name="startDate"
                                placeholder="dd/mm/yyyy"
                                //onChange={this.handleInputChange}
                                value={this.state.startDate}
                                className="form-control"
                                //value={this.state.tenState}
                                />
                                
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="department" sm={4}>Phòng ban</Label>
                                <Col sm={8}>
                                <Control.select 
                                model=".department" 
                                id="department" 
                                name="department"
                                //onChange={this.handleInputChange}
                                value={this.state.department}
                                className="form-control"
                                >
                                    <option></option>
                                    <option>Sale</option>
                                    <option>HR</option>
                                    <option>Marketing</option>
                                    <option>IT</option>
                                    <option>Finance</option>
                                </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="salaryScale" sm={4}>Hệ số lương</Label>
                                <Col sm={8}>
                                <Control type="number" 
                                model=".salaryScale" 
                                id="salaryScale" 
                                name="salaryScale"
                                placeholder="1.0 -> 3.0"
                                //onChange={this.handleInputChange}
                                value={this.state.salaryScale}
                                //value={this.state.tenState}
                                className="form-control"
                                />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="annualLeave" sm={4}>Số ngày nghỉ còn lại</Label>
                                <Col sm={8}>
                                <Control type="number" 
                                model=".annualLeave" 
                                id="annualLeave" 
                                name="annualLeave"
                                placeholder="Số ngày nghỉ còn lại"
                                //onChange={this.handleInputChange}
                                value={this.state.annualLeave}
                                //value={this.state.tenState}
                                className="form-control"
                               />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="overTime" sm={4}>Số ngày đã làm thêm</Label>
                                <Col sm={8}>
                                <Control type="number" 
                                model=".overTime" 
                                id="overTime" 
                                name="overTime"
                                placeholder="Số ngày đã làm thêm"
                                //onChange={this.handleInputChange}
                                value={this.state.overTime}
                                //value={this.state.tenState}
                                className="form-control"
                                />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col >
                                    <Button type="submit" color="primary">
                                        Cập nhật thông tin
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
                </div>


            </div>
        )}
        else {
            return (
                <div></div>
            )
        }
    }
}

/*
function RenderStaff({staff,department}){
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
                    <CardText>Phòng ban: {department}</CardText>
                    <CardText>Số ngày nghỉ còn lại: {staff.annualLeave}</CardText>
                    <CardText>Số ngày đã làm thêm: {staff.overTime}</CardText>
                    <Button color='primary' outline className="fa fa-pencil"> Edit information</Button>
                </div>
            </div>
        </div>
    );
}


 StaffDetail = (props)=>{
  
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
    if(props.staff !=null){
        let a = props.department.filter((d)=>d.id === props.staff[0].departmentId)
        return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/nhanvien'>Nhân viên</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.staff[0].name}</BreadcrumbItem>
                </Breadcrumb>
        </div>
            <div className="row mb-3">
                <RenderStaff staff={props.staff[0]} department={a[0].name}/>
            </div> 
        </div>
    )}
    else {
        return (
            <div></div>
        )
    }
    
}
*/

export default StaffDetail; 