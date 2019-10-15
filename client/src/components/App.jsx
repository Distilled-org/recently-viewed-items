import React from 'react';
import axios from 'axios';
import ImageView from './ImageView.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: []
    }
    // this.componentDidMount = this.componentDidMount.bind(this);
    this.checkMount = this.checkMount.bind(this);
  }

  componentDidMount() {
    const randomNum = Math.floor(Math.random() * 99);
    console.log(randomNum)
    axios.get(`/items/${randomNum}`)
    .then((response) => {
      this.setState({
        items: response.data
      })
    })
    .catch((err) => {
      console.log(err);
    })
  }

  checkMount() {
    if (this.state.items.length !== 0) {
      return true
    } else {
      return false
    }
  }

  render() {
    console.log(this.state.items)
    return (
      <div>
        <span>RECENTLY VIEWED</span>
        {this.checkMount() && <ImageView imgObjects={this.state.items.imgObjects}/>}
      </div>
    )
  }
}

export default App;