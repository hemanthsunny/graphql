import React, { Component } from 'react';
import QrReader from 'react-qr-reader';

class QRCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: 'No result'
    }
  }

  handleScan (data) {
    // console.log("DATA", data, "props", this.props)
  }

  render() {
    console.log("this.details", this.props)
    return (
      <div id="qr-code">
        // <QrReader        />
      </div>
    )
  }
}

export default QRCode;
