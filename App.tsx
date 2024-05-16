import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {Svg, Defs, LinearGradient, Stop, Rect} from 'react-native-svg';
import SimpleLineChart from './components/graphs/SimpleLineChart';
import ScrollableLineChart from './components/graphs/ScrollableLineChart';
import AudioVisual from './components/audio/AudioVisualizer';

const temperatureChartData = {
  labels: [
    'Monday 1/1/24',
    'Tuesday 1/2/24',
    'Wednesday 1/3/24',
    'Thursday 1/4/24',
    'Friday 1/5/24',
    'Saturday 1/6/24',
    'Sunday 1/7/24',
  ],
  datasets: [
    {
      data: [59, 51, 53, 67, 71, 68, 66],
    },
  ],
};

const temperatureChartConfig = {
  backgrounColor: 'white',

  backgroundGradientFrom: 'white',
  backgroundGradientTo: 'white',
  backgroundGradientFromOpacity: 0,
  backgroundGradientToOpacity: 0,

  color: (opacity = 1) => 'green',
  //   {
  //   // Determine stroke color and data point color based on temperature threshold
  //   return opacity > 30 / 100 ? 'green' : 'red';
  // },
  labelColor: (opacity = 1) => 'black',
  fillShadowGradient: '#FFF',
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: 'green',
  },
};

const gradientColors = ['#FF0000', '#00FF00'];

const App = () => {
  return (
    <ScrollView style={{flex: 1, width: '100%'}}>
      <SimpleLineChart />
      <ScrollableLineChart
        data={[
          {label: 'January 2', value: 300},
          {label: 'February 3', value: 250},
          {label: 'March 4', value: 200},
          {label: 'April 5', value: 350},
          {label: 'May 6', value: 400},
          {label: 'June 7', value: 450},
          {label: 'July 8', value: 500},
          {label: 'July 8', value: 500},
          {label: 'July 8', value: 500},
          {label: 'July 8', value: 500},
          {label: 'July 8', value: 500},
        ]}
        splitLabel={true}
      />
      <AudioVisual />
    </ScrollView>
  );
};

export default App;
