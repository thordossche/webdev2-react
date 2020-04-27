import React from "react";
import ProductForm from "../../components/ProductForm.js";
import AxiosService from "../../services/AxiosService";

export default class ProductCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      productdata: {},
      errors: [],
    };
  }

  componentDidMount() {
    AxiosService.getType("product", this.props.match.params.id)
      .then((res) => {
        let productdata = {
          title: res.data.title, 
          text: res.data.text,
          seller: res.data.seller,
          price: res.data.price};
        this.setState({ productdata: productdata, product: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChildChange(name, value) {
    let newState = this.state.productdata;
    newState[name] = value;
    this.setState({ productdata: newState });
  }

  handleSubmit(event) {
    event.preventDefault();

    AxiosService.update(this.state.product.url, this.state.productdata)
      .then((response) => {
        this.props.history.push(
          "/product/" + response.data.url.split("/").pop()
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
        <h2>Update Product</h2>
        <ProductForm
          product={this.state.productdata}
          errors={this.state.errors}
          onFormChange={(name, val) => this.onChildChange(name, val)}
        />
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input type="submit" value="submit" />
        </form>
      </div>
    )
  }
}
