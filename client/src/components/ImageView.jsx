import React from 'react';
import Photo from './Photo.jsx';

class ImageView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: [0, 1, 2],
    }
    this.position1Visible = this.position1Visible.bind(this);
    this.position2Visible = this.position2Visible.bind(this);
    this.position3Visible = this.position3Visible.bind(this);
    this.scrollLeft = this.scrollLeft.bind(this);
    this.scrollRight = this.scrollRight.bind(this);
  }

  position1Visible(idx) {
    if (this.state.visible[0] === idx) {
      return true
    } else {
      return false
    }
  }

  position2Visible(idx) {
    if (this.state.visible[1] === idx) {
      return true
    } else {
      return false
    }
  }

  position3Visible(idx) {
    if (this.state.visible[2] === idx) {
      return true
    } else {
      return false
    }
  }


  scrollLeft(event) {
    event.preventDefault();
    const newVisible = this.state.visible.slice();
    if (newVisible[0] === 0) {
      for (let i = 1; i < newVisible.length; i += 1) {
        if (newVisible[i] === 0) {
          newVisible[i] = this.props.imgObjects.length - 1;
        } else {
          newVisible[i]--;
        }
      }
      newVisible[0] = this.props.imgObjects.length - 1;
    } else {
      for (let i = 0; i < newVisible.length; i += 1) {
        if (newVisible[i] === 0) {
          newVisible[i] = newVisible[i - 1] + 1;
        } else {
          newVisible[i]--;
        }
      }
    }
    console.log(newVisible)
    this.setState({
      visible: newVisible
    })
  }

  scrollRight(event) {
    event.preventDefault();
    const newVisible = this.state.visible.slice();
    if (newVisible[newVisible.length - 1] === this.props.imgObjects.length - 1) {
      for (let i = 0; i < newVisible.length; i += 1) {
        if (newVisible[i] === this.props.imgObjects.length - 1) {
          newVisible[i] = 0;
        } else {
          newVisible[i]++;
        }
      }
      newVisible[newVisible.length - 1] = 0;
    } else {
      for (let i = 0; i < newVisible.length; i += 1) {
        if (newVisible[i] === this.props.imgObjects.length - 1) {
          newVisible[i] = 0;
        } else {
          newVisible[i]++;
        }
      }
    }
    console.log(newVisible)
    this.setState({
      visible: newVisible
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.scrollLeft}>Scroll Left</button>
        {this.props.imgObjects.map((img, idx) => (
         this.position1Visible(idx) && <Photo name={img.name} url={img.photo} key={idx}/>
        ))}

        {this.props.imgObjects.map((img, idx) => (
         this.position2Visible(idx) && <Photo name={img.name} url={img.photo} key={idx}/>
        ))}

        {this.props.imgObjects.map((img, idx) => (
         this.position3Visible(idx) && <Photo name={img.name} url={img.photo} key={idx}/>
        ))}
        <button onClick={this.scrollRight}>Scroll Right</button>
      </div>
    )
  }
}

export default ImageView;