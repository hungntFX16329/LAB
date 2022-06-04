import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import NhanVien from './StaffListComponent';
import PhongBan from './DepartmentComponent';
import BangLuong from './SalaryComponent';
import StaffDetail from './StaffDetailComponent';
import DepartmentDetail from './DepartmentDetailComponent';
import { connect } from 'react-redux';
import { postStaff, fetchStaffs, fetchDeapartments,fetchSalary, deleteStaff, updateStaff } from '../redux/ActionCreators';
import { Switch, Route, Redirect,withRouter} from 'react-router-dom';


const mapStateToProps = state => {
  
  return {
    staffs: state.staffs,
    departments: state.departments,
    salary: state.salary
  }
}

const mapDispatchToProps = (dispatch) => ({
  postStaff: (name,doB,salaryScale,startDate,departmentId,annualLeave,overTime) => dispatch(postStaff(name,doB,salaryScale,startDate,departmentId,annualLeave,overTime)),
  fetchStaffs: () => {dispatch(fetchStaffs())},
  fetchDeapartments: () => {dispatch(fetchDeapartments())},
  fetchSalary: () => {dispatch(fetchSalary())},
  deleteStaff: (id)=>{dispatch(deleteStaff(id))},
  updateStaff: (staff)=>{dispatch(updateStaff(staff))}
})

class Main extends Component {
  constructor(props){
    super(props);
    
    this.addStaff = this.addStaff.bind(this);
  }
  componentDidMount(){
    this.props.fetchStaffs();
    this.props.fetchDeapartments();
    this.props.fetchSalary();
  }

  addStaff=(staff)=>{
    const id = Math.floor(Math.random()*1000+16);
    const newStaff = {id, ...staff};
    this.setState({
      staffs: [...this.props.staffs,newStaff]
    });
  }
  render(){
    console.log(this.props.staffs.staffs);
    console.log(this.props.departments.departments);
    const StaffWithId = ({match})=>{
      return (
        <StaffDetail staff={this.props.staffs.staffs.filter((staff)=>staff.id === parseInt(match.params.staffId,10))}
        department={this.props.departments.departments}
        isLoading={this.props.staffs.isLoading}
        errMess={this.props.staffs.errMess}
        onUpdateStaff={this.props.updateStaff}/>
      )
    }
    const DepartmentWithId = ({match})=>{
      return (
        <DepartmentDetail staffin={this.props.staffs.staffs.filter((staff)=>staff.departmentId === match.params.departmentId)}
        department={this.props.departments.departments.filter((department)=>department.id === match.params.departmentId)}
        departmentsLoading={this.props.departments.isLoading}
        departmentsErrMess={this.props.departments.errMess}/>
      )
    }

    return (
      <div>
        <Header />
          <Switch>
            <Route exact path="/nhanvien" component={()=><NhanVien onAdd={this.addStaff} staffs={this.props.staffs} postStaff={this.props.postStaff} department={this.props.departments} onDeleteStaff={this.props.deleteStaff}/>} />
            <Route path="/nhanvien/:staffId" component={StaffWithId}/>
            <Route exact path="/phongban" component={()=><PhongBan department={this.props.departments}/>} />
            <Route path="/phongban/:departmentId" component={DepartmentWithId}/>
            <Route path="/bangluong" component={()=><BangLuong salary={this.props.salary}/>} />
            <Redirect to="/nhanvien" />
          </Switch>
        <Footer />
      </div>
    );
}
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
