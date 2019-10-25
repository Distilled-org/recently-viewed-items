import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      position: 0,
      direction: 'next',
      sliding: false,
      isHovering: false,
    }
    this.getItemOrder = this.getItemOrder.bind(this);
    this.nextImage = this.nextImage.bind(this);
    this.previousImage = this.previousImage.bind(this);
    this.slideEffect = this.slideEffect.bind(this);
    this.handleMouseHover = this.handleMouseHover.bind(this);
  }

  componentDidMount() {
    axios.get(`/items/${Math.floor(Math.random() * Math.floor(99))}`)
      .then((response) => {
        this.setState({ items: response.data.imgObjects })
      })
      .catch((err) => { throw(err); })
  }

  getItemOrder(itemIndex) {
    const position = this.state.position;
    const items = this.state.items.slice();
    const numItems = items.length || 1;

    if (itemIndex - position < 0) {
      return numItems - Math.abs(itemIndex - position);
    }
    return itemIndex - position;
  }

  nextImage() {
    const position = this.state.position;
    const items = this.state.items.slice();
    const numItems = items.length || 1;
    let newPosition = 0;
    if (position === (numItems - 1)) {
      newPosition = 0;
    } else {
      newPosition = position + 1;
    }

    this.slideEffect('next', newPosition)
  }

  previousImage() {
    const position = this.state.position;
    const items = this.state.items.slice();
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

  handleMouseHover() {
    this.setState({
      isHovering: !this.state.isHovering
    });
  }

  render() {
    return (
      <AppDisplay>
        <Header>RECENTLY VIEWED</Header>
        <Wrapper onMouseEnter={this.handleMouseHover} onMouseLeave={this.handleMouseHover}>
          {this.state.isHovering && <ButtonLeft onClick={this.previousImage}>&lt;</ButtonLeft>}

           <ImageView direction={this.state.direction} sliding={this.state.sliding}>
            {this.state.items.map((img, idx) => (
              <Photo key={idx} order={this.getItemOrder(idx)}>
                <Text>{img.name}</Text>
                <Image src={img.photo} alt={`image${img.id}`}></Image>
              </Photo>
            ))}
          </ImageView>

          {this.state.isHovering && <ButtonRight onClick={this.nextImage}>&gt;</ButtonRight>}
        </Wrapper>
      </AppDisplay>
    )
  }
}

export default App;

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

const AppDisplay = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
`;

const ButtonLeft = styled.button`
top: 45%;
background: white;
color: black;
font-size: 1em;
font-weight: bold;
z-index: 10;
padding: 1.25rem 1rem;
border: none;
outline: none;
font-family: Helvetica Neue,Helvetica,Arial,sans-serif;
`;

const ButtonRight = styled.button`
top: 45%;
background: white;
color: black;
font-size: 1em;
font-weight: bold;
z-index: 10;
padding: 1.25rem 1rem;
border: none;
outline: none;
font-family: Helvetica Neue,Helvetica,Arial,sans-serif;
`;

const Wrapper = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
  &:hover ${ButtonLeft} {
    position: absolute;
    left: 13px;
  }
  &:hover ${ButtonRight} {
    position: absolute;
    right: 0px;
  }
`;

const ImageView = styled.div`
  display: flex;
  margin: 0px;
  margin-top: 20px;
  transition: ${(props) => props.sliding ? 'none' : 'transform .5s ease'};
  transform: ${(props) => {
    if (!props.sliding) return 'translateX(calc(-33.3333%))'
    if (props.direction === 'prev') return 'translateX(calc(2 * (-33.3333%)))'
    return 'translateX(0%)'
  }};
`;

const Photo = styled.div`
  flex: 1 0 33.3333%;
  flex-direction: row;
  margin-right: 5px;
  margin-left: 5px;
  z-index: 1;
  opacity: 1;
  order: ${(props) => props.order};

  &:hover ${Text} {
    color: black;
  }
`;

const Text = styled.div`
  position: absolute;
  z-index: -10;
  top: 40%;
  font-family: "Helvetica Neue LT W01_71488914 Bd",Helvetica,Arial,sans-serif!important;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.2;
  text-transform: uppercase;
  letter-spacing: .5px;
`;

const Image = styled.img`
  &:hover {
    transition: opacity 0.1s ease;
    opacity: 0.3;
  }
`;