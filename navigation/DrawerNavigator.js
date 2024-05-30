import React ,{Component}from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import StackNavigator from "./StackNavigator";
import Profile from "../screens/Profile";
import LogOut from '../screens/LogOut'
const Drawer = createDrawerNavigator();

export default class DrawerNavigator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      light_theme: true,
    };
  }

  
 

  componentDidMount() {
    this.fetchUser();
  }

  async fetchUser() {
    let theme, name, image;
    await firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", function (snapshot) {
        theme = snapshot.val().current_theme;
      });
    this.setState({
      light_theme: theme === "light" ? true : false,
    });
  }
  render(){  return (
    <Drawer.Navigator screenOptions={{headerShown:false}}>
    
      <Drawer.Screen name="Home" component={StackNavigator} />
      <Drawer.Screen name="Profile" component={Profile} />
            <Drawer.Screen name="LogOut" component={LogOut} />

    </Drawer.Navigator>
  );
};

}