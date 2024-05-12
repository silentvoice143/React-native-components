import React from 'react';

import {StyleSheet, Text, View, Pressable, SafeAreaView} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {Svg, Defs, LinearGradient, Stop, Rect} from 'react-native-svg';

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

const SimpleLineChart = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.sensorDataContainer, styles.shadow]}>
        <View style={styles.headerContainer}>
          <Text style={{color: 'black'}}>Humidity Live Feed</Text>
          <Pressable onPress={() => {}}>
            <Text>cancel</Text>
          </Pressable>
        </View>
        <View style={{position: 'relative'}}>
          <View style={{position: 'absolute', width: '100%'}}>
            <Svg width="100%" height={168}>
              <Defs>
                <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
                  <Stop offset="0" stopColor="#ffffff" stopOpacity="1" />
                  <Stop offset="0.45" stopColor="#dedeff" stopOpacity="1" />
                  <Stop offset="0.6" stopColor="#dedeff" stopOpacity="1" />
                  <Stop offset="1" stopColor="#ffffff" stopOpacity="1" />
                </LinearGradient>
              </Defs>
              <Rect x="10" y="10" width="100%" height="168" fill="url(#grad)" />
            </Svg>
          </View>
          <View
            style={{
              // backgroundColor: 'red',
              position: 'absolute',
              top: 7,
              height: 160,
              width: '100%',
              gap: 29,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={styles.lines}>
              <Svg width="100%" height="100%">
                <Defs>
                  <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <Stop offset="0%" stopColor="#ffffff" />
                    <Stop offset="33%" stopColor="#000000" />
                    <Stop offset="70%" stopColor="#000000" />
                    <Stop offset="100%" stopColor="#ffffff" />
                  </LinearGradient>
                </Defs>
                <Rect
                  x="0"
                  y="0"
                  width="100%"
                  height="100%"
                  fill="url(#grad)"
                />
              </Svg>
            </View>
            <View style={styles.lines}>
              <Svg width="100%" height="100%">
                <Defs>
                  <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <Stop offset="0%" stopColor="#ffffff" />
                    <Stop offset="33%" stopColor="#000000" />
                    <Stop offset="70%" stopColor="#000000" />
                    <Stop offset="100%" stopColor="#ffffff" />
                  </LinearGradient>
                </Defs>
                <Rect
                  x="0"
                  y="0"
                  width="100%"
                  height="100%"
                  fill="url(#grad)"
                />
              </Svg>
            </View>
            <View style={styles.lines}>
              <Svg width="100%" height="100%">
                <Defs>
                  <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <Stop offset="0%" stopColor="#ffffff" />
                    <Stop offset="33%" stopColor="#000000" />
                    <Stop offset="70%" stopColor="#000000" />
                    <Stop offset="100%" stopColor="#ffffff" />
                  </LinearGradient>
                </Defs>
                <Rect
                  x="0"
                  y="0"
                  width="100%"
                  height="100%"
                  fill="url(#grad)"
                />
              </Svg>
            </View>
            <View style={styles.lines}>
              <Svg width="100%" height="100%">
                <Defs>
                  <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <Stop offset="0%" stopColor="#ffffff" />
                    <Stop offset="33%" stopColor="#000000" />
                    <Stop offset="70%" stopColor="#000000" />
                    <Stop offset="100%" stopColor="#ffffff" />
                  </LinearGradient>
                </Defs>
                <Rect
                  x="0"
                  y="0"
                  width="100%"
                  height="100%"
                  fill="url(#grad)"
                />
              </Svg>
            </View>
          </View>
          <LineChart
            data={temperatureChartData}
            segments={5}
            width={1000}
            height={200}
            chartConfig={temperatureChartConfig}
            yAxisSuffix="℃"
            yAxisInterval={10}
            withVerticalLines={false}
            withHorizontalLines={false}
            withShadow={false}
            xLabelsOffset={0}
            withVerticalLabels={false}

            // formatXLabel={function (label) {
            //   label.endsWith('sat');
            // }}
          />
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 65,
              gap: 33,
              marginTop: -30,
            }}>
            {temperatureChartData.labels.map((item, idx) => {
              const [day, date] = item.split(' ');
              return (
                <View key={idx} style={{width: 100}}>
                  <Text style={{fontSize: 16, color: 'black'}}>{day}</Text>
                  <Text style={{fontSize: 16, color: 'black'}}>{date}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    width: '100%',
  },
  lines: {
    width: '80%',
    // backgroundColor: 'black',
    height: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 27,
    gap: 82,
  },
  sensorDataContainer: {
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 30,
    backgroundColor: 'white',
    elevation: 1,
  },
  shadow: {
    shadowColor: 'violet',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 2.62,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default SimpleLineChart;
