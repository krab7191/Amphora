import React from "react";

export const Card = (props) => (
  <div className="card">
    <div className="card-header bg-primary" style={{color: '#fff'}}>
      <h5>{props.title}</h5>
    </div>
    <div className="card-body">
      {props.children}
    </div>
  </div>
);
