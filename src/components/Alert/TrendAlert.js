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

const TrendAlert = ({
  trend,
  place,
  visible,
  onDismiss,
  okayPressed,
  cancelPressed,
}) => {
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
        visible={visible}
        onDismiss={onDismiss}>
        <Title>{`Trend of ${place.name}`}</Title>
        <Subheading>Trending Word: {trend.name}</Subheading>
        <Subheading>
          Promoted: {trend.promoted_content ? 'Yes' : 'No'}
        </Subheading>
        {trend.tweet_volume ? (
          <Subheading>{`Twitted: ${trend.tweet_volume} times`}</Subheading>
        ) : null}
        <Button
          style={styles.button}
          mode="contained"
          icon="twitter"
          onPress={okayPressed}>
          Open In Twitter
        </Button>
        <Button
          style={styles.button}
          mode="text"
          color={theme.colors.error}
          onPress={cancelPressed}>
          Keep Browsing
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

export default TrendAlert;
