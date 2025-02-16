import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { Image, Text } from "react-native";
import ScreenWrapper from "@/components/ScreenWrapper";
import { useAuth } from "@/context/authContext";
import { icons } from "@/constants/icons";
import { colors, radius, spacingY } from "@/constants/theme";
import { scale, verticalScale } from "@/types/styling";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { HomeCards } from "@/components/HomeCards";
import RefreshControl from "@/components/RefreshControl";
import BinanceWebSocket from "@/components/BinanceWebSocket";

const Home = () => {
  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <ScreenWrapper>
      <FlatList
        data={[]} // Aquí puedes agregar una lista vacía o datos ficticios si lo necesitas
        keyExtractor={(item, index) => index.toString()}
        renderItem={() => null} // Agrega renderItem para evitar el error
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <View style={styles.containerSearch}>
              {/* Avatar */}
              <Pressable
                onPress={() => console.log("Shortcut")}
                style={styles.pressedImage}
              >
                <Image style={styles.icons} source={icons.defaultAvatar} />
              </Pressable>
              {/* Barra de búsqueda */}
              <View style={styles.searchContainer}>
                <Text style={styles.fireIcon}>🔥</Text>
                <TextInput
                  style={styles.searchInput}
                  placeholder="BURGER"
                  placeholderTextColor={colors.neutral400}
                />
                <Pressable onPress={() => console.log("search")}>
                  <Ionicons
                    name="search"
                    size={20}
                    color={colors.neutral300}
                    style={styles.searchIcon}
                  />
                </Pressable>
              </View>
              {/* Notificaciones */}
              <Pressable
                style={styles.notificationContainer}
                onPress={() => console.log("notifications")}
              >
                <Ionicons
                  name="notifications"
                  size={20}
                  color={colors.neutral300}
                />
                {notificationCount > 0 && (
                  <View style={styles.notificationBadge}>
                    <Text style={styles.notificationText}>
                      {notificationCount}
                    </Text>
                  </View>
                )}
              </Pressable>
              {/* Opciones */}
              <View style={styles.optionContainer}>
                <Pressable
                  style={styles.optionSeparator}
                  onPress={() => console.log("help")}
                >
                  <Ionicons name="time" size={20} color={colors.neutral300} />
                </Pressable>
                <Pressable
                  style={styles.optionSeparator}
                  onPress={() => console.log("settings")}
                >
                  <Ionicons
                    name="settings"
                    size={20}
                    color={colors.neutral300}
                  />
                </Pressable>
              </View>
            </View>
            {/* Cards */}
            <HomeCards />
            <View style={{ height: spacingY._20 }} />
            <BinanceWebSocket />
          </>
        }
      />
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({
  containerSearch: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: scale(8),
    paddingVertical: scale(5),
  },
  pressedImage: {
    opacity: 0.5,
    backgroundColor: colors.primary,
    borderRadius: 40,
    overflow: "hidden",
  },
  icons: {
    width: 28,
    height: 28,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.neutral800,
    borderRadius: radius._12,
    paddingHorizontal: scale(8),
    paddingVertical: scale(5),
    width: "60%",
    justifyContent: "space-between",
  },
  searchIcon: {
    marginLeft: 8,
    color: colors.neutral400,
  },
  searchInput: {
    flex: 1,
    color: "white",
    marginLeft: 3,
  },
  fireIcon: {
    fontSize: 14,
  },
  notificationContainer: {
    position: "relative",
    marginLeft: 8,
  },
  notificationBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: colors.rose,
    borderRadius: 10,
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: "bold",
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionSeparator: {
    marginLeft: 8,
  },
  containerTotalBalance: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: scale(8),
    paddingVertical: scale(5),
  },
  scrollViewStyle: {
    marginTop: spacingY._25,
    marginBottom: verticalScale(100),
    gap: spacingY._25,
  },
});
