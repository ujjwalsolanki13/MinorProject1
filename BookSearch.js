import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, BackHandler } from "react-native";
import { SearchBar } from "react-native-elements";

const DATA = [
  { id: "1", title: "IOT" },
  { id: "2", title: "DSA" },
  { id: "3", title: "OS" },
  { id: "4", title: "DBMS" },
  { id: "5", title: "DM" },
  { id: "6", title: "AI" },
  { id: "7", title: "AA" },
  { id: "8", title: "OOP" },
  { id: "9", title: "Python" },
  { id: "10", title: "Javascript" },
  { id: "11", title: "ReactNative" },
  { id: "12", title: "Expo" },
  { id: "13", title: "AndroidStudio" },
];

const Item = ({ title, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.item}>
    <Text>{title}</Text>
  </TouchableOpacity>
);

class BookSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: DATA,
      error: null,
      BookSearchValue: "",
      isBookSearchFocused: false,
    };
    this.arrayholder = DATA;
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  handleBackPress = () => {
    if (this.state.isBookSearchFocused) {
      this.setState({ isBookSearchFocused: false });
      return true;
    }
    return false;
  };

  BookSearchFunction = (text) => {
    const updatedData = this.arrayholder.filter((item) => {
      const item_data = `${item.title.toUpperCase()}`;
      const text_data = text.toUpperCase();
      return item_data.indexOf(text_data) > -1;
    });
    this.setState({ data: updatedData, BookSearchValue: text });
  };

  handleBookSearchFocus = () => {
    this.setState({ isBookSearchFocused: true });
  };

  render() {
    const { route, navigation } = this.props;
    const { location } = route.params;

    return (
      <View style={styles.container}>
        <SearchBar
          placeholder="Search Here..."
          lightTheme
          round
          value={this.state.BookSearchValue}
          onFocus={this.handleBookSearchFocus}
          onChangeText={(text) => this.BookSearchFunction(text)}
          autoCorrect={false}
        />
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <Item
              title={item.title}
              onPress={() => navigation.navigate('Rent', { location: location, book: item.title })}
            />
          )}
          keyExtractor={(item) => item.id}
          extraData={this.state.isBookSearchFocused}
        />
      </View>
    );
  }
}

export default BookSearch;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    padding: 2,
    flex: 1,
  },
  item: {
    backgroundColor: "#d37d4b",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});

