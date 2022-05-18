import { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';


class DishDetail extends Component {
   
    renderDish(dish){
        return(
            <Card>
                 <CardImg width="100%" src={dish.image} alt={dish.name} />
                 <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                 </CardBody>
            </Card>
        );
    }


    renderComment(commentArray){
        let comment = commentArray.map((comments)=>{
            if (comments != null)
                return (
                    <div key={comments.id}>
                        <ul style={{ listStyle: 'none',margin:0,padding:"10px"}}>
                            <li>{comments.comment}</li>
                            <li>--{comments.author} {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comments.date)))}</li>
                        </ul>
                    </div>
                )
            else {
                return <div></div>
            }
        })
        return (
            <div className="container">
                <div className="row"> 
                    <h4>Comments</h4>
                    <div>
                    {comment}
                    </div>
                </div>
            </div>
        )
        
    }

    render(){
        let dish = this.props.show
        console.log({dish});
        if(dish !=null)
            return (
            <div className="row">
                 <div className="col-12 col-md-5 m-1">
                    {this.renderDish(dish)}
                </div>
                <div className="col-12 col-md-5 m-1">
                    {this.renderComment(dish.comments)}
                </div>
            </div> 
        )
        else {
            return (
                <div></div>
            )
        }
    }
}

export default DishDetail; 