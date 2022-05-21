//import logo from './logo.svg';
import React, { Component }from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import StaffList from './components/StaffListComponent';
import './App.css';

import { STAFFS} from '../src/shared/staffs';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      staffs : STAFFS
    };
  }
  
  render(){
    return (
      <div>
        <Navbar>
          <div className="container">
            <NavbarBrand href="/">Ứng dụng quản lý nhân sự v1.0</NavbarBrand>
          </div>
        </Navbar>
        <div className="divider"></div>
        <StaffList staffs={this.state.staffs}/> 
      </div>
    );
  }
}

export default App;
