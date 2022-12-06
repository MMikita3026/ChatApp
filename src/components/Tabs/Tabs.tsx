import React from 'react';
import TabsView from "./TabsView";
import { Tab } from "./types";
import { useSharedValue, withTiming } from "react-native-reanimated";

type TabsPropsType = {
  tabs: Array<Tab> | [];
  initialTabId: Tab["id"];
  onTabChange: () => void;
}


const Tabs: React.FC<TabsPropsType> = (props) => {
  const activeTabId = useSharedValue(props.initialTabId);

  const handleTabChange = (newTabId: Tab["id"]) => {
    activeTabId.value = withTiming(newTabId, { duration: 100 });
    setTimeout(props.onTabChange, 100);
  }

  return (
    <TabsView
      tabs={props.tabs}
      activeTabId={activeTabId}
      onTabChange={handleTabChange}
    />
  );
}

export default Tabs;
