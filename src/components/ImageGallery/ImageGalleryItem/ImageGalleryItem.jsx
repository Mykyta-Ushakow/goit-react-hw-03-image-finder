import { Component } from 'react';

export class ImageGalleryItem extends Component {
  handleClick = () => {
    this.props.onOpenModal(this.props.item.largeImageURL);
  };

  render() {
    return (
      <li className="ImageGalleryItem" onClick={this.handleClick}>
        <img
          src={this.props.item.webformatURL}
          alt={this.props.item.tags}
          className="ImageGalleryItem-image"
        />
      </li>
    );
  }
}
