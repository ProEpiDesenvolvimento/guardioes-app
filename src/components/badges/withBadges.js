import React from 'react';
import {View} from 'react-native';
import {Badge} from 'react-native-elements';

import styles from './styles';

const withBadge = (value, options = {}) => WrappedComponent =>
  class extends React.Component {
    render() {
      const {
        top = -5,
        right = 0,
        left = 0,
        bottom = 0,
        hidden = !value,
        ...badgeProps
      } = options;
      const badgeValue =
        typeof value === 'function' ? value(this.props) : value;
      return (
        <View>
          <WrappedComponent {...this.props} />
          {!hidden && (
            <Badge
              badgeStyle={styles.badge}
              textStyle={styles.badgeText}
              value={badgeValue}
              status="error"
              containerStyle={[
                styles.badgeContainer,
                {top, right, left, bottom},
              ]}
              {...badgeProps}
            />
          )}
        </View>
      );
    }
  };

export default withBadge;
