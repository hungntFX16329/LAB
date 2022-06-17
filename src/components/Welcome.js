import React, {Component} from "react";

class Welcome extends Component{
    constructor(props){
        super(props);
        this.state = {
            id: 0
        }
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(){
     this.setState({
         id: 1
     })
    }
    

    render(){
        return (
        <div>  
        <h1>Welcome {this.state.id} !</h1>
        <button onClick={this.handleChange}>Click me !</button>
        </div> 
        )
    }
}
export default Welcome;