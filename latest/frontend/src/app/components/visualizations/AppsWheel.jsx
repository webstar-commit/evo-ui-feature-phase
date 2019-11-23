import buildVisualization from './AppsWheel.d3';

import React from 'react';
import _ from 'lodash';
import * as d3 from "d3";
import ReactFauxDOM from 'react-faux-dom';
import ReactDOM from 'react-dom';

function prepareData(data) {
  var idata = [[], [], []];
    // console.log("logging data passed to prepareData")
    // console.log(data)
    // console.log("toString prepareData ")
    // console.log(data.toString());
    var parsedJSON= JSON.parse(data);
     // console.log("parsed json")
     //  console.log(parsedJSON);
  parsedJSON.forEach(function (d) {
//      data.forEach(function (d) {
    if (d.apps != null) {
      d.apps.forEach(function (d1) {
        if (d1 != null && d1.length == 1) {
          var appObj = d1[0];
          if (appObj.appType == 'Database') {
            idata[0][idata[0].length] = appObj;
          } else if (appObj.appType == 'Web Engine') {
            idata[1][idata[1].length] = appObj;
          } else {
            idata[2][idata[2].length] = appObj;
          }
        }
      });
    }
  });
  return idata;
}

export default class AppsWheel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visualization: null
    };
  }

  render() {
    return <div className="apps-wheel-visualization">
      { this.state.visualization }
    </div>;
  }

  /**
   * Performs initial D3 diagram building
   */
  componentDidMount() {
    const containerElement = ReactFauxDOM.createElement('section');
    setTimeout(() => {
      this._buildVisualization(containerElement);
    }, 0);
  }

  /**
   * Performs D3 diagram rebuilding each time when component's properties are updated
   * @param prevProps
   * @param prevState
   */
  componentDidUpdate(prevProps, prevState) {
    const containerElement = ReactFauxDOM.createElement('section');
    setTimeout(() => {
      this._buildVisualization(containerElement);
    }, 0);
  }

  _buildVisualization(containerElement) {
    if (this.props.visualizationData && this.props.visualizationData.length > 0) {
      const preparedData = prepareData(this.props.visualizationData);

      try {
        const componentDomNode = ReactDOM.findDOMNode(this);
        buildVisualization(d3.select(containerElement), componentDomNode.getBoundingClientRect(), preparedData, 'Apps Wheel');
        this.setState({
          visualization: containerElement.toReact()
        });
      } catch (e) {
        
      }
    } else {
      // We can render loading spinner here if necessary
    }
  }
}

