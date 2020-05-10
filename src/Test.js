import React, { Component } from "react";
import { StyleSheet, View,Text } from "react-native";
import MapboxGL from "@react-native-mapbox-gl/maps";

let keys = [
  "pk.eyJ1IjoicmF2aXNvaml0cmF3b3JrIiwiYSI6ImNrYTByc3RqNjBldGozbHBtcmgwZXA0cGQifQ.6p5CTW54hkMu5Q00dKD0ew",
  "sk.eyJ1IjoicmF2aXNvaml0cmF3b3JrIiwiYSI6ImNrYTByeHVxZjBqbGszZXBtZjF3NmJleWgifQ.idSimILJ3_sk1gSWs2sMsQ",
  "pk.eyJ1IjoiZGlzY292ZXItaW5uIiwiYSI6ImNrOHBhbTB1ZDFpOHkzZ253azNiZWwwajcifQ.4Ajx3MymPUgns4rNashfLA"
]

let key = keys[Math.floor(Math.random() * keys.length)];

MapboxGL.setAccessToken(key);

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  container: {
    height: 300,
    width: 300,
    backgroundColor: "tomato"
  },
  map: {
    flex: 1
  }
});

export default class App extends Component {
  componentDidMount() {
    MapboxGL.setTelemetryEnabled(false);
  }

  render() {
    return (
      <View style={styles.page}>
        <View style={styles.container}>
          <MapboxGL.MapView style={styles.map} />
          <Text style={{color:'red',marginTop:20,textAlign:'center',justifyContent:'center'}}>{key}</Text>
        </View>
      </View>
    );
  }
}