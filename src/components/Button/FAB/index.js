// @flow
import React from 'react';
import {View, StyleSheet, Pressable, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {BEIGE, TALC_BLUE, TEXT_COLOR_DARK} from '../../../constants/colors';
import CustomText from '../../CustomText';

const FAB = ({title, onPress, style, textStyle, leftIcon, ...props}) => {
  return (
    <View style={styles.parent}>
      <Pressable style={styles.container} onPress={onPress} activeOpacity={0.7}>
        <View style={{marginRight: 8}}>{leftIcon}</View>
        <CustomText.SubHeader
          style={{color: BEIGE, fontSize: 18, marginRight: 4}}>
          {title}
        </CustomText.SubHeader>
      </Pressable>
    </View>
  );
};

FAB.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  style: PropTypes.object,
  leftIcon: PropTypes.node,
};
FAB.defaultProps = {};
const styles = StyleSheet.create({
  parent: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 32,
    right: 32,
    zIndex: 999,
  },
  container: {
    height: 48,
    borderRadius: 48 / 3,
    padding: 12,
    backgroundColor: TALC_BLUE,
    shadowColor: TEXT_COLOR_DARK,
    elevation: 2,
    shadowOpacity: 0.3,
    shadowRadius: 24,
    flexDirection: 'row',
  },
});
export default FAB;
