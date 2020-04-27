import React from "react";

export default class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
    };
    this.onFormChange = this.onFormChange.bind(this);
  }

  onFormChange(event) {
    this.props.onFormChange(event.target.name, event.target.value);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.onSubmit}>
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={this.props.user.name ? this.props.user.name : ""}
            onChange={this.onFormChange}
          />

          <p>
            <label>Email: </label>
            <input
              type="text"
              name="email"
              value={this.props.user.email ? this.props.user.email : ""}
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
