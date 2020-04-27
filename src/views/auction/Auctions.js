import React from "react";
import AxiosService from "../../services/AxiosService";
import AddButton from "../../base_components/AddButton";
import AuctionCard from "../../components/AuctionCard";

export default class Auctions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auctions: [],
    };
  }

  componentDidMount() {
    const auctions = [];
    AxiosService.getAuctions()
      .then((response) => {
        response.data.auctions.forEach((url) => {
          AxiosService.get(url)
            .then((res) => {
              auctions.push(res.data);
              this.setState({ auctions: auctions });
            })
            .catch((error) => {
              console.log(error);
            });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <h2>Auctions</h2>
        <AddButton onClick={() => this.props.history.push("/create/auction")} />
        {this.state.auctions.map((auction) => (
          <AuctionCard key={auction.url} auction={auction} />
        ))}
      </div>
    );
  }
}
