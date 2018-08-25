import React, { Component } from "react";
import ReactDOM from "react-dom";

class App extends Component {
  state = { clickCounts: {} };

  onClick = e => {
    e.persist();
    const clickCounts = { ...this.state.clickCounts };
    let clickCount = +clickCounts[e.target.name] || 0;
    clickCounts[e.target.name] = ++clickCount;

    // this.setState({ clickCounts });
    this.setState({ clickCounts }, () =>
      console.log(
        `Button Name (▶️️ inside callback) = `,
        this.state.clickCounts
      )
    );
    console.log(
      `Button Name (◀️ outside callback) = ${e.target.name}`,
      this.state.clickCounts
    );

    // ⚠️ NOT recommended! ⚠️
    // setTimeout(() => {
    //   console.log(
    //     `Button Name (⏳ setTimeout) = ${e.target.name}`,
    //     this.state.clickCounts
    //   );
    // }, 100);
  };

  componentDidUpdate(prevProps, prevState) {
    console.log(
      `this.state.clickCounts(♻️ componentDidUpdate)`,
      this.state.clickCounts
    );
  }

  render() {
    const buttons = [1, 2, 3].map(id => (
      <button
        key={id}
        name={`button${id}`}
        onClick={this.onClick}
      >{`Button #${id}`}</button>
    ));

    return <div className="App">{buttons}</div>;
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
