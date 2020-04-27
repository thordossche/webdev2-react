import React from "react";
import ProductForm from "../../components/ProductForm.js";
import AxiosService from "../../services/AxiosService";

export default class ProductCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      errors: [],
    };
  }

  onChildChange(name, value) {
    let newState = this.state.product;
    newState[name] = value;
    this.setState({ product: newState });
  }

  handleSubmit(event) {
    event.preventDefault();
    let auction = [];
    AxiosService.getType(
      "auction",
      this.props.location.state.auction.url.split("/").pop()
    )
      .then((response) => {
        auction = response.data;
        return AxiosService.create("product", this.state.product);
      })
      .then((response) => {
        if (Array.isArray(auction.products)) {
          auction.products.push(response.data.url);
        } else {
          auction.products = [auction.products];
          auction.products.push(response.data.url);
        }
        return AxiosService.update(auction.url, {
          products: auction.products,
        });
      })
      .then((response) => {
        setTimeout(
          function () {
            this.props.history.push(
              "/auction/" + response.data.url.split("/").pop()
            );
          }.bind(this),
          500
        );
      })
      .catch((error) => {
        let errors = [];
        Object.keys(error.response.data).forEach((e) =>
          errors.push(error.response.data[e])
        );
        this.setState({ errors: errors });
      });
  }

  render() {
    return (
      <div>
        <h2>Create Product</h2>
        <ProductForm
          product={this.state.product}
          errors={this.state.errors}
          onFormChange={(name, val) => this.onChildChange(name, val)}
        />
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input type="submit" value="submit" />
        </form>
      </div>
    );
  }
}
