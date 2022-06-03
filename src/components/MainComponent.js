import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import NhanVien from './StaffListComponent';
import PhongBan from './DepartmentComponent';
import BangLuong from './SalaryComponent';
import StaffDetail from './StaffDetailComponent';
import DepartmentDetail from './DepartmentDetailComponent';
import { connect } from 'react-redux';
import { postStaff, fetchStaffs, fetchDeapartments } from '../redux/ActionCreators';
import { Switch, Route, Redirect,withRouter} from 'react-router-dom';


const mapStateToProps = state => {
  return {
    staffs: state.staffs,
    departments: state.departments
  }
}

const mapDispatchToProps = (dispatch) => ({
  postStaff: (name,doB,salaryScale,startDate,departmentId,annualLeave,overTime) => dispatch(postStaff(name,doB,salaryScale,startDate,departmentId,annualLeave,overTime)),
  fetchStaffs: () => {dispatch(fetchStaffs())},
  fetchDeapartments: () => {dispatch(fetchDeapartments())}
})

class Main extends Component {

  componentDidMount(){
    this.props.fetchStaffs();
    this.props.fetchDeapartments()
  }

  render(){

    const StaffWithId = ({match})=>{
      return (
        <StaffDetail staff={this.props.staffs.staffs.filter((staff)=>staff.id === parseInt(match.params.staffId,10))}
        isLoading={this.props.staffs.isLoading}
        errMess={this.props.staffs.errMess}/>
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
            <Route exact path="/nhanvien" component={()=><NhanVien staffs={this.props.staffs} postStaff={this.props.postStaff} department={this.props.departments}/>} />
            <Route path="/nhanvien/:staffId" component={StaffWithId}/>
            <Route exact path="/phongban" component={()=><PhongBan department={this.props.departments}/>} />
            <Route path="/phongban/:departmentId" component={DepartmentWithId}/>
            <Route path="/bangluong" component={()=><BangLuong salary={this.props.staffs}/>} />
            <Redirect to="/nhanvien" />
          </Switch>
        <Footer />
      </div>
    );
}
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
