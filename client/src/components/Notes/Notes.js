import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  ListGroup,
  ListGroupItem,
  Spinner
} from "reactstrap";
import "./Notes.css";
import { connect } from "react-redux";
import { addNotes  ,fetchNotes, updateNotes, deleteNotes} from "../../store/actions/actions";
import {withRouter} from 'react-router';
import { ToastContainer, toast } from 'react-toastify';

const Notes = ({ addNotes, addResponse, history, allNotes, fetchNotes, updateNotesResponse, updateNotes, deleteNotes, delteNotesResponse }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [notesId , setNotesId] = useState("")
  const [inputState, setInputState] = useState({
    title: "",
    description: "",
    emotion: "",
  });

  useEffect(()=>{
    fetchNotes()
    setIsLoading(true)
  }, [])

  useEffect(() => {
    console.log("notes", delteNotesResponse);
    if (delteNotesResponse) {
      setIsLoading(false)
      toast.success(delteNotesResponse);
    }
    else {
      if(delteNotesResponse){
      toast.error(delteNotesResponse);
      setIsLoading(false)
      setInputState({title: "",
      description: "",
      emotion: "",})
      }
    }
  }, [delteNotesResponse]);

  useEffect(() => {
    console.log("notes", updateNotesResponse);
    if (updateNotesResponse && updateNotesResponse.data && updateNotesResponse.data.length > 0) {
      setIsLoading(false)
      toast.success(updateNotesResponse.message);
    }
    else {
      if(updateNotesResponse){
      toast.error(updateNotesResponse);
      setIsLoading(false)
      setInputState({title: "",
      description: "",
      emotion: "",})
      }
    }
  }, [updateNotesResponse]);

  useEffect(() => {
    console.log("notes", addResponse);
    if (addResponse && addResponse.data && addResponse.data.length > 0) {
      setIsLoading(false)
      toast.success(addResponse.message);
    }
    else {
      if(addResponse){
      toast.error(addResponse);
      setIsLoading(false)
      setInputState({title: "",
      description: "",
      emotion: "",})
      }
    }
  }, [addResponse]);


  useEffect(() => {
    console.log("notes", allNotes);
    if (allNotes && allNotes.data && allNotes.data.length > 0) {
      setIsLoading(false)
      toast.success("Todo Found succesfully");
    }
    else {
      if(allNotes){
      toast.error(allNotes);
      setIsLoading(false)
      }
    }
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
    const {title, description, emotion} = {...inputState};
    if(title && description && emotion){
    addNotes(inputState);
    setIsLoading(true)
    }
    else{
      toast.error("Please provide the required information");
    }
  };

  const updateNotesHandler = () => {
    const {title, description, emotion} = {...inputState};
    if(title && description && emotion){
    updateNotes({
      id_tareas: notesId,
      titulo : title, 
      descripcion: description, 
      emocion: emotion
    });
    setIsLoading(true)
    }
    else{
      toast.error("Please provide the required information");
    }
  };

  const listClickHandler = (list) =>{
    const {id_tareas, titulo, descripcion, emocion} = {...list}
    setNotesId(id_tareas)
    setInputState({
      title: titulo,
    description: descripcion,
    emotion: emocion
    })
  }

  const delteNotesHandler = () =>{
    deleteNotes({
      id_tareas: notesId
    });
    setIsLoading(true)
  }
  return (
    isLoading? 
      <Spinner style={{ width: '3rem', height: '3rem', marginLeft: "47%", marginTop: "20%"}}  color="danger" />:
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
            <Button className="buttonText" outline color="primary" onClick={updateNotesHandler}>
              Actualizar
            </Button>
            {/**To update */}
            <Button className="buttonText" outline color="primary" onClick={delteNotesHandler}>
              Eliminar
            </Button>{" "}
            {/**Remove */}
          </div>
        </div>
        <div className="grouplistButton">
          <ListGroup className={`${allNotes && allNotes!=="NETWORK ERROR" && allNotes.length> 0 ? "groupList": ""}`}>
            {allNotes && allNotes!=="NETWORK ERROR" &&  allNotes.length >0 &&
              allNotes.map((list, index) => {
                return (
                  <ListGroupItem
                    key={index}
                    onClick={listClickHandler}
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
      <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      draggable
      />
      {/* Same as */}
    <ToastContainer />
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    addResponse: state.notesState.addNotes || {},
    allNotes: state.notesState.notes || [],
    updateNotesResponse: state.notesState.updateNotes || {},
    delteNotesResponse: state.notesState.deleteNotes
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNotes: (data) => dispatch(addNotes(data)),
    fetchNotes: () => dispatch(fetchNotes()),
    updateNotes: (data) => dispatch(updateNotes(data)),
    deleteNotes: (data) => dispatch(deleteNotes(data))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Notes));