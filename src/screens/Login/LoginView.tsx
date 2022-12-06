import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import Tabs from "../../components/Tabs";
import { AUTHENTICATION_TABS } from "../../constants/authentication";

type LoginViewPropsType = {
  onTermAndPrivacyPress: () => void;
  onTabChange: () => void;
}

const LoginView: JSX.Element = (props: LoginViewPropsType) => {

  return (
    <SafeAreaView style={styles.topContainer}>
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
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 46,
    paddingVertical: 20,
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
  }
});

export default LoginView;
