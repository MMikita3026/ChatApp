import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Tabs from "../../components/Tabs";
import { AUTHENTICATION_TABS } from "../../constants/authentication";
import { Button, Input } from "@rneui/themed";
import { Icon } from "@rneui/base";
import BottomSvg from '../../../assets/authentication-bottom.svg';

type LoginViewPropsType = {
  onTermAndPrivacyPress: () => void;
  onTabChange: () => void;
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  onPasswordShowToggle: () => void;
  isPasswordVisible: boolean;
  onLogin: () => void;
}

const LoginView: React.FC<LoginViewPropsType> = (props) => {

  return (
    <SafeAreaView style={styles.topContainer} >
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.heading}>Login</Text>
          <Text style={styles.subheading}>
            By signing in you are agreeing our
            <Text
              onPress={props.onTermAndPrivacyPress}
              style={styles.linkText}
            > Term and privacy policy</Text>
          </Text>
        </View>

        <View>
          <Tabs
            tabs={AUTHENTICATION_TABS}
            initialTabId={AUTHENTICATION_TABS[0].id}
            onTabChange={props.onTabChange}
          />
        </View>

        <View style={styles.inputsContainer}>
          <Input
            placeholder="Email Address"
            inputStyle={styles.inputTextStyle}
            value={props.email}
            onChangeText={props.setEmail}
            leftIcon={
              <Icon name="mail-outline" size={24} color="#A6A6A6" type="material" />
            }
          />
          <Input
            placeholder="Password"
            secureTextEntry={!props.isPasswordVisible}
            inputStyle={styles.inputTextStyle}
            leftIcon={
              <Icon name="lock-outline" size={24} color="#A6A6A6" type="material" />
            }
            rightIcon={
              <TouchableOpacity onPress={props.onPasswordShowToggle}>
                <Icon name="visibility" size={24} color="#A6A6A6" type="material" />
              </TouchableOpacity>
            }
            value={props.password}
            onChangeText={props.setPassword}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Login"
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.buttonTitleStyle}
            onPress={props.onLogin}
          />
        </View>
      </ScrollView>
      <View style={styles.bottomPattern}>
        <BottomSvg />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 20,
  },
  headerContainer: {
    alignItems: 'center',
  },
  heading: {
    fontSize: 40,
    lineHeight: 56,
    fontFamily: "SakkalMajalla",
    color: '#000000',
    fontWeight: '400',
  },
  subheading: {
    fontSize: 24,
    lineHeight: 34,
    marginTop: 10,
    fontFamily: "SakkalMajalla",
    color: '#6B5E5E',
    textAlign: 'center',
    maxWidth: 240,
  },
  linkText: {
    color: '#0386D0',
  },
  inputsContainer: {
    marginTop: 46,
    flex: 1,
  },
  inputTextStyle: {
    fontFamily: "SakkalMajalla",
    fontSize: 24,
  },
  buttonContainer: {
    marginTop: 40,
  },
  buttonStyle: {
    borderRadius: 10,
  },
  buttonTitleStyle: {
    fontFamily: "SakkalMajalla",
    fontSize: 22,
  },
  bottomPattern: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  }
});

export default LoginView;
