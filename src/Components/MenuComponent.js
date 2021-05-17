import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Card, CardImg, CardImgOverlay, CardTitle } from "reactstrap";
import {Loading} from './LoadingComponent'



// this function takes in a json object and can be accessed by <methodName param={} />
function RenderMenuItem ({dish}) {
    return(
        <div>
            {/* onclick here takes a function reference a callback or function definition */}
            <Card>
                <Link to={`/menu/${dish.id}`}>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardImgOverlay>
                    <CardTitle>{dish.name}</CardTitle>
                </CardImgOverlay>
                </Link>
            </Card>
        </div>
    );
}


const Menu = ({dishes}) => {

    // dishes onClick
    const menu = dishes.dishes.map((dish)=>{
            return(
                <div key={dish.id} className="col-12 col-md-5 m-1"> 
                    <RenderMenuItem dish={dish}/>
                </div>
            );
        }
    )

    if(dishes.isLoading){
        return(
        <div className="container">
            <div className="row">
                <Loading />
            </div>
        </div>
        );
    }if(dishes.errMess){
        return (
            <div className="container">
                <div className="row">
                    <h4>{dishes.errMess}</h4>
                </div>
            </div>
        );
    }else{
        return(
            <div className="container">
                {/* breadcrumb */}
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Menu</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Menu</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    {menu}
                </div>
            </div>
        );
    }

}

export default Menu