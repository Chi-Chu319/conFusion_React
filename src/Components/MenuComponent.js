import React, {Component} from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from "reactstrap";




// this function takes in a json object and can be accessed by <methodName param={} />
function RenderMenuItem ({dish, onClick}) {
    return(
        <div>
            <div key={dish.id} className="col-12 col-md-5 m-1">
                {/* onclick here takes a function reference a callback or function definition */}
                <Card onClick={()=>onClick(dish.id)}>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardImgOverlay>
                        <CardTitle>{dish.name}</CardTitle>
                    </CardImgOverlay>
                </Card>
            </div>
        </div>
    );
}




const Menu = (props) => {

}

export default Menu