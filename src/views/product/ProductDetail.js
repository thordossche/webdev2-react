import React from "react";
import AxiosService from "../../services/AxiosService";
import DeleteButton from "../../base_components/DeleteButton";
import UpdateButton from "../../base_components/UpdateButton";
import AddButton from "../../base_components/AddButton";
import OfferCard from "../../components/OfferCard";

export default class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      seller: {},
      offers: [],
    };
  }

  componentDidMount() {
    AxiosService.getType("product", this.props.match.params.id)
      .then((response) => {
        let product = response.data;
        AxiosService.getType("user", product.seller.split("/").pop())
          .then((response) => {
            let seller = response.data;
            this.setState({ seller: seller, product: product });
          })
          .catch((error) => console.log(error));
        let offers = [];
        product.offers.forEach((url) => {
          AxiosService.get(url)
            .then((response) => {
              offers.push(response.data);
              this.setState({ offers: offers });
            })
            .catch((error) => console.log(error));
        });
      })
      .catch((error) => console.log(error));
  }

  handleDelete() {
    AxiosService.delete(this.state.product.url).then(() => {
      this.props.history.push(
        "/auction/" + this.state.product.auctions[0].split("/").pop()
      );
    });
  }

  render() {
    return (
      <div>
        <div>
          <DeleteButton onClick={() => this.handleDelete()} />
          <UpdateButton
            onClick={() =>
              this.props.history.push(
                "/update/product/" + this.state.product.url.split("/").pop()
              )
            }
          />
        </div>
        <h2>{this.state.product.title}</h2>
        <h5>Starting price: ${this.state.product.price}</h5>

        {this.state.product.seller ? (
          <h5>Seller: {this.state.seller.name}</h5>
        ) : null}

        <h5>Description</h5>
        <p>{this.state.product.text}</p>
        <h5>Current offers</h5>
        <AddButton
          onClick={() =>
            this.props.history.push("/create/offer", {
              producturl: this.state.product.url,
              auctionurl: this.state.product.auctions[0],
            })
          }
        />
        {this.state.offers.map((offer) => (
          <OfferCard key={offer.url} offer={offer} />
        ))}
      </div>
    );
  }
}
