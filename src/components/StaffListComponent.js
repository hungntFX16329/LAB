import React, { Component } from 'react';
import { Button, Card, CardBody, CardImg,Form, FormGroup, Input, Label, Modal, ModalBody,ModalHeader, Col, FormFeedback} from 'reactstrap';
import { Link } from 'react-router-dom';

class NhanVien extends Component{

    constructor(props){
        super(props)
        this.state={
            input: '',
            name: '',
            doB: '',
            salaryScale:1,
            startDate:'',
            department: {
                id: "Dept01",
                name: "Sale",
                numberOfStaff: 1
            },
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
        this.handleInputChange= this.handleInputChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
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
            isModelOpen : !this.state.isModelOpen
        })
    }
    handleFind(event){
        this.setState({
            input:this.find.value.toUpperCase()
        })
        event.preventDefault();
    }

    handleSubmit = ()=>{
        const newStaff = {
            name: this.state.name,
            doB: this.state.doB,
            salaryScale: this.state.salaryScale,
            startDate: this.state.startDate,
            department:  {
                id: "Dept01",
                name: this.state.department,
                numberOfStaff: 1
            },
            annualLeave: this.state.annualLeave,
            overTime: this.state.overTime,
            image:'/assets/images/alberto.png'
        }
        this.props.onAdd(newStaff)
    }


    handleBlur = (field)=>(evt)=> {
        this.setState({
            touched: { ...this.state.touched,[field]:true}
        })
    }
   

    validate(name,doB,startDate){
        const errors = {
            name: '',
            doB: '',
            startDate:''
        }
    
        if(this.state.touched.name && name.length < 3){
            errors.name = 'Yêu cầu nhiều hơn 2 ký tự'
        }     
        else if(this.state.touched.name && name.length > 30){
            errors.name = 'Yêu cầu ít hơn 30 ký tự'
        }
            

        if(this.state.touched.doB && doB.length < 2){
            errors.doB = 'Yêu cầu nhập'
        } 
        if(this.state.touched.startDate && startDate.length < 2){
            errors.startDate = 'Yêu cầu nhập'
        }

        return errors;
    }

    render(){
        const errors = this.validate(this.state.name,this.state.doB,this.state.startDate)
       let staff=this.props.staffs
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
                   </Card>
               </div>
           )
       });
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
                                valid={errors.name === ''}
                                invalid={errors.name !== ''}
                                onBlur={this.handleBlur('name')}
                                onChange={this.handleInputChange}/>
                                <FormFeedback>{errors.name}</FormFeedback>
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
                                valid={errors.doB === ''}
                                invalid={errors.doB !== ''}
                                onBlur={this.handleBlur('doB')}
                                onChange={this.handleInputChange}/>
                                <FormFeedback>{errors.doB}</FormFeedback>
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
                                valid={errors.startDate === ''}
                                invalid={errors.startDate !== ''}
                                value={this.state.startDate} 
                                onBlur={this.handleBlur('startDate')}
                                onChange={this.handleInputChange}/>
                                <FormFeedback>{errors.startDate}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="department" sm={4}>Phòng ban</Label>
                                <Col sm={8}>
                                <Input 
                                type="select" 
                                id="department" 
                                name="department"
                                value={this.state.department.name} 
                                onBlur={this.handleBlur('department')}
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
                                onBlur={this.handleBlur('salaryScale')}
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
                                onBlur={this.handleBlur('annualLeave')}
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
                                onBlur={this.handleBlur('overTime')}
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
                <div className="row mb-1" >
                    {staff}
                </div>
            </div> 
        )
    }
}
 
export default NhanVien;
