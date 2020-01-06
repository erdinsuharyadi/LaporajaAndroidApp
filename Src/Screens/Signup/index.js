import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar ,
  TouchableOpacity,
  Alert
} from 'react-native';
import { Field, reduxForm, change } from 'redux-form';
import {connect} from "react-redux";
import {compose} from "redux";
import { axiosPost } from '../../Utils/axios'
import Logo from '../../Components/Logo';
import Form from '../../Components/Form';
import InputText from "../../Components/InputText";
import {createNewUser} from "../../Redux/Actions/auth.actions";
import Loader from "../../Components/Loader";
import URL from '../../Config/URL'
import Color from '../../Assets/Color'

class Signup extends Component {

  createNewUser = async (values) => {    
    try {
      const response = await axiosPost('/auth/signup/', values)
      console.log(response.data.status)
      if(response.data.status === 200) {
        Alert.alert(
          'Success',
          'Signup successful',
          [
            {
              text: 'Ok',
              onPress: () => this.props.navigation.navigate('Login'),
              style: 'default',
            },
          ]
        );
      }
    } catch (error) {     
      Alert.alert(
        'Error!',
        "Sign up error",
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
        ]
      );
    }
  }

  onSubmit = (values) => {
      this.createNewUser(values);
  }

  renderTextInput = (field) => {
        const {meta: {touched, error}, label, secureTextEntry, maxLength, keyboardType, placeholder, input: {onChange, ...restInput}} = field;
        return (
            <View>
              <InputText
                  onChangeText={onChange}
                  maxLength={maxLength}
                  placeholder={placeholder}
                  keyboardType={keyboardType}
                  secureTextEntry={secureTextEntry}
                  label={label}
                  {...restInput} />
            {(touched && error) && <Text style={styles.errorText}>{error}</Text>}
            </View>
        );
  }

	render() {
    this.props.dispatch(change("register","level","1"));
    const { handleSubmit, createUser} = this.props;
		return(
			<View style={styles.container}>
        {createUser.isLoading && <Loader />}
				<Logo/>
        <Field
            name="fullName"
            placeholder="Full Name"
            component={this.renderTextInput} />
        <Field
          name="noHp"
          placeholder="No HP"
          component={this.renderTextInput} />
        <Field
            name="password"
            placeholder="Password"
            secureTextEntry={true}
            component={this.renderTextInput} />
        <Field
            name="noKtp"
            placeholder="No KTP"
            component={this.renderTextInput} />
        <Field
          name="address"
          placeholder="Address"
          component={this.renderTextInput} />

        <TouchableOpacity style={styles.button} onPress={handleSubmit(this.onSubmit)}>
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>
				<View style={styles.signupTextCont}>
					<Text style={styles.signupText}>Already have an account?</Text>
					<TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}><Text style={styles.signupButton}> Sign in</Text></TouchableOpacity>
				</View>
			</View>
			)
	}
}

const initialValues = {
  level: '1'
}

const validate = (values) => {
    const errors = {};
    if(!values.fullName) {
        errors.name = "Full Name is required"
    }
    if(!values.nohp) {
      errors.nohp = "No HP is required"
    }
    if(!values.password) {
      errors.password = "Password is required"
    }
    if(!values.noktp) {
        errors.noktp = "No KTP is required"
    }
    if(!values.address) {
      errors.address = "Address is required"
  }
    return errors;
};

const styles = StyleSheet.create({
  container : {
    backgroundColor:'#ffffff',
    flex: 1,
    alignItems:'center',
    justifyContent :'center'
  },
  signupTextCont: {
  	flexGrow: 1,
    alignItems:'flex-end',
    justifyContent :'center',
    paddingVertical:16,
    flexDirection:'row',
  },
  signupText: {
  	color:'#706f6f',
    fontSize:16,
    
  },
  signupButton: {
  	color:'#706f6f',
  	fontSize:16,
  	fontWeight: 'bold'
  },
  button: {
    width:300,
    backgroundColor: Color.primary,
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13
  },
  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'center'
  },
  errorText: {
      color: "rgb(0,0,0)",
      fontSize:14,
      paddingHorizontal:16,
      paddingBottom: 8
  },
  inputBox: {
    width:300,
    backgroundColor:'rgba(255, 255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal:16,
    fontSize:16,
    color:'#ffffff',
    marginVertical: 10
  }
});

mapStateToProps = (state) => ({
    createUser: state.authReducer.createUser
})

mapDispatchToProps = (dispatch) => ({
    dispatch
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: "register",
    
    validate,
    initialValues
  })
)(Signup);
