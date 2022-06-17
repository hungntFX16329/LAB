import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Label, Row, Button, Modal, ModalHeader, ModalBody,Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LocalForm,Control, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger} from 'react-animation-components'

    function RenderDish({dish}){
        return(
            <div className="col-12 col-md-5 m-1">
                 <FadeTransform in
                transformProps={{
                exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                <Card>
                    <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
                </FadeTransform>
            </div>
        );
    }


    function RenderComment({commentArray, postComment, dishId}){
            if (commentArray != null)
                return (
                    <div className="col-12 col-md-5 m-1">
                        <h4>Comments</h4>
                        <ul className="list-unstyled">
                            <Stagger in>
                            {commentArray.map((comments)=>{
                                return(
                                    <Fade in>
                                    <li key={comments.id}>
                                        <p>{comments.comment}</p>
                                        <p>--{comments.author} {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comments.date)))}</p>
                                    </li>
                                    </Fade>
                                )
                            })}
                            </Stagger>
                        </ul>
                        <CommentForm dishId={dishId} postComment={postComment}/>
                    </div>
                )
            else {
                return <div></div>
            }
    }

    const DishDetail = (props)=>{
        if(props.isLoading) {
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            )
        }
        else if (props.errMess){
            return(
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            )
        }
        else if(props.dish !=null)
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
                        postComment={props.postComment}
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
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment)
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
                            <Label htmlFor="author">Your name</Label>
                            <Control.text 
                            model=".author"
                            id="author"
                            name="author"
                            placeholder="Your name"
                            className="form-control"
                            validators={{
                                required, minLength : minLength(3), maxLength: maxLength(15)
                            }}/>
                            <Errors
                            className="text-danger"
                            model=".author"
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