import './App.css';
import Main from "./Components/MainComponent"
import { Component } from 'react';
import { DISHES } from "./shared/dishes";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore'


const store = ConfigureStore();

class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      dishes:DISHES
    }
  }
  render(){
    return(
      // provide the tore to the application
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Main />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}



export default App;
