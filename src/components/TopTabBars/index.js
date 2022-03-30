import * as React from "react";
import { View } from "react-native";
import styles from "./Components/styles";
import Title from "./Components/title";
import Body from "./Components/body";



export default function Tab(props) {
  const [active, setActive] = React.useState(0);
  const _scrollView = React.useRef(null);
  const scrollView = React.useRef();
  const { activeBorderColor, selectedFontColor, tabsOnScreen, screen } = props;

  return (
    <View style={styles.container}>
      <Title
        item={{
          screen: screen,
          activeBorderColor: activeBorderColor,
          tabsOnScreen: tabsOnScreen,
          selectedFontColor: selectedFontColor,
          active: active,
        }}
        ref={{
          _scrollView: _scrollView,
          scrollView: scrollView,
        }}
      />
      <Body
        item={{
          screen: screen,
          tabsOnScreen: tabsOnScreen,
          stateChanger: setActive,
          active: active,
        }}
        ref={{
          _scrollView: _scrollView,
          scrollView: scrollView,
        }}
      />
    </View>
  );
}
