import React, { Component } from "react";
import "./index.css";
import axios from "axios";

export default class Search extends Component {
  search = () => {
    const { updateAppState } = this.props;
    const { value } = this.keyWordEl;
    updateAppState({ isFirst: false, isLoading: true });
    axios.get(`https://api.github.com/search/users?q=${value}`).then(
      (response) => {
        updateAppState({ isLoading: false, users: response.data.items });
      },
      (error) => {
        updateAppState({ isLoading: false, err: error.message });
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
