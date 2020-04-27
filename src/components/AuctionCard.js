import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";


function date(d) {
  return moment(d).format("MMMM Do YYYY");
}

export default class AuctionCard extends React.Component {
    render() {
      return (
        <div>
          <Link to={`/auction/${this.props.auction.url.split("/").pop()}`}>
            <div className="event-card -shadow">
              <h4>{this.props.auction.name}</h4>
              <span>
                {date(this.props.auction.start)} - {date(this.props.auction.end)}
              </span>
            </div>
          </Link>
        </div>
      );
    }
  }