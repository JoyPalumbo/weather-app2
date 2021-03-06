import React from 'react';
import axios from 'axios';
import './App.css';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      description: 'cloudy',
      temp: 75
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(location) {
    this.setState({
      location: location.target.value
    });
    // console.log(location.target.value);
  }
  // function App() {
  handleSubmit(event) {
    //This prevents page from re-loading when clicked
    event.preventDefault();
    // console.log(event);

    // const { target: { value } } = event;
    const { location } = this.state;

    // And do whatever you need with it's value, for example change state 
    this.setState({ location: value });
    // const data = new FormData();
    // data.append('location', location.target);
    console.log('clicked successfully');
    // console.log(data);
    // Access FormData fields with `data.get(fieldName)`
  }

  // function handleClick(e) {
  //   this.setState({ input: e.target.value })
  // axios.post('/api/location')
  //   .then(response => console.log('response words'))
  //   .catch(err => console.error(err));

  // fetch('/api/location', {
  //   type: 'POST',
  //   body: data
  // })
  //   console.log("clicked successfully");
  // }

  async componentDidMount() {
    let API = (`//api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=301a5f02ab435c9dcd29263f8ae55d3c&units=metric`);
    const response = await fetch(API);
    const data = await response.json();
    this.setState({ description: data.weather[0].description, temp: data.main.temp });
    console.log(data);
    // let weather = API.get('/', {
    //   main description: "",
    //   temp: 0,
    //   img: ''
  };



  //     // Parse the results for ease of use.
  // userData = userData.data.results[0];

  //   this.setState({
  //     ...this.state, ...{
  //       isLoading: false,
  //       name,
  //       avatar,
  //       email
  //     }
  //   });
  // }

  render() {
    return (
      <div className="App" >
        <body className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Joy's Weather App</h1>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >

          </a>


          <form onSubmit={this.handleSubmit}>
            <label>
              Location:
            <input type="text" value={this.state.location} onChange={this.handleChange} />
            </label>
            {/* //When I do it this way it rerenders after every click */}
            {/* <input type="submit" value="Submit" onClick={handleSubmit} /> */}
          </form>
          {/* When I do the button on click it does not re-render */}
          <button onClick={this.handleSubmit}>
            Click me!
    </button>
          <div id="weather">weather: {this.state.description}</div>
          <div id="weather">Temp: {this.state.temp}</div>
        </body>
      </div>
    );
  }
}

export default Form;