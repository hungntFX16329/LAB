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
import { TransitionGroup, CSSTransition } from 'react-transition-group';

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
  
  componentDidMount(){
    this.props.fetchStaffs();
    this.props.fetchDeapartments();
    this.props.fetchSalary();
  }

  
  render(){
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
        <TransitionGroup>
        <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
          <Switch location={this.props.location}>
            <Route exact path="/nhanvien" component={()=><NhanVien onAdd={this.addStaff} staffs={this.props.staffs} postStaff={this.props.postStaff} department={this.props.departments} onDeleteStaff={this.props.deleteStaff}/>} />
            <Route path="/nhanvien/:staffId" component={StaffWithId}/>
            <Route exact path="/phongban" component={()=><PhongBan department={this.props.departments}/>} />
            <Route path="/phongban/:departmentId" component={DepartmentWithId}/>
            <Route path="/bangluong" component={()=><BangLuong salary={this.props.salary}/>} />
            <Redirect to="/nhanvien" />
          </Switch>
          </CSSTransition>
          </TransitionGroup>
        <Footer />
      </div>
    );
}
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
