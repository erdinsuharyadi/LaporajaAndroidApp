import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert
} from 'react-native';
import {connect} from "react-redux";
import {compose} from "redux";
import { Field, reduxForm } from 'redux-form';
import InputText from "../../Components/InputText";
import {loginUser, logoutUser} from "../../Redux/Actions/auth.actions";
import Logo from '../../Components/Logo';
import Loader from "../../Components/Loader";
import { axiosDelete } from '../../Utils/axios'
import Color from '../../Assets/Color'

class Login extends Component {

  loginUser = async (values) => {
      try {
          const response =  await this.props.dispatch(loginUser(values));
          console.log('Res: ', response);
          
          if (!response) {
              throw response;
          } else if (response.responseBody.result.level === '0') {
            axiosDelete("/auth/logout", response.responseBody.result.token)
            Alert.alert(
              'Login failed!',
              'Gagal',
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Klik cancel'),
                  style: 'cancel',
                },
              ]
            );
          }
      } catch (error) {
          let errorText;
          if (error.message) {
              errorText = error.message
          }
          errorText = error.message;
          Alert.alert(
            'Login Error!',
            errorText,
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Klik cancel'),
                style: 'cancel',
              },
            ]
          );
      }
  }

  onSubmit = (values) => {
      this.loginUser(values);
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
    const { handleSubmit, loginUser} = this.props;
		return(
			<View style={styles.container}>
        {(loginUser && loginUser.isLoading) && <Loader />}
				<Logo/>
        <Field
            name="noHp"
            placeholder="No HP"
            component={this.renderTextInput} />
        <Field
            name="password"
            placeholder="Password"
            secureTextEntry={true}
            component={this.renderTextInput} />
        <TouchableOpacity style={styles.button} onPress={handleSubmit(this.onSubmit)}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
				<View style={styles.signupTextCont}>
					<Text style={styles.signupText}>Do not have an account yet?</Text>
					<TouchableOpacity onPress={() => this.props.navigation.navigate('Signup')}><Text style={styles.signupButton}> Signup</Text></TouchableOpacity>
				</View>
			</View>
			)
	}
}

const validate = (values) => {
    const errors = {};
    if(!values.noHp) {
        errors.noHp = "No HP is required"
    }
    if(!values.password) {
        errors.password = "Password is required"
    }
    return errors;
};

mapStateToProps = (state) => ({
    loginUser: state.authReducer.loginUser
})

mapDispatchToProps = (dispatch) => ({
    dispatch
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: "login",
    validate
  })
)(Login);


const styles = StyleSheet.create({
  container : {
    backgroundColor:'#ffffff',
    flex: 1,
    alignItems:'center',
    justifyContent :'center'
  },
  signupTextCont : {
  	flexGrow: 1,
    alignItems:'flex-end',
    justifyContent :'center',
    paddingVertical:16,
    flexDirection:'row'
  },
  signupText: {
  	color:'#706f6f',
  	fontSize:16
  },
  signupButton: {
  	color:'#706f6f',
  	fontSize:16,
  	fontWeight: 'bold'
  },
  button: {
    width:300,
    backgroundColor:Color.primary,
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13
  },
  buttonText: {
    fontSize:16,
    fontWeight:'bold',
    color:'#ffffff',
    textAlign:'center'
  },
});