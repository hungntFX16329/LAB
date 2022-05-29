import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Label, Row, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Input,Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LocalForm,Control, Errors } from 'react-redux-form';

    function RenderDish({dish}){
        return(
            <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }


    function RenderComment({commentArray, addComment, dishId}){
            if (commentArray != null)
                return (
                    <div className="col-12 col-md-5 m-1">
                        <h4>Comments</h4>
                        <ul className="list-unstyled">
                            {commentArray.map((comments)=>{
                                return(
                                    <li key={comments.id}>
                                        <p>{comments.comment}</p>
                                        <p>--{comments.author} {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comments.date)))}</p>
                                    </li>
                                )
                            })}
                        </ul>
                        <CommentForm dishId={dishId} addComment={addComment}/>
                    </div>
                )
            else {
                return <div></div>
            }
    }

    const DishDetail = (props)=>{
        console.log(props.addComment);
        console.log(props.dish.id);
        if(props.dish !=null)
            return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderDish dish={props.dish} />
                    <RenderComment commentArray={props.comments} 
                        addComment={props.addComment}
                        dishId={props.dish.id}/> 
                </div> 
            </div>
        )
        else {
            return (
                <div></div>
            )
        }
}

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len)

class CommentForm extends Component {
    
    constructor(props){
        super(props)
        this.state={
            isOpen : false,
            isModelOpen: false
        }
        this.toggleModel= this.toggleModel.bind(this)
        this.handleSubmit= this.handleSubmit.bind(this);
    }

    toggleModel(){
        this.setState({
            isModelOpen : !this.state.isModelOpen
        })
    }

    handleSubmit(values){
        this.toggleModel();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment)
    }

    render(){
        return(
            <div>
            <Button outline onClick={this.toggleModel}>
                <span className="fa fa-sign-in fa-lg"></span> Submit Comment
            </Button>
            <Modal isOpen={this.state.isModelOpen} toggle={this.toggleModel}>
                <ModalHeader toggle={this.toggleModel}>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values)=>this.handleSubmit(values)}>
                        <Row className="form-group">
                            <Col>
                            <Label htmlFor="rating">Rating</Label>
                                <Control.select
                                model =".rating"
                                id="rating"
                                name="rating"
                                className="form-control">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                </Control.select>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col>
                            <Label htmlFor="name">Your name</Label>
                            <Control.text 
                            model=".name"
                            id="name"
                            name="name"
                            placeholder="Your name"
                            className="form-control"
                            validators={{
                                required, minLength : minLength(3), maxLength: maxLength(15)
                            }}/>
                            <Errors
                            className="text-danger"
                            model=".name"
                            show="touched"
                            messages={{
                                minLength: 'Must be greater than 2 characters',
                                maxLength: 'Must be less than 15 characters'
                            }}/>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col>
                            <Label htmlFor="comment">Comment</Label>
                            <Control.textarea 
                            model=".comment"
                            id="comment"
                            name="comment"
                            className="form-control"
                            rows="6"/>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col>
                                <Button type="submit" color="primary">Submit</Button>
                            </Col>
                        </Row>
                    </LocalForm>
                </ModalBody>
            </Modal>
            </div>
        )
    }
};



export default DishDetail; 