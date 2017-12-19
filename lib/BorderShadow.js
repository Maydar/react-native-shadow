import React, { Component, PureComponent } from 'react'
import {View} from 'react-native'
import PropTypes from 'prop-types';

import Svg,{ Rect,Defs,LinearGradient,Stop,RadialGradient,Path } from 'react-native-svg'


const SvgBorderTop = (props) => {
  const {
    lineWidth,
    width,
    linear,
    inset
  } = props;

  return (
    <Svg height={lineWidth} width={width+lineWidth} style={{position:"absolute",top:(inset?0:-lineWidth)}}>
      <Defs><LinearGradient id="top" x1="0" y1={lineWidth} x2="0" y2="0">{linear('BorderTop')}</LinearGradient>
        <LinearGradient id="top-inset" x1="0" y1="0" x2="0" y2={lineWidth}>{linear('BorderTopInset')}</LinearGradient></Defs>
      <Rect x={0} y={0} width={width} height={lineWidth} fill={`url(#top${inset?"-inset":""})`} />
    </Svg>
  );
};

const SvgBorderBorderBottom = (props) => {
  const {
    lineWidth,
    width,
    linear,
    inset
  } = props;

  return (
    <Svg height={lineWidth} width={width+lineWidth} style={{position:"absolute",bottom:(inset?-lineWidth:0)}}>
      <Defs><LinearGradient id="bottom" x1="0" y1="0" x2="0" y2={lineWidth}>{linear('BorderBottom')}</LinearGradient>
        <LinearGradient id="bottom-inset" x1="0" y1={lineWidth} x2="0" y2="0">{linear('BorderBottomInset')}</LinearGradient></Defs>
      <Rect x={0} y={0} width={width} height={lineWidth} fill={`url(#bottom${inset?"-inset":""})`} />
    </Svg>
  )
}

export default class BorderShadow extends PureComponent {

  static defaultProps = {
    side : "bottom",
    width : 0,
    color : "#000",
    border : 0,
    opacity : 1,
    inset : false,
    style : {}
  };
  static propTypes = {
    children: PropTypes.element.isRequired,
    setting: PropTypes.shape({
      side: PropTypes.string.isRequired,
      width: PropTypes.number,
      color: PropTypes.string,
      border: PropTypes.number,
      opacity: PropTypes.number,
      inset: PropTypes.bool,
      style: PropTypes.object
    })
  };

  _getLinear = (color, opacity) => {
    return (key) => {
      return [
        <Stop offset="0" stopColor={color} stopOpacity={opacity} key={key+'Linear0'} />,
        <Stop offset="1" stopColor={color} stopOpacity="0" key={key+'Linear1'} />
      ]
    }
  };

	render = () => {

		const { setting : {
        side,
        width,
        color,
        border,
        opacity,
        inset,
        style
      },
      children
		} = this.props;

		const linear = this._getLinear(color, opacity);
		const lineWidth = border;
    const baseStyle = {
      position : "relative",
      width : width
    };
		return (
			<View style={[baseStyle, style]}>
				{side === "top" ? SvgBorderTop({
          lineWidth,
          width,
          linear,
          inset,
        }) : SvgBorderBorderBottom({
          lineWidth,
          width,
          linear,
          inset
        })}
        {children}
			</View>
		)
	}
}
