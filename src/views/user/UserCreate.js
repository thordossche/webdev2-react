import React from "react";
import UserForm from "../../components/UserForm.js";
import AxiosService from "../../services/AxiosService";

export default class UserCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { name: "", email: "" },
      errors: [],
    };
  }

  onChildChange(name, value) {
    let newState = this.state.user;
    newState[name] = value;
    this.setState({ user: newState });
  }

  handleSubmit(event) {
    event.preventDefault();
    AxiosService.create("user", this.state.user)
      .then((response) => {
        this.props.history.push("/user/" + response.data.url.split("/").pop());
      })
      .catch((error) => {
        let errors = [];
        Object.keys(error.response.data).forEach((e) =>
          errors.push(error.response.data[e])
        );
        this.setState({ errors: errors });
      });
  }

  render() {
    return (
      <div>
        <h2>Create User</h2>
        <UserForm
          user={this.state.user}
          errors={this.state.errors}
          onFormChange={(name, val) => this.onChildChange(name, val)}
        />
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input type="submit" value="submit" />
        </form>
      </div>
    );
  }
}
