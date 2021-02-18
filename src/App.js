import React, { Component } from "react";
import "./App.css";
import "h8k-components";
import ProductList from "./components/product-list";
import Cart from "./components/cart";

const title = "HackerShop";

class App extends Component {
  constructor() {
    super();
    const products = [...PRODUCTS].map((product, index) => {
      product.id = index + 1;
      product.image = `/images/items/${product.name.toLocaleLowerCase()}.png`;
      product.cartQuantity = 0;
      return product;
    });
    this.state = {
      cart: {
        items: [],
      },
      products,
    };
  }

  handleCartClick = (product) => {
    let cartItems = [...this.state.cart.items];
    cartItems.push({
      productId: product?.id,
      item: product?.name,
      quantity: 1,
    });
    this.setState({
      ...this.state,
      cart: {
        ...this.state.cart,
        items: cartItems,
      },
    });
  };

  hanldeIncreaseQuantity = (product) => {
    let cartItems = [...this.state.cart.items];
    cartItems = cartItems.map((item) => {
      if (item.productId == product.id) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      } else {
        return item;
      }
    });
    this.setState({
      ...this.state,
      cart: {
        ...this.state.cart,
        items: cartItems,
      },
    });
  };

  hanldeDecreaseQuantity = (product) => {
    let cartItems = [...this.state.cart.items];
    cartItems = cartItems.map((item) => {
      if (item.productId == product.id) {
        if (item.quantity > 1) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        } else {
          return null;
        }
      } else {
        return item;
      }
    });
    this.setState({
      ...this.state,
      cart: {
        ...this.state.cart,
        items: cartItems.filter((it) => it != null),
      },
    });
  };

  render() {
    return (
      <div>
        <h8k-navbar header={title}></h8k-navbar>
        <div className="layout-row shop-component">
          <ProductList
            products={this.state.products}
            cart={this.state.cart}
            handleCartClick={this.handleCartClick}
            hanldeIncreaseQuantity={this.hanldeIncreaseQuantity}
            hanldeDecreaseQuantity={this.hanldeDecreaseQuantity}
          />
          <Cart cart={this.state.cart} />
        </div>
      </div>
    );
  }
}

export const PRODUCTS = [
  {
    name: "Cap",
    price: 5,
  },
  {
    name: "HandBag",
    price: 30,
  },
  {
    name: "Shirt",
    price: 35,
  },
  {
    name: "Shoe",
    price: 50,
  },
  {
    name: "Pant",
    price: 35,
  },
  {
    name: "Slipper",
    price: 25,
  },
];
export default App;