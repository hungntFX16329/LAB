import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import NhanVien from './StaffListComponent';
import PhongBan from './DepartmentComponent';
import BangLuong from './SalaryComponent';
import StaffDetail from './StaffDetailComponent'
import { STAFFS} from '../shared/staffs';
import { DEPARTMENTS } from '../shared/staffs';
import { Switch, Route, Redirect} from 'react-router-dom';


class Main extends Component {

  constructor(props){
    super(props);
    this.state = {
      staffs : STAFFS,
      departments: DEPARTMENTS
    };
  }


  render(){

    const StaffWithId = ({match})=>{
      return (
        <StaffDetail staff={this.state.staffs.filter((staff)=>staff.id === parseInt(match.params.staffId,10))}/>
      )
    }

    return (
      <div>
        <Header />
          <Switch>
            <Route exact path="/nhanvien" component={()=><NhanVien staffs={this.state.staffs} />} />
            <Route path="/nhanvien/:staffId" component={StaffWithId}/>
            <Route exact path="/phongban" component={()=><PhongBan department={this.state.departments}/>} />
            <Route path="/bangluong" component={()=><BangLuong salary={this.state.staffs}/>} />
            <Redirect to="/nhanvien" />
          </Switch>
        <Footer />
      </div>
    );
}
}

export default Main;
