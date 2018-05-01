import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Iframe from "./Iframe";

const flynns = { lat: 37.3884, lon: -118.295, code: "CAZ521", wfo: "VEF" };
const paiute = { lat: 37.5314, lon: -118.279, code: "CAZ073", wfo: "REV" };
const mammoth = { lat: 37.63, lon: -119.03, wfo: "REV", code: "CAZ073" };
const whiteMountain = {
  lat: 37.6387,
  lon: -118.2527,
  wfo: "REV",
  code: "CAZ073"
};

const waltsPoint = {
  lat: 36.4911,
  lon: -118.1549,
  wfo: "VEF",
  code: "CAZ519"
};

class App extends Component {
  render() {
    const flynnsModel = <NoaaModel loc={flynns} />;
    const paiuteLaunchModel = <NoaaModel loc={paiute} />;
    const mammothModel = <NoaaModel loc={mammoth} />;
    const mammothLive = (
      <Iframe
        position="relative"
        height="500px"
        url="http://patrol.mammothmountain.com/RptPage.aspx?Rpt=WGPH&Range=1440&GrpBy=60&RptRender=True&Location=SMT_WGPH"
      />
    );

    const bishopWindsAloft = (
      <Iframe
        position="relative"
        height="500px"
        url="http://www.usairnet.com/cgi-bin/Winds/Aloft.cgi?icao=BIH&hr=06"
      />
    );
    const whiteLive = <img src="https://wrcc.dri.edu/cgi-bin/g2sage.pl?wmtn" />;
    const barLive = <img src="https://wrcc.dri.edu/cgi-bin/g2sage.pl?barc" />;
    const whiteMountainModel = <NoaaModel loc={whiteMountain} />;
    const waltsModel = <NoaaModel loc={waltsPoint} />;

    const flynnsLive = <WundergroundImg stationId="KCABISHO50" />;
    return (
      <div className="container">
        <LabeledImage title="Flynns Forecast" src={flynnsModel} />
        <LabeledImage title="Flynns Live" src={flynnsLive} />
        <LabeledImage title="Paiute Launch Forecast" src={paiuteLaunchModel} />
        <LabeledImage
          title="White Mountain Forecast"
          src={whiteMountainModel}
        />
        <LabeledImage
          title="White Mountain Live [sometimes stale]"
          src={whiteLive}
        />
        <LabeledImage
          title="Mount Barcroft Live [sometimes stale]"
          src={barLive}
        />
        <LabeledImage title="Mammoth Mountain Forecast" src={mammothModel} />
        <LabeledImage
          title="Mammoth Mountain Live (in venturi)"
          src={mammothLive}
        />
        <LabeledImage title="Walts Point Forecast" src={waltsModel} />
        <LabeledImage title="Bishop Winds Aloft" src={bishopWindsAloft} />
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

class WundergroundImg extends Component {
  constructor({ stationId }) {
    super();
    this.imgUrl = `https://www.wunderground.com/cgi-bin/wxStationGraphAll?ID=${stationId}&showwind=1&showwinddir=1&type=3&cacheBuster=1524788397360`;
    this.imgHref = `https://www.wunderground.com/personal-weather-station/dashboard?ID=${stationId}`;
  }
  render() {
    return (
      <a href={this.imgHref}>
        <img src={this.imgUrl} />
      </a>
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
