import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

const flynns = { lat: 37.3884, lon: -118.295, code: "CAZ521", wfo: "VEF" };
const paiute = { lat: 37.5314, lon: -118.279, code: "CAZ073", wfo: "REV" };
const mammoth = {lat:37.63, lon: 119.03, wfo: 'REV', zcode='CAZ073'}

class App extends Component {
  render() {
    const flynnsModel = <NoaaModel loc={flynns} />;
    const paiuteLaunchModel = <NoaaModel loc={paiute} />;
    const mammothModel = <NoaaModel loc={mammoth} />;
    const whiteLive = <img src="https://wrcc.dri.edu/cgi-bin/g2sage.pl?wmtn" />;
    const barLive = <img src="https://wrcc.dri.edu/cgi-bin/g2sage.pl?barc" />;
    return (
      <div className="container">
        <LabeledImage title="Flynns" src={flynnsModel} />
        <LabeledImage title="Paiute" src={paiuteLaunchModel} />
        <LabeledImage title="White Mountain [Paiute]" src={whiteLive} />
        <LabeledImage title="Mount Barcroft [Paiute]" src={barLive} />
        <LabeledImage title="Mammoth Mountain" src={mammothModel} />
      </div>
    );
  }
}

class LabeledImage extends Component {
  constructor({ title, src }) {
    super();
    this.title = title;
    this.src = src;
  }
  render() {
    return (
      <div className="section">
        <h3>{this.title}</h3>
        {this.src}
      </div>
    );
  }
}

class NoaaModel extends Component {
  constructor({ loc }) {
    super();
    const { lat, lon, code, wfo } = loc;
    if (lat == null || lon == null) {
      debugger;
      throw Error("lat lon undefined");
    }
    this.imgUrl = `https://forecast.weather.gov/meteograms/Plotter.php?lat=${lat}&lon=${lon}&wfo=${wfo}&zcode=${code}&gset=18&gdiff=5&unit=0&tinfo=PY8&ahour=0&pcmd=11011111010000000000000000000000000000000000000000000000000&lg=en&indu=1!1!1!&dd=&bw=&hrspan=48&pqpfhr=6&psnwhr=6`;
    this.imgHref = `https://forecast.weather.gov/MapClick.php?lat=${lat}&lon=${lon}`;
  }
  render() {
    return (
      <a href={this.imgHref}>
        <img src={this.imgUrl} />
      </a>
    );
  }
}

export default App;
