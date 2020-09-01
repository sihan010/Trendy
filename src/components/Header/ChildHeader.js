import {Appbar, useTheme} from 'react-native-paper';

import React from 'react';

const ChildHeader = (props) => {
  const theme = useTheme();
  return (
    <Appbar.Header style={{backgroundColor: theme.colors.primary}}>
      <Appbar.BackAction
        onPress={() =>
          props.backAction ? props.backAction() : props.navigation.goBack()
        }
        color={theme.colors.accent}
      />
      <Appbar.Content title={props.title} />
    </Appbar.Header>
  );
};
export default ChildHeader;
