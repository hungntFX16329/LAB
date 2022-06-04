import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, CardText, CardTitle,Col, Input,Label, Modal, ModalBody,ModalHeader,Form, FormGroup} from 'reactstrap';
import { Link } from 'react-router-dom';
//import { Control, LocalForm } from 'react-redux-form';
import dateFormat from 'dateformat';
//import { Loading } from './LoadingComponent';


class StaffDetail extends Component{
    constructor(props){
        super(props);
        //let staff = this.props.staff[0]
        this.state={
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
        this.handleInputChange= this.handleInputChange.bind(this);
    }
    handleInputChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        })
    }
    toggleModel(){
        this.setState({
            ...this.state,
            isModelOpen : !this.state.isModelOpen,
        })
    }
  
    handleSubmit = (event)=>{
        event.preventDefault();
        /*
        const newStaff = {
            name: this.state.name,
            doB: this.state.doB,
            salaryScale: this.state.salaryScale,
            startDate: this.state.startDate,
            department: this.state.department,
            annualLeave: this.state.annualLeave,
            overTime: this.state.overTime,
            image:'/assets/images/alberto.png'
        }
        */
        alert(JSON.stringify(this.state))
        //alert(JSON.stringify(newStaff))
        this.props.onUpdateStaff(this.state)
    }



    render(){
        if(this.props.staff !=null){
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
                                <Button color='primary' outline className="fa fa-pencil" onClick={()=>this.toggleModel()}> Edit information</Button>
                            </div>
                        </div>
                    </div>
                </div>


                <div>
                <Modal isOpen={this.state.isModelOpen} toggle={this.toggleModel}>
                    <ModalHeader toggle={this.toggleModel}>Sửa thông tin nhân viên</ModalHeader>
                    <ModalBody>
                    <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label htmlFor="name" sm={4}>Tên</Label>
                                <Col sm={8}>
                                <Input 
                                type="text" 
                                id="name" 
                                name="name"
                                placeholder="Tên"
                                value={this.state.name} 
                                onChange={this.handleInputChange}/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="doB" sm={4}>Ngày sinh</Label>
                                <Col sm={8}>
                                <Input 
                                type="date" 
                                id="doB" 
                                name="doB"
                                placeholder="Ngày sinh"
                                value={this.state.doB} 
                                onChange={this.handleInputChange}/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="startDate" sm={4}>Ngày vào công ty</Label>
                                <Col sm={8}>
                                <Input 
                                type="date" 
                                id="startDate" 
                                name="startDate"
                                placeholder="startDate"
                                value={this.state.startDate} 
                                onChange={this.handleInputChange}/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="department" sm={4}>Phòng ban</Label>
                                <Col sm={8}>
                                <Input 
                                type="select" 
                                id="department" 
                                name="department"
                                value={this.state.department} 
                                onChange={this.handleInputChange}>
                                    <option>Sale</option>
                                    <option>HR</option>
                                    <option>Marketing</option>
                                    <option>IT</option>
                                    <option>Finance</option>
                                </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="salaryScale" sm={4}>Hệ số lương</Label>
                                <Col sm={8}>
                                <Input 
                                type="number" 
                                id="salaryScale" 
                                name="salaryScale"
                                placeholder="1.0 -> 3.0"
                                value={this.state.salaryScale} 
                                onChange={this.handleInputChange}/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="annualLeave" sm={4}>Số ngày nghỉ còn lại</Label>
                                <Col sm={8}>
                                <Input 
                                type="number" 
                                id="annualLeave" 
                                name="annualLeave"
                                placeholder="Số ngày nghỉ còn lại"
                                value={this.state.annualLeave} 
                                onChange={this.handleInputChange}/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="overTime" sm={4}>Số ngày đã làm thêm</Label>
                                <Col sm={8}>
                                <Input 
                                type="number" 
                                id="overTime" 
                                name="overTime"
                                placeholder="Số ngày đã làm thêm"
                                value={this.state.overTime} 
                                onChange={this.handleInputChange}/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col >
                                    <Button type="submit" color="primary">
                                        Thêm
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
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