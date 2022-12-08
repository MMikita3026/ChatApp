import React from 'react';
import { Button } from "@rneui/themed";
import { Icon } from "@rneui/base";

type AddContactPropsType = {
  onPress: () => void;
}

const AddContact: React.FC<AddContactPropsType> = (props) => {
  return (
    <Button type="clear" onPress={props.onPress}>
      <Icon size={24} name="add" color="#036BB9" />
    </Button>
  );
}

export default AddContact;
