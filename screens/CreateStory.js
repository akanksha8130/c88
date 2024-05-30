import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	SafeAreaView,
	Platform,
	StatusBar,
	Image,
	ScrollView,
	TextInput,
	Dimensions,Button
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import DropDownPicker from 'react-native-dropdown-picker';

import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import firebase from 'firebase'

import db from '../config';

SplashScreen.preventAutoHideAsync();

let customFonts = {
	'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
};

export default class CreateStory extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fontsLoaded: false,
			previewImage: 'image_1',
			dropdownHeight: 40,
			light_theme: false,
		};
	}

	async _loadFontsAsync() {
		await Font.loadAsync(customFonts);
		this.setState({ fontsLoaded: true });
	}

	componentDidMount() {
		this._loadFontsAsync();
		this.fetchUser();
	}

async addStory(){
  if(this.state.title && this.state.moral && this.state.description && this.state.story){
    let storyData={
      preview_image:this.state.previewImage,
      title:this.state.title,
      description:this.state.description,
      moral:this.state.moral,
      story:this.state.story,
      likes:0
    }
    await firebase.database().ref("/posts/"+Math.random().toString(36).slice(2)).set(storyData)
    .then(function(snapshot){})
    this.props.navigation.navigate('Feed')
    alert('thank you for adding data')
  }
  else{
    alert('all fields are required')
  }
}
  fetchUser = () => {
    let theme;
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", snapshot => {
        theme = snapshot.val().current_theme;
        this.setState({ light_theme: theme === "light" });
      });
  };

	render() {
		if (this.state.fontsLoaded) {
			SplashScreen.hideAsync();
			let preview_images = {
				image_1: require('../assets/story_image_1.png'),
				image_2: require('../assets/story_image_2.png'),
				image_3: require('../assets/story_image_3.png'),
				image_4: require('../assets/story_image_4.png'),
				image_5: require('../assets/story_image_5.png'),
			};
			return (
				<View
					style={this.state.light_theme ? styles.containerLight : styles.container}>
					<SafeAreaView style={styles.droidSafeArea} />
					<View style={styles.appTitle}>
						<View style={styles.appIcon}>
							<Image
								source={require('../assets/logo.png')}
								style={styles.iconImage}></Image>
						</View>
						<View style={styles.appTitleTextContainer}>
							<Text
								style={
									this.state.light_theme ? styles.appTitleTextLight : styles.appTitleText
								}>
								New Story
							</Text>
						</View>
					</View>
					<View style={styles.fieldsContainer}>
						<Image
							source={preview_images[this.state.previewImage]}
							style={styles.previewImage}></Image>
						<View style={{ height: RFValue(this.state.dropdownHeight) }}>
							<DropDownPicker
								items={[
									{ label: 'Image 1', value: 'image_1' },
									{ label: 'Image 2', value: 'image_2' },
									{ label: 'Image 3', value: 'image_3' },
									{ label: 'Image 4', value: 'image_4' },
									{ label: 'Image 5', value: 'image_5' },
								]}
								defaultValue={this.state.previewImage}
								open={this.state.dropdownHeight == 170 ? true : false}
								onOpen={() => {
									this.setState({ dropdownHeight: 170 });
								}}
								onClose={() => {
									this.setState({ dropdownHeight: 40 });
								}}
								style={{
									backgroundColor: 'transparent',
									borderWidth: 1,
									borderColor: this.state.light_theme ? 'black' : 'white',
									color: 'red',
								}}
								textStyle={{
									color: this.state.light_theme ? 'black' : 'white',
									fontFamily: 'Bubblegum-Sans',
								}}
								onSelectItem={(item) =>
									this.setState({
										previewImage: item.value,
									})
								}
							/>
						</View>
						<ScrollView>
							<TextInput
								style={
									this.state.light_theme ? styles.inputFontLightText : styles.inputFont
								}
								onChangeText={(title) => this.setState({ title })}
								placeholder={'Title'}
								placeholderTextColor='white'
							/>

							<TextInput
								style={[
									this.state.light_theme ? styles.inputFontLightText : styles.inputFont,
									styles.inputFontExtra,
									styles.inputTextBig,
								]}
								onChangeText={(description) => this.setState({ description })}
								placeholder={'Description'}
								multiline={true}
								numberOfLines={4}
								placeholderTextColor='white'
							/>
							<TextInput
								style={[
									this.state.light_theme ? styles.inputFontLightText : styles.inputFont,
									styles.inputFontExtra,
									styles.inputTextBig,
								]}
								onChangeText={(story) => this.setState({ story })}
								placeholder={'Story'}
								multiline={true}
								numberOfLines={20}
								placeholderTextColor='white'
							/>

							<TextInput
								style={[
									this.state.light_theme ? styles.inputFontLightText : styles.inputFont,
									styles.inputFontExtra,
									styles.inputTextBig,
								]}
								onChangeText={(moral) => this.setState({ moral })}
								placeholder={'Moral of the story'}
								multiline={true}
								numberOfLines={4}
								placeholderTextColor='white'
							/>

              <Button title="submit" onPress={()=>this.addStory()}/ >
						</ScrollView>
					</View>
					<View style={{ flex: 0.08 }} />
				</View>
			);
		}
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#15193c',
	},
	containerLight: {
		flex: 1,
		backgroundColor: 'white',
	},
	droidSafeArea: {
		marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
	},
	appTitle: {
		flex: 0.07,
		flexDirection: 'row',
	},
	appIcon: {
		flex: 0.3,
		justifyContent: 'center',
		alignItems: 'center',
	},
	iconImage: {
		width: '100%',
		height: '100%',
		resizeMode: 'contain',
	},
	appTitleTextContainer: {
		flex: 0.7,
		justifyContent: 'center',
	},
	appTitleText: {
		color: 'white',
		fontSize: RFValue(28),
		fontFamily: 'Bubblegum-Sans',
	},
	appTitleTextLight: {
		color: 'black',
		fontSize: RFValue(28),
		fontFamily: 'Bubblegum-Sans',
	},
	fieldsContainer: {
		flex: 0.85,
	},
	previewImage: {
		width: '93%',
		height: RFValue(250),
		alignSelf: 'center',
		borderRadius: RFValue(10),
		marginVertical: RFValue(10),
		resizeMode: 'contain',
	},
	inputFont: {
		height: RFValue(40),
		marginTop: RFValue(40),
		borderColor: 'white',
		borderWidth: RFValue(1),
		borderRadius: RFValue(10),
		paddingLeft: RFValue(10),
		color: 'white',
		fontFamily: 'Bubblegum-Sans',
	},
	inputFontLightText: {
		height: RFValue(40),
		borderWidth: RFValue(1),
		borderRadius: RFValue(10),
		paddingLeft: RFValue(10),
		color: 'black',
		borderColor: 'black',
		fontFamily: 'Bubblegum-Sans',
	},
	inputFontExtra: {
		marginTop: RFValue(15),
	},
	inputTextBig: {
		textAlignVertical: 'top',
		padding: RFValue(5),
	},
});