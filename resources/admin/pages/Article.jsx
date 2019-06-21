import React from "react"
import { Form, Icon, Upload, Input, Button, Radio, Select, Col, Row, Typography, Spin } from "antd";
import { Editor } from '@tinymce/tinymce-react';
import http from "../services/http";
import { getBase64, redirect } from '../services'
import BackButton from "../components/BackButton.jsx";
import { Notification } from '../components/Notification.jsx';
import Loader from '../components/Loader.jsx';

const { Title } = Typography;
const { TextArea } = Input;

class Article extends React.Component {
  constructor(props) {
    super(props);

    this._id = this.props.match.params.id;

    this.state = {
      imageUrl64: null,
      imageDefault: 'default-img.png',
      imageLoading: false,

      categories: [],
      post: {
        image: null,
        thumb: null,
        title: '',
        description: '',
        content: '',
        published: false,
        category: {
          _id: null
        }
      }
    };


    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUploadImage = this.handleUploadImage.bind(this);
  }

  componentDidMount() {
    const action = this._id ? `/edit-post/${this._id}` : '/create-post';

    http.get(action)
      .then(({ data }) => {
        const { post, categories } = data;
        if(this._id) {
          this.setState({ post, categories });
        } else {
          this.setState({ categories });
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  handleEditorChange(content) {
    const post = { ...this.state.post, content };
    this.setState({ post });
  };

  handleSubmit(event) {
    event.preventDefault();

    const action = this._id ? `/edit-post` : '/create-post';

    this.props.form.validateFields((err, values) => {
      if (err) {
        console.log('Received values of form: ', values);
      } else {
        const { post } = this.state;
        const _id = this._id;

        http.post(action, { _id, ...post })
          .then(({ data }) => {
            if(!_id) {
              redirect(this, '/admin/posts');
            }
            Notification(data, 'success');
          })
          .catch((error) => {
            Notification(error, 'error');
            console.log(error);
          })
      }
    });
  };

  handleUploadImage(info) {
    const image = info.file.name;
    const thumb = `thumb-${image}`;
    this.setState({ imageLoading: true });

    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, imageUrl64 => {
        this.setState({
          imageUrl64,
          imageLoading: false,
          post: {
            ...this.state.post,
            image,
            thumb
          }
        });
        Notification(info.file.response, 'success');
      })
    }
  }

  handleRemoveImage(image) {
    this.setState({ imageLoading: true });
    http.delete('/remove-image', { data: { image }})
      .then(({ data }) => {
        this.setState({
          imageUrl64: null,
          imageLoading: false,
          post: {
            ...this.state.post,
            image: '',
            thumb: ''
          }
        });
        const { message, type } = data;
        Notification(message, type);

        if(this._id) {
          http.post('/edit-post', { _id: this._id, ...this.state.post })
        }
      })
      .catch((error) => {
        const { message, type } = data;
        Notification(message, type);
        console.log(error);
      })
  }

  handleChange(event, type, value) {
    const post = { ...this.state.post};
    post[type] = !value ? event.target.value : value;

    this.setState({ post });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const _id = this._id;
    const { post, categories, imageUrl64, imageDefault, imageLoading } = this.state;
    const {
      image,
      title,
      description,
      content,
      published,
      category
    } = post;

    const imageUrl = image ? `/uploads/images/${image}` : `/images/default/${imageDefault}`;
    const hasImage = image || imageUrl64;

    const uploadButton = (
      <Button>
        <Icon type="upload" /> Upload
      </Button>
    );

    const removeButton = (
      <Button
        type="danger"
        onClick={() => { this.handleRemoveImage(image) }}
      >
        <Icon type="close" /> Remove
      </Button>
    );


    return (
      <div>
        <Row gutter={16}>
            <Col span={21}>
                <Title level={2}> { _id ? 'Edit Post' : 'Add New' } </Title>
            </Col>
            <Col span={3}>
              <BackButton {...this.props} />
            </Col>
        </Row>
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col span={24}>
              <div
                className='main-image'
                style={{
                  backgroundImage: `url(${imageUrl64 ? imageUrl64 : imageUrl})`
                }}
              >
                <Loader loading={imageLoading} />
              </div>
              <Form.Item label="Image">
                {getFieldDecorator('image', {
                  rules: [{ required: true, message: 'You must upload image' }],
                  initialValue: image,
                })(
                  <Upload
                    name="image"
                    showUploadList={false}
                    onChange={this.handleUploadImage}
                    action='/api/upload-image'
                  >
                    { hasImage ? null : uploadButton }
                  </Upload>
                )}
                  { hasImage ? removeButton : null }
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Title" hasFeedback>
            {getFieldDecorator('title', {
              rules: [{ required: true, message: 'Please input title' }],
              initialValue: title,
              setFieldsValue: title
            })(
              <Input onChange={(event) => { this.handleChange(event, 'title') }} />
            )}
          </Form.Item>
          <Form.Item label="Description" hasFeedback>
            {getFieldDecorator('description', {
              rules: [{ required: true, message: 'Please input description!' }],
              initialValue: description,
              setFieldsValue: description
            })(
              <TextArea
                autosize={{ minRows: 2 }}
                onChange={(event) => { this.handleChange(event, 'description') }}
              />
            )}
          </Form.Item>
          <Form.Item label="Content">
            <Editor
              value={content}
              onEditorChange={this.handleEditorChange}
              init={{
                height: 200,
                branding: false,
                plugins: "emoticons link lists image media preview imagetools code codesample",
                codesample_languages: [
                  {text: 'HTML/XML', value: 'markup'},
                  {text: 'JavaScript', value: 'javascript'},
                  {text: 'CSS', value: 'css'},
                  {text: 'PHP', value: 'php'},
                  {text: 'Ruby', value: 'ruby'},
                  {text: 'Python', value: 'python'},
                  {text: 'Java', value: 'java'},
                  {text: 'C', value: 'c'},
                  {text: 'C#', value: 'csharp'},
                  {text: 'C++', value: 'cpp'}
                ],
                images_upload_url: '/api/image-upload',
                automatic_uploads: true,
                image_dimensions: false,
                media_live_embeds: true
              }}
            />
          </Form.Item>
            <Row gutter={16}>
              <Col span={14}>
                <Form.Item label="Select" hasFeedback>
                  {getFieldDecorator('category', {
                    rules: [{ required: true, message: 'You must select category' }],
                    initialValue: category && category._id,
                  })(
                    <Select
                      placeholder="Please select a category"
                      onChange={(value) => { this.handleChange(event, 'category', value) }}
                    >
                      {
                        categories.map((category) => {
                          const { _id, name } = category;
                          return <Select.Option value={_id} key={_id}>{name}</Select.Option>
                        })
                      }
                    </Select>
                  )}
                </Form.Item>
              </Col>
                <Col span={5}>
                  <Form.Item label="Status">
                    {getFieldDecorator('published', {
                      initialValue: published,
                      setFieldsValue: published
                    })(
                      <Radio.Group onChange={() => { this.handleChange(event, 'published') }}>
                        <Radio value={false}>Draft</Radio>
                        <Radio value={true}>Public</Radio>
                      </Radio.Group>
                    )}
                  </Form.Item>
                </Col>
            </Row>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >Save</Button>
            </Form.Item>
        </Form>
      </div>
    )
  }
}

const WrappedArticle = Form.create({ name: 'article' })(Article);

export default WrappedArticle;