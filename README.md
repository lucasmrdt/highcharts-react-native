# highcharts-react-native

**Thank's to [TradingPal](https://camo.githubusercontent.com/12c283baeba17ad50bf7d03bdabb82a520e19ea0/687474703a2f2f692e67697068792e636f6d2f6c33765264577758696e316f6f4c4348532e676966) but imperfect for our project.**

📊Implementation of Highcharts in React Native via WebView API.

## Instalation
```js
npm i -S highcharts-react-native
```

## Usage
```js
import React from 'react';
import HighchartsWebView from 'highcharts-react-native';

export default class App extends React.PureComponent {
  render() {
    const configuration = {
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      series: [{
        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
      }],
    };

    return (
      <HighchartsWebView
        style={{ height: 300 }}
        config={configuration} />
    );
  }
}
```

## Props
| Name | Required | Type |
| ------------- | ------------- | ------------- |
| config | true | [Object](http://www.highcharts.com/docs/getting-started/your-first-chart)|
| options | false | [Object](https://api.highcharts.com/highcharts/lang)|
| style | false | Object |

