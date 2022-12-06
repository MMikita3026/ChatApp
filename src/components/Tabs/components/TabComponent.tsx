import React from 'react';
import { Tab } from "../types";
import Animated, { SharedValue, useAnimatedStyle } from "react-native-reanimated";
import { Pressable, StyleSheet } from "react-native";

type TabComponentPropsType = {
  item: Tab;
  activeTabId: SharedValue<Tab["id"]>;
  onTabPress: () => void;
}

const TabComponent: React.FC<TabComponentPropsType> = (props) => {
  const animatedStyles = useAnimatedStyle(() => {
    const isActive = props.activeTabId.value === props.item.id;

    return {
      borderBottomWidth: isActive ? 1 : 0,
      borderBottomColor: isActive ? '#000000' : '#FFFFFF',
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    const isActive = props.activeTabId.value === props.item.id;

    return {
      color: isActive ? '#036BB9' : '#A6A6A6',
    };
  });

  return (
    <Pressable onPress={props.onTabPress}>
      <Animated.View style={[styles.container, animatedStyles]}>
        <Animated.Text style={[styles.text, animatedTextStyle]}>{props.item.title}</Animated.Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
  },
  containerWithMargin: {

  },
  text: {
    fontFamily: "SakkalMajalla",
    fontSize: 24,
    lineHeight: 34,
    color: '#A6A6A6',
  },
});

export default TabComponent;
