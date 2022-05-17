//import logo from './logo.svg';
import { Navbar, NavbarBrand } from 'reactstrap';
import StaffList from './components/StaffListComponent';
import './App.css';
import { Component } from 'react';
import { STAFFS} from './shared/staffs';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      staffs : STAFFS
    };
  }
  
  ClickMe = ()=> {
    alert ('You clicked me !')
  }
  render(){
    return (
      <div>
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Ứng dụng quản lý nhân sự v1.0</NavbarBrand>
          </div>
        </Navbar>
        <div className="container mt-2 mb-2">
        <button onClick={this.ClickMe} type="button" className="btn btn-outline-primary">6 Column</button>
        <button onClick={this.ClickMe} type="button" className="btn btn-outline-primary">4 Column</button>
        <button onClick={this.ClickMe} type="button" className="btn btn-outline-primary">3 Column</button>
        <button onClick={this.ClickMe} type="button" className="btn btn-outline-primary">2 Column</button>
        <button onClick={this.ClickMe} type="button" className="btn btn-outline-primary">1 Column</button>
        </div>
        <StaffList staffs={this.state.staffs}/> 
      </div>
    );
  }
}

export default App;
