import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import NhanVien from './StaffListComponent';
import PhongBan from './DepartmentComponent';
import BangLuong from './SalaryComponent';
import StaffDetail from './StaffDetailComponent'
import { connect } from 'react-redux';
import { Switch, Route, Redirect,withRouter} from 'react-router-dom';


const mapStateToProps = state => {
  return {
    staffs: state.staffs,
    departments: state.departments
  }
}

class Main extends Component {

  constructor(props){
    super(props);
    
    this.addStaff = this.addStaff.bind(this);
  }

  addStaff=(staff)=>{
    let list = localStorage.getItem('userList')? JSON.parse(localStorage.getItem('userList')) : this.props.staffs;
    const id = Math.floor(Math.random()*1000+16);
    const newStaff = {id, ...staff};
    this.setState({
      staffs: [...this.props.staffs,newStaff]
    });
    list.push(newStaff)
    localStorage.setItem('userList',JSON.stringify(list))
  }

  render(){
    let list = localStorage.getItem('userList')? JSON.parse(localStorage.getItem('userList')) : this.props.staffs;
    const StaffWithId = ({match})=>{
      return (
        <StaffDetail staff={list.filter((staff)=>staff.id === parseInt(match.params.staffId,10))}/>
      )
    }

    return (
      <div>
        <Header />
          <Switch>
            <Route exact path="/nhanvien" component={()=><NhanVien onAdd={this.addStaff} staffs={this.props.staffs} />} />
            <Route path="/nhanvien/:staffId" component={StaffWithId}/>
            <Route exact path="/phongban" component={()=><PhongBan department={this.props.departments}/>} />
            <Route path="/bangluong" component={()=><BangLuong salary={this.props.staffs}/>} />
            <Redirect to="/nhanvien" />
          </Switch>
        <Footer />
      </div>
    );
}
}

export default withRouter(connect(mapStateToProps)(Main));
