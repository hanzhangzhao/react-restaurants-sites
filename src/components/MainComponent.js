import React, { Component } from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import Header from './HearderComponent';
import Footer from './FooterComponent'
import { DISHES } from '../shared/dishes';


class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dishes: DISHES,
      selectedDish: null
    };
    console.log('Menu Component constructor invoked.')
  }

  componentDidMount() {
    console.log('Menu Component componentDidMount is invoked.')
  }

  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId });
  }

render() {
  return (
    <div>
      {/* <Navbar dark color="primary">
        <div className="container">
          <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
        </div>
      </Navbar> */}
      <Header />
      <Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)}/>
      <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} />
      <Footer />
    </div>
  );
}
}

export default Main;
