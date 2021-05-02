//import logo from './logo.svg';
import '../App.css';
import React from 'react';
import Contact from './Contact';
import axios from 'axios';

class App extends React.Component {
  state = {
    name: '',
    email: '',
    message: '',
    Response: null,
    ResponseColor: ''
  }

  constructor(props) {
    super(props)
    this.addToDB = this.addToDB.bind(this)
    this.changeNameState = this.changeNameState.bind(this)
    this.changeEmailState = this.changeEmailState.bind(this)
    this.changeMessageState = this.changeMessageState.bind(this)
  }

  addToDB(event) {
    event.preventDefault();
    //console.log(event)
    //console.log(this.state.name)
    //console.log(this.state.email)
    //console.log(this.state.message)

    const requestBody = {
      name: this.state.name,
      email: this.state.email,
      message: this.state.message
    }


    axios.post('http://localhost:8000/api/saveContact', requestBody)
      .then(res => {
        //console.log(res);
        this.setState({ Response: "Successfully Sended." })
        this.setState({ ResponseColor: "bg-success" })
      })
      .catch((error) => {
        //console.log(error);
        this.setState({ Response: "500 Internal Server Error" })
        this.setState({ ResponseColor: "bg-danger" })
      })
  }

  changeNameState(event) {
    event.preventDefault();
    this.setState({ name: event.target.value })
    //console.log(this.state.name)
  }

  changeEmailState(event) {
    event.preventDefault();
    this.setState({ email: event.target.value })
    //console.log(this.state.email)
  }

  changeMessageState(event) {
    event.preventDefault();
    this.setState({ message: event.target.value })
  }

  render() {
    let response = null;
    if (this.state.Response != null) {
      response = <div className={"card col-md-8 offset-md-2 mt-3 " + this.state.ResponseColor}>
        <div className="card-body">
          <div className="card-text text-white fw-bold text-center">
            {this.state.Response}
          </div>
        </div>
      </div>
    }
    return (
      <div>
        {response}
        <div className="form-alignment">
          <Contact addToDB={this.addToDB}
            changeNameState={this.changeNameState}
            changeEmailState={this.changeEmailState}
            changeMessageState={this.changeMessageState}
          ></Contact>
        </div>
      </div>
    )
  }
}

export default App;
