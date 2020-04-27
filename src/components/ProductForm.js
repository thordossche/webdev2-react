import React from "react";
import AxiosService from "../services/AxiosService";

export default class ProductForm extends React.Component {
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
            {" "}
            <label>Title: </label>
            <input
              type="text"
              name="title"
              value={this.props.product.title ? this.props.product.title : ""}
              onChange={this.onFormChange}
            />
          </p>
          <p>
            <label>Description: </label>
            <textarea
              type="text"
              name="text"
              value={this.props.product.text ? this.props.product.text : ""}
              onChange={this.onFormChange}
            />
          </p>

          <p>
            <label>Seller:</label>
            <select
              name="seller"
              value={
                this.props.product.seller ? this.props.product.seller.url : ""
              }
              onChange={this.onFormChange}
            >
              <option />
              {this.state.users.map((user) => (
                <option key={user.url} value={user.url}>
                  {user.name}
                </option>
              ))}
            </select>
          </p>

          <p>
            <label>Price: </label>
            <input
              type="text"
              name="price"
              value={this.props.product.price ? this.props.product.price : ""}
              onChange={this.onFormChange}
            />
          </p>
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
