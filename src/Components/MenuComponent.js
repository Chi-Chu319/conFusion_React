import React, {Component} from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle } from "reactstrap";


class Menu extends Component{
    // constructor(props){
    //     super(props)
    //     /*
    //     The state is an instance of React Component Class can be defined as an object of
    //      a set of observable properties that control the behavior of the component. 
    //      In other words, the State of a component is an object that holds some information that may change over the lifetime of the component.
    //     */
    // //    this.state = {
    // //        selectedDish: null
    // //    }
    // }


    renderDish(dish){
        if (dish != null){
            return (
                <Card>
                    <CardImg top width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        }else{
            return (
                <div></div>
            );
        }
    }

    render(){
        const menu = this.props.dishes.map(
            (dish) =>{
                return (
                    <div key={dish.id} className="col-12 col-md-5 m-1">
                        {/* onclick here takes a function reference a callback or function definition */}
                        <Card onClick={()=>this.props.onClick(dish.id)}>
                            <CardImg width="100%" src={dish.image} alt={dish.name} />
                            <CardImgOverlay>
                                <CardTitle>{dish.name}</CardTitle>
                            </CardImgOverlay>
                        </Card>
                    </div>
                );
            } 
        )




        return(
            <div className="row">
                    {menu}
            </div>
        );
    }
}

export default Menu