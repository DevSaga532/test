import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Haptics from "expo-haptics";
import { Ionicons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { colors, radius } from "@/constants/theme";
import { verticalScale } from "@/types/styling";

export const TabBar = ({ state, navigation }: BottomTabBarProps) => {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const isActions = route.name.toLowerCase() === "actions"; // Convertir a minúsculas para evitar errores
        const itemColor = focused ? colors.primary : colors.neutral400;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isActions && !focused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }

          if (isActions) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }
        };

        let iconName;
        switch (
          route.name.toLowerCase() // Convertimos a minúsculas para asegurar coincidencias
        ) {
          case "index":
            iconName = "home";
            break;
          case "porfolio":
            iconName = "pie-chart";
            break;
          case "prices":
            iconName = "cellular";
            break;
          default:
            iconName = "person";
            break;
        }

        const animatedValue = new Animated.Value(1);
        const OnPressIn = () => {
          Animated.spring(animatedValue, {
            toValue: 0.9,
            useNativeDriver: true,
          }).start();
        };
        const onPressOut = () => {
          Animated.spring(animatedValue, {
            toValue: 1,
            useNativeDriver: true,
          }).start();
        };

        const animatedStyle = { transform: [{ scale: animatedValue }] };

        return (
          <Animated.View
            key={route.name}
            style={[
              styles.tabItem,
              animatedStyle,
              isActions ? { marginTop: 7 } : { marginTop: 10 },
            ]}
          >
            <TouchableOpacity
              onPress={onPress}
              onPressIn={OnPressIn}
              onPressOut={onPressOut}
            >
              {isActions ? (
                <View style={styles.actionsButton}>
                  <Ionicons
                    name="swap-horizontal"
                    size={24}
                    color={colors.white}
                  />
                </View>
              ) : (
                <View style={{ alignItems: "center" }}>
                  <Ionicons
                    style={{ marginBottom: 2 }}
                    name={iconName as any}
                    size={24}
                    color={itemColor}
                  />
                  <Text style={[styles.tabBarText, { color: itemColor }]}>
                    {route.name}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </Animated.View>
        );
      })}
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    height: verticalScale(85),
    backgroundColor: colors.neutral900,
    borderColor: colors.neutral50,
    borderTopColor: colors.neutral900,
    borderTopWidth: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  tabItem: {
    width: verticalScale(60),
    alignItems: "center",
    justifyContent: "center",
  },
  actionsButton: {
    width: verticalScale(42),
    height: verticalScale(42),
    backgroundColor: colors.primary,
    borderRadius: radius._20,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  tabBarText: {
    color: colors.neutral400,
    fontSize: 12,
    marginTop: 2,
  },
});
