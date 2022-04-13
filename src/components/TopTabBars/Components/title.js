import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import styles from "./styles";

const { width } = Dimensions.get("window");

const Title = React.forwardRef(({ item }, ref) => {
  const { screen, active, activeBorderColor, tabsOnScreen, selectedFontColor } =
    item;
  const { _scrollView, scrollView } = ref;

  return (
    <ScrollView horizontal ref={scrollView}>
      <View style={styles.topMain}>
        {screen.map((data, index) => (
          <TouchableOpacity
            style={[
              styles.button,
              active === index && {
                borderColor: activeBorderColor
                  ? activeBorderColor
                  : '#d6d6d6',
                borderWidth: 2,
              },
            ]}
            key={index}
            onPress={() => {
              _scrollView?.current?.scrollTo({ x: index * width });
            }}
          >
            <Text
              style={[
                styles.title,
                {
                  color:
                    active === index && selectedFontColor
                      ? selectedFontColor
                      : '#a6a6a6',
                },
              ]}
            >
              {data.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
});

export default Title;
