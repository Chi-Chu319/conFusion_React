import React from 'react';
import { Card, CardImg, CardBody, CardText, CardTitle } from 'reactstrap';
import {Loading} from './LoadingComponent'


// {item} is the destructing of props(JSX way of passing parameter) passed into a function.
function RenderCard({item, isLoading, errMess}){
    // console.log(isLoading)
    if(isLoading){
        return(
        <div className="container">
            <div className="row">
                <Loading />
            </div>
        </div>
        );
    }if(errMess){
        return (
            <div className="container">
                <div className="row">
                    <h4>{errMess}</h4>
                </div>
            </div>
        );
    }else{

        return (
            <Card>
                <CardImg src={item.image} alt={item.name} />
                <CardBody>
                    <CardTitle>{item.name}</CardTitle>
                    {item.designation ? <CardTitle>{item.designation}</CardTitle>:null}
                    <CardText>{item.description}</CardText>
                </CardBody>
            </Card>
        );
    }
}

function Home(props){
    return(
        <div className="container">
            <div className="row align-items-start">
                <div className="col-12 col-md m-1">
                    <RenderCard item = {props.dish} isLoading={props.dishLoading} errMess={props.dishErrMess}/>
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item = {props.promotion} />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item = {props.leader} />
                </div>

            </div>
        </div>
    );
}

export default Home;