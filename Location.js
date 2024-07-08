import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList, BackHandler, TouchableOpacity } from "react-native";
import { SearchBar } from "react-native-elements";
import { useNavigation } from '@react-navigation/native'; // Importing useNavigation hook

const DATA = [
  { id: "1", title: "HBR Layout" },
  { id: "2", title: "Kormangala" },
  { id: "3", title: "HSR Layout" },
  { id: "4", title: "Kammanahalli" },
  { id: "5", title: "HBR 5th Cross" },
  { id: "6", title: "JP Nagar" },
  { id: "7", title: "Electronic City" },
  { id: "8", title: "Whitefield" },
  { id: "9", title: "Marathahalli" },
  { id: "10", title: "Indiranagar" },
  { id: "11", title: "BTM Layout" },
  { id: "12", title: "Rajajinagar" },
  { id: "13", title: "Malleswaram" },
];

const Item = ({ title, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.item}>
    <Text>{title}</Text>
  </TouchableOpacity>
);

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: DATA,
      error: null,
      searchValue: "",
      isSearchFocused: false,
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
    if (this.state.isSearchFocused) {
      this.setState({ isSearchFocused: false });
      return true;
    }
    return false;
  };

  searchFunction = (text) => {
    const updatedData = this.arrayholder.filter((item) => {
      const item_data = `${item.title.toUpperCase()}`;
      const text_data = text.toUpperCase();
      return item_data.indexOf(text_data) > -1;
    });
    this.setState({ data: updatedData, searchValue: text });
  };

  handleSearchFocus = () => {
    this.setState({ isSearchFocused: true });
  };

  render() {
    const navigation = this.props.navigation; // Get the navigation prop

    return (
      <View style={styles.container}>
        <SearchBar
          placeholder="Search Here..."
          lightTheme
          round
          value={this.state.searchValue}
          onFocus={this.handleSearchFocus}
          onChangeText={(text) => this.searchFunction(text)}
          autoCorrect={false}
        />
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <Item
              title={item.title}
              onPress={() => this.props.navigation.navigate('BookSearch', { location: item.title })}
            />
          )}
          keyExtractor={(item) => item.id}
          extraData={this.state.isSearchFocused}
        />

        <TouchableOpacity onPress={() => navigation.navigate('ContactUs')}>
          <Text style={styles.helpText}>Need Help?</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const withNavigation = (Component) => (props) => {
  const navigation = useNavigation();
  return <Component {...props} navigation={navigation} />;
};

export default withNavigation(Search);

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
  helpText: {
    marginTop: 10,
    color: '#d2691e',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});
