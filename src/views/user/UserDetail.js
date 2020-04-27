import React from "react";
import AxiosService from "../../services/AxiosService";
import DeleteButton from "../../base_components/DeleteButton";
import UpdateButton from "../../base_components/UpdateButton";
import ProductCard from "../../components/ProductCard";
import AuctionCard from "../../components/AuctionCard";
import OfferCard from "../../components/OfferCard";
import { Link } from "react-router-dom";

export default class AuctionDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: "",
        email: "",
      },
      products: [],
      auctions: [],
      offers: [],
    };
  }
  componentDidMount() {
    let products = [];
    let offers = [];
    let auctions = [];
    AxiosService.getType("user", this.props.match.params.id)
      .then((res) => {
        this.setState({ user: res.data });
        res.data.auctions.forEach((aucUrl) => {
          AxiosService.get(aucUrl)
            .then((response) => {
              auctions.push(response.data);
              this.setState({ auctions: auctions });
            })
            .catch((error) => {
              console.log("There was an error: " + error);
            });
        });

        res.data.products.forEach((productUrl) => {
          AxiosService.get(productUrl)
            .then((response) => {
              products.push(response.data);
              this.setState({ products: products });
            })
            .catch((error) => {
              console.log("There was an error: " + error);
            });
        });

        res.data.offers.forEach((offerUrl) => {
          AxiosService.get(offerUrl)
            .then((response) => {
              offers.push(response.data);
              this.setState({ offers: offers });
            })
            .catch((error) => {
              console.log("There was an error: " + error);
            });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleDelete() {
    AxiosService.delete(this.state.user.url).then(() => {
      this.props.history.push("/users");
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
                "/update/user/" + this.state.user.url.split("/").pop()
              )
            }
          />
        </div>
        <h3>{this.state.user.name}</h3>
        <h3>{this.state.user.email}</h3>
        <div>
          <h4>Auctions:</h4>
          {this.state.auctions.map((auction) => (
            <AuctionCard key={auction.url} auction={auction} />
          ))}
          <h4>Products:</h4>
          {this.state.products.map((product) => (
            <ProductCard key={product.url} product={product} />
          ))}
          <h4>Offers:</h4>
          {this.state.offers.map((offer) => (
            <Link
              key={offer.url}
              to={`/product/${offer.product.split("/").pop()}`}
            >
              <OfferCard offer={offer} noDelete={true} />
            </Link>
          ))}
        </div>
      </div>
    );
  }
}
