import React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, ListGroupItem, ListGroup, Breadcrumb, BreadcrumbItem} from "reactstrap";
import {Link} from "react-router-dom";

// {props} This is called a "destructuring". Actually, 
// you're passing an object as an argument to the function, but the destructuring uses only the named properties of the object.
function RenderDish({dish}){
    if(dish != null){
        return(
            <div>
                <Card>
                    <CardImg top width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>  
        );
    }else{
        return(
            <div></div>
        );
    }
}


// In JSX, lower-case tag names are considered to be HTML tags. However, lower-case tag names with a dot (property accessor) aren't.
function RenderComment({comments}){
    if(comments != null){
        const commentArray = comments.map(
            (comment)=>{
                return(
                    <div key={comment.id}>
                        <ListGroupItem className="border-0">
                            {comment.comment}<br/>
                            {" -- "+comment.author + ", " +  monthFormat(new Date(comment.date))}
                        </ListGroupItem>
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
                    {commentArray}
                </ListGroup>
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
    console.log(props.comments)
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
                    <RenderComment comments = {props.comments}/>
                </div>
            </div>
        </div>
    );
}


export default DishDetail