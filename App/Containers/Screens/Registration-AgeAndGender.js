import React, { Component } from 'react'
import {
    Text,
    View,
    Image,
    StatusBar,
    BackHandler,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    AsyncStorage,
    Picker
} from 'react-native'
import styles from "./../Styles/Registration-AgeAndGenderStyles";
import SplashScreen from 'react-native-splash-screen'
import SignUpHeader from './../../Component/SignUpHeader'
import DatePicker from './../../Component/Date-Picker'


export default class RegistrationAgeAndGender extends Component {
    constructor() {
        super();
        this.setGender = this.setGender.bind(this);
        this.setAge = this.setAge.bind(this);

        this.moveToCityAndEmail = this.moveToCityAndEmail.bind(this)
        this.state = {
            age: "Select Your Age",
            gender: 'Male',
        }
    }

    componentDidMount() {
        SplashScreen.hide()
        BackHandler.addEventListener('hardwareBackPress', () => { return true });
    }

    setAge(text) {
        this.setState({
            age: ''
        })
        this.setState({
            age: text
        });


    }
    setGender(text) {
        this.setState({
            gender: "",
        })


        this.setState({
            gender: text
        });

    }
    async moveToCityAndEmail() {
        await AsyncStorage.setItem('gender', this.state.gender)
        await AsyncStorage.setItem('age', this.state.age)
        var currentDate=new Date();var m=currentDate.getMonth();var d=currentDate.getDay();var y=currentDate.getFullYear();
        currentDate=new Date(y,m,d);
        var InputDate=new Date(this.state.age)

        if (this.state.gender !== '' && this.state.age !== '') {
         

            if ((currentDate.getFullYear()-InputDate.getFullYear())<18) {
                ToastAndroid.showWithGravity('Minimum age requirement 18', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
               
            }
            else {
                this.props.navigation.navigate('CityAndEmail')
                
            }
        } else {
            ToastAndroid.showWithGravity('Please Enter Your Age And Gender', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
        }
    }
    render() {
        return (
            <View >
                <StatusBar backgroundColor="transparent" translucent={true} />
                <Image source={require('./../../Assets/login-screen/background.png')} resizeMode="cover" style={styles.backgroundImage} />
                {/* Header */}
                <SignUpHeader />


                {/* Body */}
                <View style={styles.container}>


                    <DatePicker
                        style={{ width: 200 }}
                        date={this.state.date}
                        mode="date"
                        placeholder={this.state.age}
                        format="YYYY-MM-DD"

                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        onDateChange={(date) => { this.setState({ age: date }) }}
                    />
                    <View style={styles.rowView}>
                        <View style={styles.ageIconStyle}>
                            <Image source={require('./../../Assets/signup-screen/age.png')} style={styles.ageIcon} />
                        </View>
                        <TextInput
                            style={styles.textInput}
                            editable={false}
                            disable={true} />
                    </View>
                    <View style={styles.rowView}>
                        <View style={styles.genderIconStyle}>
                            <Image source={require('./../../Assets/signup-screen/gender.png')} style={styles.genderIcon} />
                        </View>
                        <TextInput
                            style={styles.textInput}
                            editable={false} />

                        <Picker
                            selectedValue={this.state.gender}
                            style={styles.genderPickerStyle}
                            onValueChange={(itemValue) => this.setGender(itemValue)}>
                            <Picker.Item label="Male" value="Male" />
                            <Picker.Item label="Female" value="Female" />
                        </Picker>
                    </View>


                </View>

                <TouchableOpacity style={[styles.centered, styles.nextBtnContainer]} onPress={this.moveToCityAndEmail}>
                    <Text style={styles.nextText}>Next</Text>
                </TouchableOpacity>

                {/* Footer */}
            </View>
        )
    }
}
