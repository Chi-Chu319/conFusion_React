import React, {Component} from 'react';
import { NavLink} from 'react-router-dom';
import { Nav, Navbar, NavbarBrand, Collapse, Jumbotron, NavItem, NavbarToggler} from 'reactstrap';


class Header extends Component{
    constructor(props){
        super(props)
        this.state = {
            isNavOpen: false
        }
        // methods in js are defined without context. this is why bind is needed.
        this.toggleNav = this.toggleNav.bind(this)
    }

    toggleNav(){
        this.setState(
            {
                isNavOpen : !this.state.isNavOpen
            }
        )
    }
    
    
    render(){
        return (
            // react fragment groups different html elements togather without an outer div
            <React.Fragment>
                {/* dark applies the css class navbar-dark which set the font to bright color */}
                <Navbar dark expand="md">
                    <div className="container">
                        {/* the / url will redirect to the default path /home */}
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand  className="mr-auto" href="/" ><img src='assets/images/logo.png' height="30" width="41" alt='Ristorante Con Fusion' /></NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    {/* a link with active class applied automatcally apply active class for each navItem and take path as parameter not like a which uses filepath */}
                                    <NavLink className="nav-link" to="/home"><span className="fa fa-home fa-lg"></span> Home</NavLink>    
                                </NavItem>    
                                <NavItem >
                                    <NavLink className="nav-link" to="/aboutus"><span className="fa fa-info fa-lg"></span> About Us</NavLink>    
                                </NavItem>   
                                <NavItem >
                                    <NavLink className="nav-link" to="/menu"><span className="fa fa-list fa-lg"></span> Menu</NavLink>    
                                </NavItem>   
                                <NavItem >
                                    <NavLink className="nav-link" to="/contactus"><span className="fa fa-address-card fa-lg"></span> Contact Us</NavLink>    
                                </NavItem>   
                            </Nav>
                        </Collapse>
   
                    </div>
                </Navbar>
                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>Ristorante con Fusion</h1>
                                <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!</p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
            </React.Fragment>
        );
    }
}

export default Header;