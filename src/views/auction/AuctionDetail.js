import React from "react";
import moment from "moment";
import AxiosService from "../../services/AxiosService";
import DeleteButton from "../../base_components/DeleteButton";
import UpdateButton from "../../base_components/UpdateButton";
import AddButton from "../../base_components/AddButton";
import ProductCard from "../../components/ProductCard";

function date(d) {
  return moment(d).format("MMMM Do YYYY");
}

export default class AuctionDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auction: {},
      organisers: [],
      products: [],
      auctionID: null,
    };
  }

  componentDidMount() {
    AxiosService.getType("auction", this.props.match.params.id)
      .then((res) => {
        let organisers = [];
        let products = [];
        this.setState({
          auction: res.data,
          auctionID: res.data.url.split("/").pop(),
        });
        res.data.organisers.forEach((organiserUrl) => {
          AxiosService.get(organiserUrl)
            .then((response) => {
              organisers.push(response.data);
              this.setState({ organisers: organisers });
            })
            .catch((error) => {
              console.log("There is an error:" + error.response);
            });
        });
        res.data.products.forEach((url) => {
          AxiosService.get(url)
            .then((response) => {
              products.push(response.data);
              this.setState({ products: products });
            })
            .catch((error) => {
              console.log("There is an error:" + error.response);
            });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleDelete() {
    AxiosService.delete(this.state.auction.url).then(() => {
      this.props.history.push("/auctions");
    });
  }

  render() {
    return (
      <div>
        <div>
          <DeleteButton onClick={() => this.handleDelete()} />
          <UpdateButton
            onClick={() =>
              this.props.history.push("/update/auction/" + this.state.auctionID)
            }
          />
        </div>
        <h2>{this.state.auction.name}</h2>
        <span>
          {date(this.state.auction.start)} until {date(this.state.auction.end)}
        </span>
        <br />
        <br />
        <span>@ {this.state.auction.location}</span>
        <h5>Organized by</h5>
        {this.state.organisers.map((org) => (
          <li key={org.url}>{org.name}</li>
        ))}
        <h5>Deadlines</h5>
        <p>
          You can add offers until {date(this.state.auction.deadlineOffers)}
        </p>
        <p>
          You can add/change products until{" "}
          {date(this.state.auction.deadlineProducts)}
        </p>
        <div>
          <h5>Products</h5>
          <AddButton
            onClick={() =>
              this.props.history.push("/create/product", {
                auction: this.state.auction,
              })
            }
          />
          {this.state.products.map((product) => (
            <ProductCard key={product.url} product={product} />
          ))}
        </div>
      </div>
    );
  }
}
