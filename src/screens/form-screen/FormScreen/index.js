// @flow
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import CustomText from '../../../components/CustomText';
import BlankPage from '../../../components/BlankPage';
import {BEIGE, TEXT_COLOR_DARK} from '../../../constants/colors';
import TextField from '../../../components/TextField';
import Button from '../../../components/Button';
import {useDispatch} from 'react-redux';
import {ADD_CAT_DETAILS, EDIT_CAT_DETAILS} from '../../../constants/actions';
import {ChevronLeftIcon} from 'react-native-heroicons/solid';
import {v4 as uuid} from 'uuid';
const FormScreen = ({navigation, route}) => {
  const [catDetails, setCatDetails] = useState({});
  const dispatch = useDispatch();

  const setData = (data, key) => {
    let details = {...catDetails};
    details[key] = data;
    setCatDetails(details);
  };

  useEffect(() => {
    // console.log('params', route.params);
    setCatDetails(route?.params);
  }, []);

  const addCatDetails = () => {
    if (!catDetails) return;
    catDetails.id = route?.params ? catDetails?.id : uuid();
    if (
      catDetails &&
      catDetails?.catName &&
      catDetails?.breed &&
      catDetails?.id &&
      catDetails?.description
    ) {
      let action = route?.params ? EDIT_CAT_DETAILS : ADD_CAT_DETAILS;

      dispatch({
        type: action,
        payload: catDetails,
      });
      navigation.navigate('HomeScreen');
    } else {
      return;
    }
  };

  return (
    <BlankPage>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: BEIGE, height: '100%'}}>
        <TouchableOpacity
          style={{
            alignSelf: 'flex-start',
            marginLeft: 16,
            marginTop: 18,
          }}
          onPress={() => navigation.goBack()}>
          <ChevronLeftIcon height={36} width={36} color={TEXT_COLOR_DARK} />
        </TouchableOpacity>
        <View style={styles.parent}>
          <CustomText.Header style={styles.header}>
            {route.params ? 'Edit a cat' : 'Add a cat'}
          </CustomText.Header>
          <View style={styles.fieldContainer}>
            <TextField
              placeholder={"Enter your cat's name"}
              title={"Cat's name"}
              style={styles.textFieldContainerStyle}
              onChangeText={data => setData(data, 'catName')}
              value={catDetails?.catName}
            />
            <TextField
              placeholder={'Awesome breed?'}
              title={'Breed'}
              style={styles.textFieldContainerStyle}
              onChangeText={data => setData(data, 'breed')}
              value={catDetails?.breed}
            />
            {/* <TextField
              placeholder={"We'll remind you????"}
              title={'Birthday'}
              style={styles.textFieldContainerStyle}
              onChangeText={data => setData(data, 'birthday')}
              value={catDetails?.birthday}
            /> */}
            <TextField
              placeholder={'Anything else...'}
              title={'Description'}
              style={[styles.textFieldContainerStyle]}
              customTextInputStyle={{height: 120}}
              multiline={true}
              numberOfLines={5}
              onChangeText={data => setData(data, 'description')}
              value={catDetails?.description}
            />
          </View>
          <View style={styles.buttonBar}>
            <Button
              title={route.params ? 'Update' : 'Save'}
              onPress={addCatDetails}
            />
          </View>
        </View>
      </ScrollView>
    </BlankPage>
  );
};

FormScreen.propTypes = {};
FormScreen.defaultProps = {};
const styles = StyleSheet.create({
  parent: {
    backgroundColor: BEIGE,
    // height: '100%',
    padding: 24,
    paddingTop: 16,
  },
  header: {
    fontSize: 24,
  },
  fieldContainer: {
    marginTop: 36,
  },
  textFieldContainerStyle: {
    marginBottom: 18,
  },
  buttonBar: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    flex: 1,
  },
});
export default FormScreen;
