import { Switch, Route, Redirect} from 'react-router-dom'
import { Component } from 'react';
import { DISHES } from "../shared/dishes";
import { PROMOTIONS } from "../shared/promotions"
import { LEADERS } from "../shared/leaders"
import { COMMENTS } from "../shared/comments"
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent'
import Menu from "./MenuComponent";
import Contact from './ContactComponent'
import DishDetail from './DishDetailComponent';


class Main extends Component{
  constructor(props){
    super(props)
    this.state = {
      dishes:DISHES,
      promotions: PROMOTIONS,
      leaders: LEADERS,
      comments: COMMENTS
    }
  }



  render(){
      const HomePage = () => {
          return (
                <Home 
                dish = {this.state.dishes.filter((dish) => {return dish.featured} )[0]}
                promotion = {this.state.promotions.filter((promotion) => promotion.featured)[0]}
                leader = {this.state.leaders.filter((leader) => leader.featured)[0]}
                />
          )
      }

      const DishWithId = ({match}) =>{
          var dishIdInt = parseInt(match.params.dishId);
          return (
            <DishDetail 
            dish = {this.state.dishes.filter((dish) => dish.id === dishIdInt)[0]}
            comments = {this.state.comments.filter((c) => c.dishId === dishIdInt)}
            />
          );
      }
    return(
      <div>
          {/* header and footer will be applied to every page of the application */}
        <Header />
        {/*  enables grouping together several routes */}
        <Switch>
            {/* Now the problem here, when we go to http://app.com/users the router will go through all of our defined routes and return the FIRST match it finds. So in this case, it would find the Users route first and then return it. All good.

                But, if we went to http://app.com/users/create, it would again go through all of our defined routes and return the FIRST match it finds. React router does partial matching, so /users partially matches /users/create, so it would incorrectly return the Users route again!

                The exact param disables the partial matching for a route and makes sure that it only returns the route if the path is an EXACT match to the current url.

                So in this case, we should add exact to our Users route so that it will only match on /users: */}
            <Route path="/home" component={HomePage} />
            {/* exact to avoid partial match */}
            <Route exact path="/menu" component={() => <Menu dishes ={this.state.dishes} />} />
            <Route path="/menu/:dishId" component={DishWithId} />
            <Route exact path="/contactus" component={Contact} />
            {/* set the default path if there is no match */}
            <Redirect to="home" />
        </Switch>
        <Footer />
    </div>
    );
  }
}



export default Main;
