import React, { Component } from "react";
import Pubsub from "pubsub-js";
import axios from "axios";
import "./index.css";

export default class Search extends Component {
  search = () => {
    const { value } = this.keyWordEl;
    if (value.trim() === "" || value === null) {
      alert("input can't be empty");
      return;
    }
    Pubsub.publish("UserTopic", { isFirst: false, isLoading: true });
    axios.get(`https://api.github.com/search/users?q=${value}`).then(
      (response) => {
        Pubsub.publish("UserTopic", {
          isLoading: false,
          users: response.data.items,
        });
      },
      (error) => {
        Pubsub.publish("UserTopic", { isLoading: false, err: error.message });
      }
    );
  };

  render() {
    return (
      <section className="jumbotron">
        <h3 className="jumbotron-heading">Search Github Users</h3>
        <div>
          <input
            ref={(c) => {
              this.keyWordEl = c;
            }}
            type="text"
            placeholder="enter the name you search"
          />
          &nbsp;
          <button onClick={this.search}>Search</button>
        </div>
      </section>
    );
  }
}
