import React from 'react';
import { StyleSheet, View } from "react-native";
import { Tab } from "./types";
import TabComponent from "./components/TabComponent";
import { SharedValue } from "react-native-reanimated";

type TabsViewPropsType = {
  tabs: Array<Tab> | [];
  activeTabId: SharedValue<Tab["id"]>;
  onTabChange: (newTabId: Tab["id"]) => void;
}

const TabsView: React.FC<TabsViewPropsType> = (props) => {
  return (
    <View style={styles.container}>
      {props.tabs.map(item => <TabComponent key={item.id} item={item} activeTabId={props.activeTabId} onTabPress={() => props.onTabChange(item.id)} />)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
});

export default TabsView;
