import React, { Component } from "react";
import { render } from "react-dom";
import Hello from "./Hello";
import "./style.css";
import { DataContext } from "./cxContext";
import { EventScatterChart } from "./EventScatter";

interface AppProps {}
interface AppState {
  name: string;
}

class App extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      name: "React"
    };
  }

  render() {
    return (
      <div>
        <Hello name={this.state.name} />
        <p>Start editing to see some magic happen :)</p>
        <DataContext>
          <EventScatterChart />
        </DataContext>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
