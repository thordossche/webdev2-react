import React from "react";
import AxiosService from "../services/AxiosService";
import DeleteButton from "../base_components/DeleteButton";

export default class OfferCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offer: this.props.offer,
      buyer: "",
    };
  }

  handleDelete() {
    AxiosService.delete(this.state.offer.url)
      .then(() => window.location.reload())
      .catch((error) => console.log(error));
  }

  componentDidMount() {
    AxiosService.get(this.props.offer.buyer)
      .then((response) => {
        this.setState({ buyer: response.data.name });
      })
      .catch((error) => {
        console.log("There is an error:" + error.response);
      });
  }

  render() {
    return (
      <div className="event-card -shadow">
        <h4>Buyer: {this.state.buyer}</h4>
        <h4>Offer: ${this.state.offer.price}</h4>
        {this.props.noDelete ? null : (
          <DeleteButton onClick={() => this.handleDelete()} />
        )}
      </div>
    );
  }
}
