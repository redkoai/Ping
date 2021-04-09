import { useNavigation } from '@react-navigation/native';
import { Image, ImageBackground, View, ScrollView,Text } from 'react-native';
import { TouchableOpacity } from 'react-native';
import emptyHome from 'ping/assets/homeScreen/bg.png';
import styles from 'ping/src/styles/styles';
import { Dimensions } from 'react-native';
import { colors, textStyles } from 'ping/src/styles/styles';
import { widthPercentageToDP, heightPercentageToDP } from 'ping/util/scaler';
import React, { useEffect, useState } from 'react';
import tempprogline from 'ping/assets/createnew/templates/tempprogline.png';
import temp1 from 'ping/assets/createnew/templates/templates1.png';
import inv1 from 'ping/assets/invites/1.png';
import inv2 from 'ping/assets/invites/2.png';
import inv3 from 'ping/assets/invites/3.png';
import inv4 from 'ping/assets/invites/4.png';
import inv5 from 'ping/assets/invites/5.png';
import inv6 from 'ping/assets/invites/6.png';
import inv7 from 'ping/assets/invites/7.png';
import inv8 from 'ping/assets/invites/8.png';
import inv9 from 'ping/assets/invites/9.png';
import inv10 from 'ping/assets/invites/10.png';
import inv11 from 'ping/assets/invites/11.png';
import inv12 from 'ping/assets/invites/12.png';
import inv13 from 'ping/assets/invites/13.png';
import inv14 from 'ping/assets/invites/14.png';
import inv15 from 'ping/assets/invites/15.png';



function Events({}) {
  const navigation = useNavigation();

  return (
    <ScrollView style={{ flex: 1 }}>
      <ImageBackground source={emptyHome} style={styles.homeEmpty}>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            marginTop: widthPercentageToDP(3),
            marginLeft:widthPercentageToDP(5),
          }}
        >
          
           
          <Image
            source={tempprogline}
            style={{
              height: heightPercentageToDP('7'),
              width: widthPercentageToDP('88'),
              resizeMode: 'contain',
              marginTop: heightPercentageToDP('0'),
            }}
          />
        
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Details');
            }}
          >
            <Image
              source={temp1}
              style={{
                height: heightPercentageToDP('25'),
                width: widthPercentageToDP('45'),
                marginTop: heightPercentageToDP('-0.5'),
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>

         
      
          <Text style={[textStyles.bigBold,{left:widthPercentageToDP('3'),marginTop:heightPercentageToDP('3')} ]}>Brunch</Text>
          
          <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: widthPercentageToDP(3),
            marginLeft: widthPercentageToDP(0),
          }}
        >
          <ScrollView  horizontal={true}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Details');
            }}
          >
            <Image
              source={inv1}
              style={{
                height: heightPercentageToDP('25'),
                width: widthPercentageToDP('45'),
                marginTop: heightPercentageToDP('-4.5'),
                resizeMode: 'contain',
                
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Details');
            }}
          >
            
            <Image
              source={inv2}
              style={{
                height: heightPercentageToDP('25'),
                width: widthPercentageToDP('45'),
                marginTop: heightPercentageToDP('-4.5'),
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>

         
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Details');
            }}
          >
            <Image
              source={inv3}
              style={{
                height: heightPercentageToDP('25'),
                width: widthPercentageToDP('45'),
                marginTop: heightPercentageToDP('-4.5'),
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
          </ScrollView>
          </View>
          <Text style={[textStyles.bigBold,{left:widthPercentageToDP('3'),marginTop:heightPercentageToDP('3')} ]}>Party</Text>
          <ScrollView  horizontal={true}>
          <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: widthPercentageToDP(3),
            marginLeft: widthPercentageToDP(3),
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Details');
            }}
          >
            <Image
              source={inv4}
              style={{
                height: heightPercentageToDP('25'),
                width: widthPercentageToDP('45'),
                marginTop: heightPercentageToDP('-4.5'),
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
       
         
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Details');
            }}
          >
            <Image
              source={inv5}
              style={{
                height: heightPercentageToDP('25'),
                width: widthPercentageToDP('45'),
                marginTop: heightPercentageToDP('-4.5'),
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
          </View>
          </ScrollView>
          <Text style={[textStyles.bigBold,{left:widthPercentageToDP('3'),marginTop:heightPercentageToDP('3')} ]}>Birthday</Text>
          <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: widthPercentageToDP(3),
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Details');
            }}
          >
            <Image
              source={inv6}
              style={{
                height: heightPercentageToDP('25'),
                width: widthPercentageToDP('45'),
                marginTop: heightPercentageToDP('-4.5'),
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>

         
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Details');
            }}
          >
            <Image
              source={inv7}
              style={{
                height: heightPercentageToDP('25'),
                width: widthPercentageToDP('45'),
                marginTop: heightPercentageToDP('-4.5'),
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
          </View>
          <Text style={[textStyles.bigBold,{left:widthPercentageToDP('3'),marginTop:heightPercentageToDP('3')} ]}>Holidays</Text>
          <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: widthPercentageToDP(3),
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Details');
            }}
          >
            <Image
              source={inv8}
              style={{
                height: heightPercentageToDP('25'),
                width: widthPercentageToDP('45'),
                marginTop: heightPercentageToDP('-4.5'),
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>

         
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Details');
            }}
          >
            <Image
              source={inv10}
              style={{
                height: heightPercentageToDP('25'),
                width: widthPercentageToDP('45'),
                marginTop: heightPercentageToDP('-4.5'),
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
          </View>


          <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: widthPercentageToDP(3),
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Details');
            }}
          >
            <Image
              source={inv11}
              style={{
                height: heightPercentageToDP('25'),
                width: widthPercentageToDP('45'),
                marginTop: heightPercentageToDP('-8.5'),
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>

         
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Details');
            }}
          >
            <Image
              source={inv12}
              style={{
                height: heightPercentageToDP('25'),
                width: widthPercentageToDP('45'),
                marginTop: heightPercentageToDP('-8.5'),
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
          </View>

          <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: widthPercentageToDP(3),
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Details');
            }}
          >
            <Image
              source={inv13}
              style={{
                height: heightPercentageToDP('25'),
                width: widthPercentageToDP('45'),
                marginTop: heightPercentageToDP('-8.5'),
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>

         
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Details');
            }}
          >
            <Image
              source={inv14}
              style={{
                height: heightPercentageToDP('25'),
                width: widthPercentageToDP('45'),
                marginTop: heightPercentageToDP('-8.5'),
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
          </View>

          </View>
       
      </ImageBackground>
    </ScrollView>
  );
}

export default Events;
