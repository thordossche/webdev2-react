import React from "react";
import { Link } from "react-router-dom";

function Card(props) {
  return (
    <div>
      <Link to={`/${props.list}`}>
        <div className="event-card -shadow">
          <h4>{props.list}</h4>
        </div>
      </Link>
    </div>
  );
}

export default function Home() {
  return (
    <div>
      <h2>Welcome to auctions!</h2>
      <Card list="auctions" />
      <Card list="users" />
    </div>
  );
}
