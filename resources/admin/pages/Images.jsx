import React from "react"
import { Typography, Button, Row, Col } from 'antd';

import http from '../services/http';
import { Notification } from '../components/Notification.jsx';
import Loader from '../components/Loader.jsx';

const { Title } = Typography;

class Images extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageLoading: false,
      images: [],
      willBeRemoved: []
    };

    this.handleRemove = this.handleRemove.bind(this)
  }

  componentDidMount() {
    http.get('/images')
      .then(({ data }) => {
        const { images } = data;
        this.setState({ images });
      })
      .catch((error) => {
        Notification(error, 'error');
        console.log(error);
      })
  }

  handleRemove() {
    const removedImages = this.state.willBeRemoved.slice();

    if(removedImages.length) {
      const images = this.state.images.slice();

      const restImages = images.filter( function( image ) {
        return !removedImages.includes( image );
      });

      this.setState({ imageLoading: true });

      http.delete('/remove-image-group', { data: { images: removedImages }})
        .then(({ data }) => {
          this.setState({
            imageLoading: false,
            images: restImages
          });
          const { message, type } = data;
          Notification(message, type);
        })
        .catch((error) => {
          const { message, type } = data;
          Notification(message, type);
          console.log(error);
        });
    }
  }

  onChange(image) {
    const willBeRemoved = this.state.willBeRemoved.slice();
    
    this.setState({
      willBeRemoved: [
        ...willBeRemoved,
        image
      ]
    });
  }

  render() {
    const { images, imageLoading } = this.state;

    return (
      <div>
        <Loader loading={imageLoading} />
        <Row gutter={16}>
          <Col span={21}>
            <Title level={2}>Images</Title>
          </Col>
          <Col span={3}>
            <Button
              onClick={ this.handleRemove }
              type="danger"
              icon='delete'
              block>Remove</Button>
          </Col>
        </Row>
        <Row gutter={16}>
          {
            images.map((image, index) => {
              return (
                <Col span={6} key={image}>
                  <label htmlFor={index} className='image-check'>
                    <input id={index} className='image-check__input' type="checkbox" onChange={() => { this.onChange(image) }} />
                    <div className='image-card' style={{ backgroundImage: `url(/uploads/images/${image})` }} />
                  </label>
                </Col>
              )
            })
          }
        </Row>
      </div>
    )
  }
}

export default Images;