import React from "react";
import AxiosService from "../services/AxiosService.js"

export default class AuctionForm extends React.Component {

  constructor (props){
    super(props);
    this.state = {
      users : [],
      organisers : props.auction.organisers
    };
    this.onFormChange = this.onFormChange.bind(this);
  }

  componentDidMount() {
    let users = this.state.users
    AxiosService.getUsers()
    .then(response => {
      response.data.users.forEach(url => {
        AxiosService.get(url)
          .then(response => {
            users.push(response.data)
            this.setState({users: users})
          })
          .catch(error => {
            console.log(error)
          })
      })
    })
    .catch(error => {
      console.log(error)
    })
  }


  onFormChange(event) {
    let organisers = this.state.organisers
    let index
    if (event.target.name === "organisers") {
      if (event.target.checked) {
        organisers.push(event.target.value)
      } else {
        index = organisers.indexOf(event.target.value)
        organisers.splice(index, 1)
      }
      this.props.onFormChange(event.target.name, organisers)
      this.setState({ organisers: organisers })
    }
    else {
      this.props.onFormChange(event.target.name, event.target.value);
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.onSubmit}>
          <label> Auction Name: </label>
            <input type="text" name="name" value={this.props.auction.name} onChange={this.onFormChange} />

          <p>
        <label>Location: </label>
        <input type="text"  name="location" value={this.props.auction.location}  placeholder="e.g. Gent" onChange={this.onFormChange} />
      </p>
      <p>
      <label>Organisers: </label>
      </p>
       <div className="scrollable">
       {this.state.users.map(user => 
       <ul key={user.url}>
          <label>
            <input value={user.url} type="checkbox" name="organisers" checked={this.state.organisers.includes(user.url)} onChange={this.onFormChange}/>
            {user.name}
          </label>
          </ul>
          )}
        </div>

      <p>
        <label>Starting date: </label>
        <input type="datetime"  name="start" value={this.props.auction.start}  placeholder="YYYY/MM/DD" onChange={this.onFormChange}/>
      </p>
      <p>
        <label> Ending date: </label>
        <input type="datetime"  name="end" value={this.props.auction.end} placeholder="YYYY/MM/DD" onChange={this.onFormChange}/>
      </p>
      <p>
        <label> Deadline for products: </label>
        <input type="datetime"  name="deadlineProducts" value={this.props.auction.deadlineProducts}  placeholder="YYYY/MM/DD" onChange={this.onFormChange}/>
      </p>
      <p>
        <label>Deadline for offers: </label>
        <input type="datetime"  name="deadlineOffers" value={this.props.auction.deadlineOffers} placeholder="YYYY/MM/DD" onChange={this.onFormChange}/>
      </p>
        </form>
        {
          this.props.errors.length < 1
          ? null
          : (
            <div>
            <p> Please solve following errors: </p>
            <ul>
          {this.props.errors.map((err) => (
            <li key={err}>{err}</li>
          ))}
            </ul>
            </div>
          )
        }
        </div>
    );
  }
}
