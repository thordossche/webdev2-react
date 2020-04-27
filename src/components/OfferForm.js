import React from "react";
import AxiosService from "../services/AxiosService.js";

export default class OfferForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
    this.onFormChange = this.onFormChange.bind(this);
  }

  onFormChange(event) {
    this.props.onFormChange(event.target.name, event.target.value);
  }

  componentDidMount() {
    AxiosService.getUsers()
      .then((response) => {
        response.data.users.forEach((url) => {
          AxiosService.get(url)
            .then((res) => {
              let users = this.state.users.slice();
              users.push(res.data);
              this.setState({ users: users });
            })
            .catch((error) => console.log(error));
        });
      })
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.onSubmit}>
          <p>
            <label>Buyer:</label>
            <select name="buyer" onChange={this.onFormChange}>
              <option />
              {this.state.users.map((user) => (
                <option key={user.url} value={user.url}>
                  {user.name}
                </option>
              ))}
            </select>
          </p>
          <label>price: </label>
          <input type="text" name="price" onChange={this.onFormChange} />
        </form>
        {this.props.errors.length < 1 ? null : (
          <div>
            <p> Please solve following errors: </p>
            <ul>
              {this.props.errors.map((err) => (
                <li key={err}>{err}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}
