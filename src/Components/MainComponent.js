import { Switch, Route, Redirect, withRouter} from 'react-router-dom'
import { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent'
import Menu from "./MenuComponent";
import Contact from './ContactComponent'
import DishDetail from './DishDetailComponent';
import About from './AboutComponent';
import { connect } from 'react-redux';
import { postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders, postFeedback } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { CSSTransition, TransitionGroup } from "react-transition-group"


// connect from react-redux connect components to redux store.
const mapStateToProps = (state)=>{
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

// dispatch the addcomment action to modify the state
const mapDispatchToProps = (dispatch)=>({
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  // feedback is the state wrapped by createForm in the store
  resetFeedbackForm: ()=>dispatch(actions.reset("feedback")),
  fetchDishes: () => dispatch(fetchDishes()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
  fetchComments: () => dispatch(fetchComments()),
  postFeedback: (feedback) => dispatch(postFeedback(feedback))
});

class Main extends Component{
  constructor(props){
    super(props)
  }

  componentDidMount(){
    // start fetching dishes only when the main component is mounted
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchDishes();
    this.props.fetchLeaders();
  }


  render(){
      const HomePage = () => {
          return (
                <Home 
                dish = {this.props.dishes.dishes.filter((dish) => {return dish.featured} )[0]}
                dishLoading = {this.props.dishes.isLoading}
                dishErrMess = {this.props.dishes.errMess}
                promotion = {this.props.promotions.promotions.filter((promotion) => promotion.featured)[0]}
                promoLoading = {this.props.promotions.isLoading}
                promoErrMess = {this.props.promotions.errMess}
                leader = {this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
                leaderLoading = {this.props.leaders.isLoading}
                leaderErrMess = {this.props.leaders.errMess}
                />
          )
      }

      const DishWithId = ({match}) =>{
          var dishIdInt = parseInt(match.params.dishId);
          return (
            <DishDetail 
            dish = {this.props.dishes.dishes.filter((dish) => dish.id === dishIdInt)[0]}
            isLoading = {this.props.dishes.isLoading}
            errMess = {this.props.dishes.errMess}
            comments = {this.props.comments.comments.filter((c) => c.dishId === dishIdInt)}
            commentsErrMess = {this.props.comments.errMess}
            postComment = {this.props.postComment}
            />
          );
      }
    return(
      <div>
          {/* header and footer will be applied to every page of the application */}
        <Header />
        {/*  enables grouping together several routes */}
          <TransitionGroup>
            <CSSTransition key={this.props.location.key} classNames="page" timeout={200}>
              <Switch>
                {/* Now the problem here, when we go to http://app.com/users the router will go through all of our defined routes and return the FIRST match it finds. So in this case, it would find the Users route first and then return it. All good.

                    But, if we went to http://app.com/users/create, it would again go through all of our defined routes and return the FIRST match it finds. React router does partial matching, so /users partially matches /users/create, so it would incorrectly return the Users route again!

                    The exact param disables the partial matching for a route and makes sure that it only returns the route if the path is an EXACT match to the current url.

                    So in this case, we should add exact to our Users route so that it will only match on /users: */}
                <Route path="/home" component={HomePage} />
                {/* exact to avoid partial match */}
                <Route exact path="/menu" component={() => <Menu dishes ={this.props.dishes} />} />
                <Route path="/menu/:dishId" component={DishWithId} />
                <Route exact path="/aboutus" component={() => <About leaders={this.props.leaders} />} />
                <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback}/>} />
                {/* set the default path if there is no match */}
                <Redirect to="home" />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        <Footer />
    </div>
    );
  }
}



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
