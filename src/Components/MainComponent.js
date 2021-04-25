import { Navbar, NavbarBrand, Jumbotron} from 'reactstrap';
import Menu from "./MenuComponent";
import DishDetail from "./DishDetailComponent";
import { Component } from 'react';
import { DISHES } from "../shared/dishes";
import Header from './HeaderComponent';
import Footer from './FooterComponent';


class Main extends Component{
  constructor(props){
    super(props)
    this.state = {
      dishes:DISHES,
      selectedDish: null
    }
  }

  onDishSelect(dishId){
    this.setState({ selectedDish: dishId});
}

  render(){
    return(
      <div>
        <Header />
        <Menu dishes = {this.state.dishes} onClick  = {(dishId)=>this.onDishSelect(dishId)}/>
        {/* The filter takes in a function reference which define contraints on the element inside the array. And return an array. Therefore, [0] needs to be added to access the element */}
        
        {/********************** 
         * Double equals (==) is a comparison operator, which transforms the operands having the same type before comparison.
         * 
         * So, when you compare string with a number, JavaScript converts any string to a number. 
         * An empty string is always converts to zero. A string with no numeric value is converts to NaN (Not a Number), which returns false.
         * 
         * 
         * === (Triple equals) is a strict equality comparison operator in JavaScript, which returns false for the values which are not of a similar type. 
         * This operator performs type casting for equality. If we compare 2 with "2" using ===, then it will return a false value.
         *
         */}
        
        <DishDetail dish = {this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]}/>
        <Footer />
    </div>
    );
  }
}



export default Main;
