import React from "react";
import OfferForm from "../../components/OfferForm.js";
import AxiosService from "../../services/AxiosService";

export default class UserCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offer: {},
      errors: [],
    };
  }

  onChildChange(name, value) {
    let newState = this.state.offer;
    newState[name] = value;
    this.setState({ offer: newState });
  }

  handleSubmit(event) {
    let errors = []
    event.preventDefault();
    let offer = this.state.offer;
    offer.product = this.props.location.state.producturl;
    offer.auction = this.props.location.state.auctionurl;
    AxiosService.create("offer", offer)
      .then(() => {
        this.props.history.push(
          "/product/" + this.props.location.state.producturl.split("/").pop()
        );
      })
      .catch((error) => {
        Object.keys(error.response.data).forEach((e) =>
          errors.push(error.response.data[e])
        );
      this.setState({errors: errors})
      });
  }

  render() {
    return (
      <div>
        <h2>Create Offer</h2>
        <OfferForm
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
