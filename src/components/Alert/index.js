import {
  Button,
  Modal,
  Portal,
  Subheading,
  Title,
  useTheme,
} from 'react-native-paper';

import React from 'react';
import {StyleSheet} from 'react-native';

const CustomAlert = (props) => {
  const theme = useTheme();
  return (
    <Portal>
      <Modal
        dismissable={true}
        contentContainerStyle={{
          ...styles.container,
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.text,
        }}
        visible={props.visible}
        onDismiss={props.onDismiss}>
        <Title>{props.title}</Title>
        <Subheading>{props.message}</Subheading>
        <Button
          style={styles.button}
          mode="contained"
          color={theme.colors.primary}
          onPress={props.okayPressed ? props.okayPressed : null}>
          {props.okayText ? props.okayText : 'Okay'}
        </Button>
        <Button
          style={styles.button}
          mode="text"
          color={theme.colors.error}
          onPress={props.cancelPressed ? props.cancelPressed : null}>
          {props.cancelText ? props.cancelText : 'Cancel'}
        </Button>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
  button: {marginVertical: 2},
});

export default CustomAlert;
