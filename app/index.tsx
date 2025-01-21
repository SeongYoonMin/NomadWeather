import { StatusBar } from "expo-status-bar";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";
import { useEffect, useState } from "react";

const deviceWidth = Dimensions.get("window").width;

/**
 * getCurrentPositionAsync를 이용하여 현재 위치 정보 가져오기 (one to time)
 * @returns Promise<{latitude: number, longitude: number}>
 */
async function getPositionAsync() {
  let {
    coords: { latitude, longitude },
  } = await Location.getCurrentPositionAsync({ accuracy: 5 });
  return { latitude, longitude };
}

/**
 * 위도, 경도를 기반으로 주소정보 가져오기
 * @param latitude // 위도
 * @param longitude // 경도
 * @returns Promise<Location.LocationGeocodedAddress[]>
 */
async function getReverseGeoCode(latitude: number, longitude: number) {
  const getLocation = await Location.reverseGeocodeAsync({
    latitude,
    longitude,
  });
  return getLocation;
}

export default function Index() {
  const [location, setLocation] = useState<
    Location.LocationGeocodedAddress[] | null
  >(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync(); // 사용자에게 위치 권한 요청
      if (status !== "granted") {
        setErrorMsg("사용자가 위치 사용 권한을 거부하였습니다.");
        return;
      } else {
        const { latitude, longitude } = await getPositionAsync();
        const getLocation = await getReverseGeoCode(latitude, longitude);
        setLocation(getLocation);
      }
    }

    getCurrentLocation();
  }, []);

  return (
    <View style={styles.container}>
      {location ? (
        <View style={styles.city}>
          <Text style={styles.cityName}>{location[0].country}</Text>
          <Text style={{ fontSize: 32 }}>{location[0].city}</Text>
        </View>
      ) : (
        <View style={styles.city}>
          <Text>{errorMsg}</Text>
        </View>
      )}
      <ScrollView
        contentContainerStyle={styles.weather}
        horizontal
        pagingEnabled
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.desc}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.desc}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.desc}>Sunny</Text>
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  city: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 60,
    fontWeight: "500",
  },
  weather: {},
  day: {
    width: deviceWidth,
    alignItems: "center",
  },
  temp: {
    fontSize: 178,
  },
  desc: {
    fontSize: 60,
  },
});
