import React, { useEffect } from "react";
import { Button, Form, FormGroup, Label, Input, NavLink } from "reactstrap";
import "./Login.css";
import {login} from "../../store/actions/actions";
import { connect } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Login = ({signInUser,signIn}) => {
  const history = useHistory();
  const [inputState, setInputState] = React.useState({
    email: "",
    password: ""
  });
  useEffect(() => {
    console.log("SignIn => ", signIn)
    if (signIn && signIn.data) {
      history.push('/notes')
    }
  }, [signIn])
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    const inputValue = inputState;
    setInputState({
      ...inputValue,
      [name]: value,
    });
  };

  const submitHandler = async (e) =>{
    e.preventDefault();
    console.log('inputState ', inputState);
    const { email, password } = {...inputState};
    if(email &&  password ){
      signInUser(inputState);
    }
    else {
      console.log("please provide the required inforation")
    }
  }
  return (
    <Form className="loginForm" onSubmit={submitHandler}>
      <div className="loginParent">
        <div className="loginText">Login</div>
        <FormGroup>
          <Label for="email" className="loginlabelText">
            Correo{/* Email */}
          </Label>
          <Input
            type="email"
            name="email"
            id="email"
            value={inputState.email}
            placeholder="Correo"
            onChange={onChangeHandler}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password" className="loginlabelText">
            Contrasena  {/*Password */}
          </Label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="Contrasena"
            value={inputState.password}
            onChange={onChangeHandler}

          />
        </FormGroup>

        <Button className="loginButtonText" outline color="primary">Ingresar</Button>   {/**Login */}
        <div className="registerButton">
        <NavLink href="/sign-up">No estas registrado? Registrate</NavLink>   {/**not register? register */}
        </div>
      </div>
    </Form>
  );
};

const mapStateToProps = (state) => {
  console.log('State => ', state.notesState.loginState);
  return {
    signIn: state.notesState.loginState
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signInUser: (data) => dispatch(login(data)),
    // loginSuccess: (data) => dispatch(signUpSuccess(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
