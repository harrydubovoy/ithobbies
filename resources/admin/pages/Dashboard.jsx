import React from "react"
import { Typography, Table, Button, Col, Row } from 'antd';
import { Link } from "react-router-dom";
import http from "../services/http";
import { truncateWithEllipses, formatedDate, buildUrlPost } from '../services';

const { Title, Text } = Typography;
const { Column } = Table;


class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    http.get('/new-comments')
      .then(({ data }) => {
        this.setState({ posts: data.posts });
      })
      .catch((error) => {
        console.log(error);
      })
  }


  render() {
    const { posts } = this.state;

    return (
      <div>
        <Row gutter={16}>
          <Col span={21}>
            <Title level={2}>Dashboard</Title>
          </Col>
        </Row>

        { posts.length ?
          <div>
            <Row gutter={16}>
              <Col span={21}>
                <Title level={4}>
                  <Text type="secondary">You have new comments</Text>
                </Title>
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
                width={120}
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
            </Table>
          </div>
          :
          null
        }
      </div>
    )
  }
}

export default Dashboard;