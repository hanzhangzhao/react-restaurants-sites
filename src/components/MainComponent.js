import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import Header from './HearderComponent';
import Footer from './FooterComponent'
import { DISHES } from '../shared/dishes';
import { Switch, Route, Redirect } from 'react-router-dom';


class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dishes: DISHES,
      // selectedDish: null
    };
    console.log('Menu Component constructor invoked.')
  }

  componentDidMount() {
    console.log('Menu Component componentDidMount is invoked.')
  }

  // onDishSelect(dishId) {
  //   this.setState({ selectedDish: dishId });
  // }

render() {

  const HomePage = () => {
    return(
      <Home />
    )
  }

  return (
    <div>
      {/* <Navbar dark color="primary">
        <div className="container">
          <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
        </div>
      </Navbar> */}
      <Header />
      {/* <Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)}/>
      <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} /> */}
      <Switch>
        <Route path="/home" component={HomePage} />
        <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes} />} />    {/* pass in a props to the menu component */}
        <Redirect to="/home" />
      </Switch>
      <Footer />
    </div>
  );
}
}

export default Main;
