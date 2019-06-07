import React from "react"
import { Typography, Table, Divider, Button, Input, Col, Row, message } from 'antd';
import { Link } from "react-router-dom";
import http from "../services/http";
import { truncateWithEllipses, formatedDate, buildUrlPost } from '../services';

const { Title, Text } = Typography;
const Search = Input.Search;
const { Column } = Table;


class Posts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      string: ''
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const string = sessionStorage.getItem('search');
    if( string ) {
      this.getPosts(string)
    }
  }


  render() {
    const { posts, string } = this.state;

    return (
      <div>
        <Row gutter={16}>
          <Col span={24}>
            <Title level={2}>Search</Title>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Search
              style={{marginBottom: '20px'}}
              placeholder="input search text"
              value={string}
              onSearch={ this.handleSearch }
              onChange={ this.handleChange }
            />
          </Col>
        </Row>
        <Table rowKey={record => record._id} dataSource={posts}>
          <Column
            title="Date"
            dataIndex="createdAt"
            key="date"
            render={(date) => formatedDate(date)}
          />
          <Column
            title="Title"
            dataIndex="title"
            key="title"
            render={(text, data) => {
              return <a href={buildUrlPost(data)} target='_blank'>{truncateWithEllipses(text, 150)}</a>
            }}
          />
          <Column
            title="Category"
            dataIndex="category"
            key="category"
            render={(category) => {
              return category ? category.name : <Text type="danger">Uncategorized</Text>;
            }}
          />
          <Column
            title="Comments"
            dataIndex="comments"
            key="comments"
            render={(comments, data) => {
              const { _id } = data;
              const approved = comments.filter(({ approved })  => !approved);

              return (
                <Button type="primary" block>
                  <Link to={`/admin/comments/${_id}`}>{`${comments.length}/${approved.length}`}</Link>
                </Button>
              )
            }}
          />
          <Column
            title="Status"
            dataIndex="published"
            key="published"
            render={(status) => status ? 'Public' : 'Draft' }
          />
          <Column
            title="Action"
            key="action"
            dataIndex="_id"
            width={230}
            render={(_id) => (
              <span>
                <Link to={`/admin/article/${_id}`}>
                  <Button icon='edit'>Edit</Button>
                </Link>
                <Divider type="vertical" />
                <Button
                  onClick={() => { this.handleRemove(_id) }}
                  type="danger"
                  icon='delete'
                  >Delete</Button>
              </span>
            )}
          />
        </Table>
      </div>
    )
  }

  getPosts(string) {
    http.get(`/search?search=${string}`)
      .then(({ data }) => {
        const { string, posts } = data;
        this.setState({
          string,
          posts
        });
        sessionStorage.setItem('search', string);
      })
      .catch((error) => {
        console.log(error);
      })
  }


  handleRemove(_id) {
    const posts = this.state.posts.slice();

    http.delete('/remove-post', { data: { _id }})
      .then(({ data }) => {
        const filteredPosts = posts.filter((post) => post._id !== _id );
        message.success(data);
        this.setState({ posts: filteredPosts });
      })
      .catch((error) => {
        message.error(error);
      })
  }

  handleSearch(string) {
    this.getPosts(string)
  };

  handleChange(event) {
    const string = event.target.value;

    this.setState({ string })
  }
}

export default Posts;