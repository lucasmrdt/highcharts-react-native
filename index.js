// @flow
// @from https://github.com/TradingPal/react-native-highcharts

import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  WebView,
  Image,
  Dimensions,
  Alert,
} from 'react-native';

const HTML_TEMPLATE = `
<html>
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0" />
  <style media="screen" type="text/css">
  #container {
    width:100%;
    height:100%;
    top:0;
    left:0;
    right:0;
    bottom:0;
    position:absolute;
    user-select: none;
    -webkit-user-select: none;
  }
  </style>
  <head>
    <script src="https://code.highcharts.com/highcharts.src.js"></script>
  </head>
  <body>
    <div id="container" />
    <script>
      window.addEventListener('load', function() {
        Highcharts.setOptions(%options);
        Highcharts.chart('container', %config);
      });
    </script>
  </body>
</html>`;

const styles = StyleSheet.create({
  full: {
    flex:1,
    backgroundColor:'transparent'
  }
});

type Props = {
  config: Object,
  options: Object,
  style?: any,
};

class HightChart extends React.PureComponent<Props> {
  static defaultProps = {
    options: {},
    style: null,
  };

  _jsonStringify = (json: Object) => (
    JSON.stringify(json, (key: string, value: any) => (
      typeof value === 'function' ? value.toString() : value
    ))
    // @from https://github.com/TradingPal/react-native-highcharts/issues/4
    .replace(/\\n/g, " ") // remove \n in string = ""
    .replace(/\"([^(\")"]+)\":/g, "$1: ") // remove {"chart":"chart"} = {chart:"chart"}
    .replace(/\"function/g, "function") // remove {chart:"function ...} = {chart:function ...}
    .replace(/}\"/g, "}") // remove {chart:function(){}"} = {chart:function(){}}
  );

  render() {
    const { config, options, style, ...props } = this.props;
    const html = (HTML_TEMPLATE
      .replace('%config', () => this._jsonStringify(config))
      .replace('%options', () => this._jsonStringify(options))
    );

    return (
      <View style={style}>
        <WebView
          style={styles.full}
          source={{ html: html, baseUrl: 'web/' }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          scalesPageToFit={true}
          scrollEnabled={false}
          automaticallyAdjustContentInsets={true}
          originWhitelist={['*']}
          {...props}
        />
      </View>
    );
  };
};

export default HightChart;
