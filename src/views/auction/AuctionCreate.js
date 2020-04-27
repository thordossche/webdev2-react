import React from "react";
import AuctionForm from "../../components/AuctionForm.js";
import AxiosService from "../../services/AxiosService";

export default class AuctionCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auction: {
        name: "",
        location: "",
        organisers: [],
        start: null,
        end: null,
        deadlineOffers: null,
        deadlineProducts: null
      },
      errors: []
    };
  }

  onChildChange(name, value){
    let newState = this.state.auction;
    newState[name] = value;
    this.setState({ auction: newState})
  }

  //todo: moeten ze allemaal zo zijn of mag je event.preventDefault skippen
  handleSubmit(event) {
    event.preventDefault();
      let errors = []
      AxiosService.create('auction', this.state.auction)
        .then( response => {
          this.props.history.push("/auction/" + response.data.url.split("/").pop() );
        })
        .catch(error => {
          Object.keys(error.response.data).forEach(e =>
            errors.push(error.response.data[e])
          )
          this.setState({errors: errors})
        })
   }


  render() {
    return (
      <div>
        <h2>Create Auction</h2>
        <AuctionForm auction={this.state.auction} errors={this.state.errors} onFormChange={(name, val) => this.onChildChange(name, val)}/>
        <form onSubmit={e => this.handleSubmit(e)}>
            <input type="submit" value="submit" /> 
        </form>
      </div>
    );
  }
}
