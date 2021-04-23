import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, ListGroupItem, ListGroup} from "reactstrap";



class DishDetail extends Component{
    // constructor(props){
    //     super(props)
    //     // console.log(this.props)
    // }

    render(){
        return(
            <div className="row">
                {this.renderDish(this.props.dish)}
                {this.renderComment(this.props.dish==null ? null:this.props.dish.comments)}
            </div>
        );
    }

    renderDish(dish){
        if(dish != null){
            return(
                <div className="col-12 col-md-5 m-1">
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
    renderComment(comments){
        if(comments != null){
            const commentArray = comments.map(
                (comment)=>{
                    const date_ = new Date(comment.date);

                    return(
                        <div key={comment.id}>
                            <ListGroupItem className="border-0">
                                {comment.comment}<br/>
                                {" -- "+comment.author + ", " +  this.monthFormat(date_)}
                            </ListGroupItem>
                        </div>
                    );
                }
            )
            return(
                <div className="col-12 col-md-5 m-1">
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

    monthFormat(date){
        // const months = {
        //     0: 'January',
        //     1: 'February',
        //     2: 'March',
        //     3: 'April',
        //     4: 'May',
        //     5: 'June',
        //     6: 'July',
        //     7: 'August',
        //     8: 'September',
        //     9: 'October',
        //     10: 'November',
        //     11: 'December'
        //   }
        // return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
        return `${new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(date)}`
    }
}

export default DishDetail