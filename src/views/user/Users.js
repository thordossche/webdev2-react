import React from "react";
import AxiosService from "../../services/AxiosService";
import { Link } from "react-router-dom";
import AddButton from "../../base_components/AddButton";

class UserCard extends React.Component {
  render() {
    return (
      <div>
        <Link to={`/user/${this.props.user.url.split("/").pop()}`}>
          <div className="event-card -shadow">
            <h4>{this.props.user.name}</h4>
          </div>
        </Link>
      </div>
    );
  }
}

export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    let users = [];
    AxiosService.getUsers()
      .then((response) => {
        response.data.users.forEach((url) => {
          AxiosService.get(url)
            .then((response) => {
              users.push(response.data);
              this.setState({ users: users });
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
      <div class="container">
        <h2 class="title">Users</h2>
        <AddButton onClick={() => this.props.history.push("/create/user")} />
        {this.state.users.map((user) => (
          <UserCard key={user.url} user={user} />
        ))}
      </div>
    );
  }
}
