import React from 'react';
import {} from 'react-native';
import { Button } from "@rneui/themed";
import { Icon } from "@rneui/base";

type SignOutPropsType = {
  title: string;
  onPress: () => void;
}

const SignOut: React.FC<SignOutPropsType> = (props) => {
  return (
    <Button type="clear" onPress={props.onPress}>
      {props.title}
      <Icon  size={24} name="arrow-forward" color="#036BB9" />
    </Button>
  );
}

export default SignOut;
