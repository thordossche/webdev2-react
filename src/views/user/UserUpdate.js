import React from "react";
import UserForm from "../../components/UserForm.js";
import AxiosService from "../../services/AxiosService";

export default class UserCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      userdata: {},
      errors: [],
    };
  }

  componentDidMount() {
    AxiosService.getType("user", this.props.match.params.id)
      .then((res) => {
        let userdata = { name: res.data.name, email: res.data.email };
        this.setState({ userdata: userdata, user: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChildChange(name, value) {
    let newState = this.state.userdata;
    newState[name] = value;
    this.setState({ userdata: newState });
  }

  handleSubmit(event) {
    event.preventDefault();

    AxiosService.update(this.state.user.url, this.state.userdata)
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
        <h2>Update User</h2>
        <UserForm
          user={this.state.userdata}
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
