import React from 'react';
import { Button } from "@rneui/themed";
import { Icon } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";

type BackPropsType = {
}

const Back: React.FC<BackPropsType> = (props) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.goBack();
  }

  return (
    <Button type="clear" onPress={handlePress}>
      <Icon size={28} name="arrow-back" color="#ffffff" />
    </Button>
  );
}

export default Back;
