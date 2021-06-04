import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import "./Notes.css";
import { connect } from "react-redux";
import { addNotes } from "../../store/actions/actions";
import {withRouter} from 'react-router';

const Notes = ({ addNotes, allNotes, history }) => {
  const [inputState, setInputState] = useState({
    title: "",
    description: "",
    emotion: "",
  });
  useEffect(() => {
    console.log("notes", allNotes);
  }, [allNotes]);
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    const inputValue = inputState;
    setInputState({
      ...inputValue,
      [name]: value,
    });
  };

  const addNotesHandler = () => {
    let list = allNotes;
    list.push(inputState);
    addNotes(list);
    setInputState({
      title: "",
      description: "",
      emotion: "",
    });
  };

  return (
    <div className="gourpedData">
      <div className="loginText">Mis Notas</div> {/* my notes */}
      <div className="notesContainer">
        <div className="form">
          <div className="parent">
            <FormGroup>
              <Label for="title" className="labelText">
                Titulo {/* Title */}
              </Label>
              <Input
                type="text"
                name="title"
                id="title"
                placeholder="Titulo"
                value={inputState.title}
                onChange={onChangeHandler}
              />
            </FormGroup>
            <FormGroup>
              <Label for="description" className="labelText">
                Descripcion {/*Description*/}
              </Label>
              <Input
                type="text"
                name="description"
                id="description"
                placeholder="Descripcion"
                value={inputState.description}
                onChange={onChangeHandler}
              />
            </FormGroup>
            <FormGroup>
              <Label for="emotion" className="labelText">
                Emocion {/*Emotion*/}
              </Label>
              <Input
                type="text"
                name="emotion"
                id="emotion"
                placeholder="Emocion"
                value={inputState.emotion}
                onChange={onChangeHandler}
              />
            </FormGroup>
            <Button
              className="buttonText"
              outline
              color="primary"
              onClick={addNotesHandler}
            >
              Insertar
            </Button>{" "}
            {/*Insert */}
            <Button className="buttonText" outline color="primary">
              Actualizar
            </Button>
            {/**To update */}
            <Button className="buttonText" outline color="primary">
              Eliminar
            </Button>{" "}
            {/**Remove */}
          </div>
        </div>
        <div className="grouplistButton">
          <ListGroup className={`${allNotes.length> 0 ? "groupList": ""}`}>
            {allNotes &&
              allNotes.map((list, index) => {
                return (
                  <ListGroupItem
                    key={index}
                    onClick={() => console.log("index ", index)}
                  >
                    {list.title}
                  </ListGroupItem>
                );
              })}
          </ListGroup>
          <Button className="buttonText" outline color="primary" onClick={()=>{history.push("/")}}>
            Salir
          </Button>{" "}
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    allNotes: state.notesState.notes || ["hello"],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNotes: (data) => dispatch(addNotes(data)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Notes));