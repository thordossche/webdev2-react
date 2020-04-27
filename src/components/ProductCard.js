import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard(props){
      return (
        <div>
          <Link to={`/product/${props.product.url.split("/").pop()}`}>
            <div className="event-card -shadow">
              <h4>{props.product.title}</h4>
            </div>
          </Link>
        </div>
      );
  }