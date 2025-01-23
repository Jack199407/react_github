import React, { Component } from "react";
import Pubsub from "pubsub-js";
import "./index.css";

export default class List extends Component {
  state = {
    users: [],
    isFirst: true,
    isLoading: false,
    err: "",
  };

  componentDidMount() {
    this.token = Pubsub.subscribe("UserTopic", (msg, data) => {
      this.setState(data);
    });
  }

  componentWillUnmount() {
    Pubsub.unsubscribe(this.token);
  }
  render() {
    const { users, isFirst, isLoading, err } = this.state;
    return (
      <div className="row">
        {isFirst ? (
          <h2>Welcome, input keywords, then search</h2>
        ) : isLoading ? (
          <h2>Loading...</h2>
        ) : err ? (
          <h2 style={{ color: "red" }}>{err}</h2>
        ) : (
          users.map((userObj) => {
            return (
              <div className="card" key={userObj.id}>
                <a rel="noreferrer" href={userObj.html_url} target="_blank">
                  <img
                    alt="react"
                    src={userObj.avatar_url}
                    style={{ width: "100px" }}
                  />
                </a>
                <p className="card-text">{userObj.login}</p>
              </div>
            );
          })
        )}
      </div>
    );
  }
}
