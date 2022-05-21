import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import DishDetail from './DishdetailComponent';
import NhanVien from './StaffListComponent'
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';
import { STAFFS} from '../shared/staffs';
import { Switch, Route, Redirect} from 'react-router-dom';


class Main extends Component {

  constructor(props){
    super(props);
    this.state = {
      dishes : DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS,
      staffs : STAFFS
    };
  }


  render(){

    /*
    const NhanVien = ()=>{
      return(
        <h1>Nhan vien o day !</h1>
      )
    }
    */
    const PhongBan = ()=>{
      return(
        <h1>Phong ban o day !</h1>
      )
    }
    const BangLuong = ()=>{
      return(
        <h1>Bang luong o day !</h1>
      )
    }
    

    const StaffWithId = ({match})=>{
      console.log(match);
      return (
        <DishDetail dish={this.state.dishes.filter((dish)=>dish.id === parseInt(match.params.dishId,10))[0]}
        comments={this.state.comments.filter((comment)=> comment.dishId === parseInt(match.params.dishId,10))}/>
      )
    }

    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/nhanvien" component={()=><NhanVien staffs={this.state.staffs} />} />
          <Route exact path="/menu" component={()=><Menu dishes={this.state.dishes} />}/>
          <Route path="/nhanvien/:staffId" component={StaffWithId}/>
          <Route exact path="/phongban" component={PhongBan} />
          <Route path="/bangluong" component={BangLuong} />
          <Redirect to="/nhanvien" />
        </Switch>
        <Footer />
      </div>
    );
}
}

export default Main;
