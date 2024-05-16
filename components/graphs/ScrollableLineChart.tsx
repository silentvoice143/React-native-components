import {View, Text, StyleSheet, Dimensions, Animated} from 'react-native';
import React, {Fragment, useEffect, useRef, useState} from 'react';
import {Circle, G, Line, Svg, Text as SvgText} from 'react-native-svg';

const window_width = Dimensions.get('window').width;

interface chartProps {
  containerHeight?: number;
  circleColor?: string;
  circleRadius?: number;
  axisColor?: string;
  strokeWidth: number;
  data: [label: string, value: number];
  labelAlign?: 'middle' | 'start' | 'end';
  hideXaxis?: true | false;
  hideYaxis?: true | false;
  hideXaxistick?: true | false;
  hideYaxistick?: true | false;
  hideXaxislabel?: true | false;
  splitter?: true | false;
  splitLabel?: true | false;
  offSetX?: number;
  offSetY?: number;
  yGap?: number;
  segment?: number;
  yStart?: number;
}

const ScrollableLineChart: React.FC<chartProps> = ({
  containerHeight = 400,
  circleColor = 'black',
  circleRadius = 2,
  axisColor = 'black',
  strokeWidth = 1,
  data,
  labelAlign = 'middle',
  hideXaxis = false,
  hideYaxis = false,
  hideXaxistick = false,
  hideYaxistick = false,
  hideXaxislabel = false,
  splitter,
  splitLabel = false,
  offSetX = 0,
  offSetY = 0,
  yGap = 0,
  yStart = 0,
}) => {
  const mx_left = 50;
  const my_bottom = 50;
  const padding_from_screenBorder = 20;
  const x_axis_x1_point = mx_left + offSetX;
  const x_axis_y1_point = containerHeight - my_bottom;
  const x_axis_x2_point = window_width - padding_from_screenBorder;
  const x_axis_y2_point = containerHeight - my_bottom;

  const y_axis_x1_point = mx_left;
  const y_axis_y1_point = padding_from_screenBorder;
  const y_axis_x2_point = mx_left;
  const y_axis_y2_point = containerHeight - my_bottom - offSetY;
  console.log(window_width);

  const y_min_value = 0;
  const y_max_value = Math.max.apply(
    Math,
    data.map((item, idx) => item.value),
  );

  const y_axis_actual_height = y_axis_y2_point - y_axis_y1_point;

  const gap_between_y_axis_tick =
    yGap !== 0
      ? yGap
      : (y_axis_actual_height - y_min_value - 20) / (data.length - 1);

  const [yAxisLablesData, setYAxisLabelsData] = useState<any[]>([
    0, 31, 62, 93, 124, 155, 186, 217, 248, 279, 310,
  ]);

  const gap_between_x_axis_tick =
    (x_axis_x2_point - x_axis_x1_point - 20) / (data.length - 1);

  const x_axis_animated_width = useRef(
    new Animated.Value(x_axis_x1_point),
  ).current;
  const y_axis_animated_width = useRef(
    new Animated.Value(y_axis_y2_point),
  ).current;
  const animated_circle_radius = useRef(new Animated.Value(0)).current;

  const AnimatedLine = Animated.createAnimatedComponent(Line);
  const AnimatedCircle = Animated.createAnimatedComponent(Circle);
  const AnimatedSvg = Animated.createAnimatedComponent(Svg);

  const start_x_y_axisAnimation = () => {
    Animated.timing(x_axis_animated_width, {
      toValue: x_axis_x2_point,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    Animated.timing(y_axis_animated_width, {
      toValue: y_axis_y1_point,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    Animated.timing(animated_circle_radius, {
      toValue: circleRadius,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  };

  const renderXYaxis = (xAxis, yAxis) => {
    console.log(xAxis, yAxis);
    return (
      <G key="x-axis y-axis">
        <AnimatedCircle
          key="x-axis x1y1-circle"
          cx={x_axis_x1_point}
          cy={x_axis_y1_point}
          fill={circleColor}
          r={circleRadius}
        />
        <AnimatedCircle
          key="x-axis x2y2-circle"
          cx={x_axis_x2_point}
          cy={x_axis_y2_point}
          fill={circleColor}
          r={animated_circle_radius}
        />
        <AnimatedCircle
          key="y-axis x1y1-circle"
          cx={y_axis_x1_point}
          cy={y_axis_y1_point}
          fill={circleColor}
          r={animated_circle_radius}
        />
        {!xAxis && (
          <AnimatedLine
            key="x-axis"
            x1={x_axis_x1_point}
            y1={x_axis_y1_point}
            x2={x_axis_animated_width}
            y2={x_axis_y2_point}
            stroke={axisColor}
            strokeWidth={strokeWidth}
          />
        )}
        {!yAxis && (
          <AnimatedLine
            key="y-axis"
            x1={y_axis_x1_point}
            y1={y_axis_animated_width}
            x2={y_axis_x2_point}
            y2={y_axis_y2_point}
            stroke={axisColor}
            strokeWidth={strokeWidth}
          />
        )}
      </G>
    );
  };

  const render_xAxis_label_and_tick = (
    xLabel,
    xTick,
    splitter = ' ',
    splitLabel = false,
  ) => {
    // console.log(splitLabel);
    return (
      <G key="x axis label and tick">
        {data.map((item, idx) => {
          const x_axis_point = x_axis_x1_point + gap_between_x_axis_tick * idx;
          let labels = item.label;
          // console.log(item.label);
          if (splitLabel) {
            labels = item.label.split(splitter);
          }

          const isArray = Array.isArray(labels);
          // console.log(isArray, labels);

          return (
            <Fragment key={`xlabels ${idx}`}>
              {!xTick && (
                <Line
                  key={`x axis tick ${idx}`}
                  x1={x_axis_point}
                  x2={x_axis_point}
                  y1={x_axis_y1_point}
                  y2={x_axis_y1_point + 10}
                  strokeWidth={strokeWidth}
                  stroke={axisColor}
                />
              )}

              {!xLabel && isArray ? (
                labels.map((item, idx) => {
                  return (
                    <SvgText
                      key={`label part1 ${idx}`}
                      x={x_axis_point}
                      y={x_axis_y1_point + 20 * (idx + 1)}
                      fill={axisColor}
                      textAnchor={labelAlign}>
                      {item}
                    </SvgText>
                  );
                })
              ) : (
                <SvgText
                  key={`label part2 ${idx}`}
                  x={x_axis_point}
                  y={x_axis_y1_point + 20}
                  fill={axisColor}
                  textAnchor={labelAlign}>
                  {item.label}
                </SvgText>
              )}
            </Fragment>
          );
        })}
      </G>
    );
  };

  const render_yAxis_label_and_tick = () => {
    // console.log(splitLabel);
    return (
      <G key="y axis label and tick">
        {yAxisLablesData.map((item, idx) => {
          const y_point = y_axis_y2_point - gap_between_y_axis_tick * idx;
          return (
            <Fragment key={`y-labels ${idx}`}>
              <Line
                key={`y axis tick ${idx}`}
                x1={mx_left}
                x2={mx_left - 10}
                y1={y_point}
                y2={y_point}
                strokeWidth={strokeWidth}
                stroke={axisColor}
              />
              <SvgText
                key={`ylabel part ${idx}`}
                x={mx_left - 20}
                y={y_point}
                fill={axisColor}
                textAnchor={labelAlign}>
                {item}
              </SvgText>
            </Fragment>
          );
        })}
      </G>
    );
  };

  useEffect(() => {
    const a = data.map((item, idx) => {
      if (idx === 0) {
        return y_min_value;
      } else {
        return y_min_value + gap_between_y_axis_tick * idx;
      }
    });
    console.log(a);

    // setYAxisLabelsData(a);
    start_x_y_axisAnimation();
  }, []);

  return (
    <View style={[styles.svgWrapper]}>
      <AnimatedSvg height="100%" width="100%" style={styles.svgStyle}>
        {renderXYaxis(hideXaxis, hideYaxis)}
        {render_xAxis_label_and_tick(
          hideXaxistick,
          hideXaxislabel,
          splitter,
          splitLabel,
        )}
        {render_yAxis_label_and_tick()}
      </AnimatedSvg>
    </View>
  );
};

const styles = StyleSheet.create({
  svgWrapper: {
    height: 600,
    backgroundColor: 'white',
  },
  svgStyle: {
    // backgroundColor: 'red',
  },
});

export default ScrollableLineChart;
