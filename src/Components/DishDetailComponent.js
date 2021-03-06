import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, ListGroupItem, ListGroup, Breadcrumb, BreadcrumbItem, ModalHeader, 
    ModalBody,  Button, Modal, Row, Label} from "reactstrap";
import {Link} from "react-router-dom";
import { Control, Errors, LocalForm } from 'react-redux-form';
import {Loading} from './LoadingComponent' 
import { baseUrl } from "../shared/baseUrl";
import { FadeTransform, Fade, Stagger } from 'react-animation-components'


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            isModalOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal(){
        this.setState({isModalOpen:!this.state.isModalOpen})
    }

    handleSubmit(values){
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.name, values.content)
    }

    render(){
        return(
            <React.Fragment>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"></span> Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader>
                        Submit Comment
                    </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select name="rating" id="rating"
                                model=".rating"
                                className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </div>
                            <div className="form-group">
                                <Label htmlFor="name">Your Name</Label>
                                <Control.text name="name" id="name"
                                model=".name"
                                validators={{
                                    required,
                                    maxLength:maxLength(15),
                                    minLength:minLength(3)
                                }}
                                className="form-control"/>
                                <Errors 
                                className="text-danger"
                                // model is used to bind to the text field. if the text entered is not valid, the message will be shown here
                                model=".name"
                                show="touched"
                                messages={{
                                    required: "Required ",
                                    minLength: "Must be greater than 2 characters ",
                                    maxLength: "Must be 15 characters or less "
                                }}
                                />
                            </div>
                            <div className="form-group">
                                <Label htmlFor="content">Content</Label>
                                <Control.textarea name="content" id="content"
                                model=".content"
                                rows="6"
                                className="form-control"/>
                            </div>
                            <div className="form-group">
                                <Button type="submit" color="primary">
                                    Submit
                                </Button>  
                            </div>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}



// {props} This is called a "destructuring". Actually, 
// you're passing an object as an argument to the function, but the destructuring uses only the named properties of the object.
function RenderDish({dish}){
    if(dish != null){
        return(
            <div>
                <FadeTransform 
                in
                transformProps={{
                    // where the card initially are and they will fade in to where they are supposed to be.
                    exitTransform :'scale(0.5) translateY(-50%)'
                }}>
                    <Card>
                        <CardImg top width="100%" src={baseUrl + dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </FadeTransform>
            </div>  
        );
    }else{
        return(
            <div></div>
        );
    }
}


// In JSX, lower-case tag names are considered to be HTML tags. However, lower-case tag names with a dot (property accessor) aren't.
function RenderComment({comments, postComment, dishId}){
    if(comments != null){
        const commentArray = comments.map(
            (comment)=>{
                return(
                    <div key={comment.id}>
                        <Fade in>
                            <ListGroupItem className="border-0">
                                {comment.comment}<br/>
                                {" -- "+comment.author + ", " +  monthFormat(new Date(comment.date))}
                            </ListGroupItem>
                        </Fade>
                    </div>
                );
            }
        )
        return(
            <div>
                <ListGroup>
                    <ListGroupItem className="border-0">
                        <h3>Comments</h3>
                    </ListGroupItem>
                    <Stagger in>
                        {commentArray}
                    </Stagger>
                </ListGroup>
                <div className="row">
                    <div className="col-12">
                        <CommentForm 
                        postComment = {postComment}
                        dishId = {dishId}/>
                    </div>
                </div>
            </div>
        );
    }else{
        return(
            <div></div>
        );
    }
}

function monthFormat(date){
    return `${new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(date)}`
}

const DishDetail = (props) => {
    if(props.isLoading){
        return(
        <div className="container">
            <div className="row">
                <Loading />
            </div>
        </div>
        );
    }else if(props.errMess){
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }else if(props.dish != null){
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish = {props.dish}/>
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComment comments = {props.comments}
                        postComment = {props.postComment}
                        dishId = {props.dish.id}/>
                    </div>
                </div>
            </div>
        );
    }else{
        return(
            <div></div>
        )
    }

}


export default DishDetail