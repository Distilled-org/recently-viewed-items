import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Header = styled.h3`
  font-family: "Helvetica Neue LT W01_71488914 Bd",Helvetica,Arial,sans-serif!important;
  font-size: 14px;
  line-height: 1.2;
  letter-spacing: .5px;
  font-weight: 400;
  margin: 0;
  padding: 20px 0 0;
  text-align: center;
`;

const Wrapper = styled.div`
  width: 100%;
  overflow: hidden;
`;

const ImageView = styled.div`
  display: flex;
  margin: 0px;
  margin-top: 20px;
  transition: ${(props) => props.sliding ? 'none' : 'transform 1s ease'};
  transform: ${(props) => {
    if (!props.sliding) return 'translateX(calc(-33.3333%))'
    if (props.direction === 'prev') return 'translateX(calc(2 * (-33.3333%)))'
    return 'translateX(0%)'
  }};
`;

const Button = styled.button`
background: white;
color: black;
font-size: 1em;
font-weight: bold;
padding: 1.25rem 1rem;
font-family: Helvetica Neue,Helvetica,Arial,sans-serif;
`;

const Photo = styled.div`
  flex: 1 0 33.3333%;
  flex-direction: row;
  margin-right: 5px;
  margin-left: 5px;
  order: ${(props) => props.order};
`;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      position: 0,
      direction: 'next',
      sliding: false,
    }
    this.checkMount = this.checkMount.bind(this);
    this.getItemOrder = this.getItemOrder.bind(this);
    this.nextImage = this.nextImage.bind(this);
    this.previousImage = this.previousImage.bind(this);
    this.slideEffect = this.slideEffect.bind(this);
  }

  componentDidMount() {
    const randomNum = Math.floor(Math.random() * 99);
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

  getItemOrder(itemIndex) {
    const position = this.state.position;
    const items = this.state.items.imgObjects.slice();
    const numItems = items.length || 1;

    if (itemIndex - position < 0) {
      return numItems - Math.abs(itemIndex - position);
    }
    return itemIndex - position;
  }

  nextImage(event) {
    event.preventDefault();
    const position = this.state.position;
    const items = this.state.items.imgObjects.slice();
    const numItems = items.length || 1;
    let newPosition = 0;
    if (position === (numItems - 1)) {
      newPosition = 0;
    } else {
      newPosition = position + 1;
    }

    this.slideEffect('next', newPosition)
  }

  previousImage(event) {
    event.preventDefault();
    const position = this.state.position;
    const items = this.state.items.imgObjects.slice();
    const numItems = items.length;
    let newPosition = 0;
    if (position === 0) {
      newPosition = numItems - 1;
    } else {
      newPosition = position - 1;
    }

    this.slideEffect('prev', newPosition)
  }

  slideEffect(direction, position) {
    this.setState({
      sliding: true,
      direction: direction,
      position: position
    })
    setTimeout(() => {

      this.setState({
        sliding: false,
      })
    }, 50);
  }

  render() {
    console.log(this.state.items)
    return (
      <div>
        <Header>RECENTLY VIEWED</Header>
        <Wrapper>
          {this.checkMount() && <ImageView direction={this.state.direction} sliding={this.state.sliding}>
            {this.state.items.imgObjects.map((img, idx) => (
              <Photo name={img.name} key={idx} order={this.getItemOrder(idx)}>
                <img src={img.photo}></img>
              </Photo>
            ))}
          </ImageView>}
        </Wrapper>

        <Button onClick={this.previousImage}>&lt;</Button>
        <Button onClick={this.nextImage}>&gt;</Button>
      </div>
    )
  }
}

export default App;