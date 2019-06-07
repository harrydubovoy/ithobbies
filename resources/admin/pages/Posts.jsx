import React from "react"
import { Typography, Table, Divider, Button, Col, Row } from 'antd';
import { Link } from "react-router-dom";
import http from "../services/http";
import { truncateWithEllipses, formatedDate, buildUrlPost } from '../services';
import { Notification } from "../components/Notification.jsx";

const { Title, Text } = Typography;
const { Column } = Table;


class Posts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    http.get('/posts')
      .then(({ data }) => {
        this.setState({ posts: data });
      })
      .catch((error) => {
        Notification(error, 'error');
        console.log(error);
      })
  }


  render() {
    const { posts } = this.state;

    return (
      <div>
        <Row gutter={16}>
          <Col span={21}>
            <Title level={2}>Posts</Title>
          </Col>
          <Col span={3}>
            <Link to="/admin/article">
              <Button type="primary" block icon='plus'>Add</Button>
            </Link>
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


  handleRemove(_id) {
    const posts = this.state.posts.slice();

    http.delete('/remove-post', { data: { _id }})
      .then(({ data }) => {
        const filteredPosts = posts.filter((post) => post._id !== _id );
        this.setState({ posts: filteredPosts });
        Notification(data, 'success');
      })
      .catch((error) => {
        Notification(error, 'error');
        message.error(error);
      })

  }
}

export default Posts;