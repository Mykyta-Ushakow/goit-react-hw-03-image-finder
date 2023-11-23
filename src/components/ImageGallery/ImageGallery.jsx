import { Component } from 'react';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { GalleryWrap } from './ImageGallery.styled';

export class ImageGallery extends Component {
  render() {
    return (
      <GalleryWrap>
        {this.props.items.map(item => (
          <ImageGalleryItem
            item={item}
            key={item.id}
            onOpenModal={this.props.onOpenModal}
          />
        ))}
      </GalleryWrap>
    );
  }
}
