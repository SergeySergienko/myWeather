import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  ImageBackground,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
  StatusBar
} from "react-native";
import SearchInput from "./components/SearchInput";
import backgroundImage from "./assets/rain_1.jpg";
import getImageForWeather from "./utils/getImageForWeather";
import { fetchLocationId, fetchWeather } from "./utils/api";

export default class App extends React.Component {
  state = {
    loading: false,
    error: false,
    location: "",
    temperature: 0,
    weather: ""
  };

  componentDidMount() {
    this.handleUpdateLocation("San Francisco");
  }

  handleUpdateLocation = async city => {
    if (!city || city.trim() === "") return;
    this.setState(
      {
        loading: true
      },
      async () => {
        try {
          const locationId = await fetchLocationId(city);
          const { location, temperature, weather } = await fetchWeather(
            locationId
          );
          console.log(location, temperature, weather);
          this.setState({
            loading: false,
            error: false,
            location,
            temperature,
            weather
          });
        } catch (error) {
          this.setState({
            loading: false,
            error: true
          });
        }
      }
    );
  };

  renderInfo = () => {
    const { location, temperature, weather } = this.state;
    return (
      <View>
        <Text style={[styles.largeText, styles.textStyle]}>{location}</Text>
        <Text style={[styles.smallText, styles.textStyle]}>{weather}</Text>
        <Text style={[styles.largeText, styles.textStyle]}>{`${Math.round(
          temperature
        )}°`}</Text>
      </View>
    );
  };

  renderError = () => (
    <Text style={[styles.smallText, styles.textStyle]}>
      Could not load weather, please try a different city.
    </Text>
  );

  renderContent = () => {
    const { error } = this.state;
    return (
      <View>
        {error && this.renderError()}
        {!error && this.renderInfo()}

        <SearchInput
          placeholder="Search any city"
          onSubmit={this.handleUpdateLocation}
        />
      </View>
    );
  };

  render() {
    const { loading, weather } = this.state;
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <StatusBar barStyle="light-content" />
        <ImageBackground
          source={getImageForWeather(weather)}
          style={styles.imageContainer}
          imageStyle={styles.image}
        >
          <View style={styles.detailsContainer}>
            <ActivityIndicator animating={loading} color="white" size="large" />
            {!loading && this.renderContent()}
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#34495E"
  },
  imageContainer: {
    flex: 1
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover"
  },
  textStyle: {
    textAlign: "center",
    fontFamily: Platform.OS === "ios" ? "AvenirNext-Regular" : "Roboto",
    color: "#fff",
    fontWeight: "600"
  },
  largeText: {
    fontSize: 44
  },
  smallText: {
    fontSize: 32
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
    paddingHorizontal: 20
  }
});
