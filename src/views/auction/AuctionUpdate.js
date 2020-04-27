import React from "react";
import AuctionForm from "../../components/AuctionForm.js";
import AxiosService from "../../services/AxiosService";

export default class AuctionUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auctionData: null,
      auction: null,
      errors: []
    };
  }

  componentDidMount(){
    AxiosService.getType('auction',  this.props.match.params.id)
    .then(res => {
      let auctionData = {
      name: res.data.name,
      location: res.data.location,
      organisers: res.data.organisers,
      start: res.data.start,
      end: res.data.end,
      deadlineOffers: res.data.deadlineOffers,
      deadlineProducts: res.data.deadlineProducts
    }
      this.setState({auction: res.data, auctionData: auctionData})
    })
    .catch(error => {
      console.log('There is an error:' + error.response)
    })
  }

  onChildChange(name, value){
    let newState = this.state.auctionData;
    newState[name] = value;
    this.setState({ auctionData: newState})
  }

  //todo: moeten ze allemaal zo zijn of mag je event.preventDefault skippen
  handleSubmit(event) {
    event.preventDefault();
      let errors = []
      AxiosService.update(this.state.auction.url, this.state.auctionData)
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
    //anders rendert hij auction form voordat er een auction is
      if (this.state.auction){
        return (
        <div>
            <h2>Update Auction</h2>
            <AuctionForm auction={this.state.auctionData} errors={this.state.errors} onFormChange={(name, val) => this.onChildChange(name, val)}/>
            <form onSubmit={event => this.handleSubmit(event)}>
                <input type="submit" value="submit" /> 
            </form>
        </div>
        );
      }
      else {
          return null;
      }
  }
}
