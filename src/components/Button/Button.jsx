import { Component } from 'react';
import { LoadMore } from './Button.styled';

export class Button extends Component {
  render() {
    return <LoadMore onClick={this.props.onClick}>Load More</LoadMore>;
  }
}
