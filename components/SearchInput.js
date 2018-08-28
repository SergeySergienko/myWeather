import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

export default class SearchInput extends React.Component {
  state = {
    text: ""
  };

  handleChangeText = text => {
    this.setState({ text });
  };

  handleSubmitEditing = () => {
    const { onSubmit } = this.props;
    const { text } = this.state;
    if (!text) return;
    onSubmit(text);
    this.setState({ text: "" });
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          autoCorrect={false}
          placeholder={this.props.placeholder}
          placeholderTextColor="white"
          underlineColorAndroid="transparent"
          style={styles.textInput}
          clearButtonMode="always"
          onSubmitEditing={this.handleSubmitEditing}
          onChangeText={this.handleChangeText}
          keyboardAppearance="dark"
          value={this.state.text}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: 250,
    marginTop: 20,
    backgroundColor: "#555",
    marginHorizontal: 40,
    paddingHorizontal: 10,
    borderRadius: 5
  },
  textInput: {
    flex: 1,
    color: "white"
  }
});
