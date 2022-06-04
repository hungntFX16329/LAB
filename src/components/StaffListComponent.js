import React, { Component } from 'react';
import { Button, Card, CardBody, CardImg,Form, FormGroup, Input, Label, Modal, ModalBody,ModalHeader, Col, Row} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len)
const minLength = (len) => (val) => (val) && (val.length >= len)

class NhanVien extends Component{

    constructor(props){
        super(props)
        this.state={
            input: '',
            name: '',
            doB: '',
            salaryScale:'',
            startDate:'',
            department: 'Dept03',
            annualLeave:0,
            overTime:0,
            touched: {
                name:false,
                doB: false,
                startDate: false
            }
        }
        this.handleFind= this.handleFind.bind(this);
        this.handleSubmit= this.handleSubmit.bind(this);
        this.toggleModel= this.toggleModel.bind(this);
    }


    toggleModel(){
        this.setState({
            isModelOpen : !this.state.isModelOpen
        })
    }
    handleFind(event){
        this.setState({
            input:this.find.value.toUpperCase()
        })
        event.preventDefault();
    }

    handleSubmit = (values)=>{
        alert(JSON.stringify(values));
        /*
        console.log(values);
        console.log(values.department);
        //let a = this.props.department.departments.filter(department=>department.name === values.department)
        let staff={
            name: values.name,
            doB: values.doB,
            salaryScale: values.salaryScale,
            startDate: values.startDate,
            department: this.state.department,
            annualLeave: values.annualLeave,
            overTime: values.overTime,
            image:'/assets/images/alberto.png'
        }
        console.log(staff);
        //let value = JSON.parse(JSON.stringify(values))
        this.props.postStaff(staff)
        */
        
        let a = this.props.department.departments.filter(department=>department.name === values.department)
        this.props.postStaff(values.name,values.doB,values.salaryScale,values.startDate,a[0].id,values.annualLeave,values.overTime)
        
        /*
        const newStaff = {
            name: value.name,
            doB: value.doB,
            salaryScale: value.salaryScale,
            startDate: value.startDate,
            department:  {
                id: "Dept01",
                name: value.department,
                numberOfStaff: 1
            },
            annualLeave: value.annualLeave,
            overTime: value.overTime,
            image:'/assets/images/alberto.png'
        }
        */
       //this.props.onAdd(newStaff)
    }

    render(){
       let staff=this.props.staffs.staffs
       .filter(element => {
            if((element.name.toUpperCase()).indexOf(this.state.input) !==-1){
                return true
            }
            return 0;
        })
       .map((staff)=>{
           return (
               <div key={staff.id} className="col-6 col-md-4 col-lg-2 mt-1">
                  <Card>
                       <Link to={`/nhanvien/${staff.id}`} >
                       <CardImg width="50%" src={staff.image} alt={staff.name} />
                       <CardBody className="text-center card-header">{staff.name}</CardBody>
                       </Link>
                       <Button color="danger" onClick={()=>this.props.onDeleteStaff(staff.id)}>Delete</Button>
                   </Card>
               </div>
           )
       });
       if (this.props.staffs.isLoading){
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        )
    }
    else if (this.props.staffs.errMess){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h4>{this.props.staffs.errMess}</h4>
                    </div>
                </div>
            </div>
        )
    }
    else 
        return(
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-6 mt-3">
                        <div className="row">
                            <div className="col-10 col-md-10">
                                <h3>Nhân viên</h3>
                            </div>
                            <div className="col-2 col-auto">
                                <Button outline onClick={this.toggleModel}>
                                    <span className="fa fa-plus fa-lg"></span>
                                </Button>  
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 mt-3">
                        <Form onSubmit={this.handleFind} className="form-group row">
                            <FormGroup className="ml-3">
                                <Input 
                                    type="text" 
                                    id="find" 
                                    name="find" 
                                    placeholder="Tìm tên nhân viên"
                                    innerRef={(input)=> this.find = input} />
                            </FormGroup>
                            <div className="col-4 col-md-4">
                            <Button type="submit" color="primary">Tìm</Button>
                            </div>
                        </Form>
                    </div>
                </div>    
                <div>
                    <hr />
                </div>
                <div>
                <Modal isOpen={this.state.isModelOpen} toggle={this.toggleModel}>
                    <ModalHeader toggle={this.toggleModel}>Thêm nhân viên</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values)=>this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="name" sm={4}>Tên</Label>
                                <Col sm={8}>
                                <Control.text 
                                model=".name"
                                id="name" 
                                name="name"
                                placeholder="Tên"
                                className="form-control"
                                validators={{
                                    required, minLength: minLength(3), maxLength: maxLength(30)                                        
                                }}/>
                                <Errors 
                                    className="text-danger"
                                    model=".name"
                                    show="touched"
                                    messages={{
                                        required: 'Yêu cầu nhập  ',
                                        minLength: 'Yêu cầu nhiều hơn 2 ký tự',
                                        maxLength: 'Yêu cầu ít hơn 30 ký tự'
                                    }}/>
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
                                className="form-control"
                                value={this.state.tenState}
                                validators={{
                                    required                                        
                                }}/>
                                <Errors 
                                    className="text-danger"
                                    model=".doB"
                                    show="touched"
                                    messages={{
                                        required: 'Yêu cầu nhập'
                                    }}/>
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
                                className="form-control"
                                value={this.state.tenState}
                                validators={{
                                    required                                        
                                }}/>
                                <Errors 
                                    className="text-danger"
                                    model=".startDate"
                                    show="touched"
                                    messages={{
                                        required: 'Yêu cầu nhập'
                                    }}/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="department" sm={4}>Phòng ban</Label>
                                <Col sm={8}>
                                <Control.select 
                                model=".department" 
                                id="department" 
                                name="department"
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
                                value={this.state.tenState}
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
                                value={this.state.tenState}
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
                                value={this.state.tenState}
                                className="form-control"
                                />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col >
                                    <Button type="submit" color="primary">
                                        Thêm
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
                </div>   
                <div className="row mb-1" >
                    {staff}
                </div>
            </div> 
        )
    }
}
 
export default NhanVien;
