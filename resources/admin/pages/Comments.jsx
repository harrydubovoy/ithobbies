import React from "react"
import { Button, Col, Divider, Row, Table, Typography, Icon } from 'antd';
import http from "../services/http";
import { formatedDate } from '../services';
import BackButton from '../components/BackButton.jsx';
import { Notification } from '../components/Notification.jsx';

const { Title } = Typography;
const { Column } = Table;


class Comments extends React.Component {
    constructor(props) {
      super(props);

      this._id = this.props.match.params.id;

      this.state = {
        comments: []
      }
    }

  componentDidMount() {
    http.get(`/comments/${this._id}`)
      .then(({ data }) => {
        const { comments } = data;
        this.setState({ comments });
      })
      .catch((error) => {
        console.log(error);
      })
  }

    render() {
      const { comments } = this.state;

      return (
        <div>
          <Row gutter={16}>
            <Col span={21}>
              <Title level={2}>Comments</Title>
            </Col>
            <Col span={3}>
              <BackButton {...this.props} />
            </Col>
          </Row>

          <Table rowKey={record => record._id} dataSource={comments}>
            <Column
              title="Info"
              dataIndex="info"
              key="info"
              width={180}
              render={(text, data) => {
                const { author, date, email } = data;

                return (
                  <span>
                    <div><strong>Name:</strong>&nbsp;{author}</div>
                    <div><strong>Date:</strong>&nbsp;{formatedDate(date)}</div>
                    <div><strong>Email:</strong>&nbsp;{email}</div>
                  </span>
                )
              }}
            />
            <Column
              title="Comment"
              dataIndex="text"
              key="text"
            />
            <Column
              title="Action"
              key="action"
              dataIndex="_id"
              render={(_id, data) => {
                const approved = data.approved;
                return (
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    {
                      !approved &&
                        <Button onClick={() => { this.handleApprove(_id) }} type="primary">
                          <span><Icon type="check" />&nbsp;Approve</span>
                        </Button>
                    }
                    { !approved && <Divider type="vertical"/> }
                    <Button
                      onClick={() => { this.handleRemove(_id) }}
                      type="danger">
                      <span><Icon type="delete" />&nbsp;Delete</span>
                    </Button>
                  </span>
                )
              }}
            />
          </Table>
        </div>
      )
    }

    handleApprove(_id) {
      let comments = this.state.comments.slice();

      http.put('/comment-approve', { commentId: _id, postId: this._id })
        .then(({ data }) => {
          comments = comments.map((comment) => {
            if(comment._id === _id) {
              comment.approved = true;
            }
            return comment;
          });
          this.setState({ comments });
          Notification(data, 'success');
        })
        .catch((error) => {
          Notification(error, 'error');
          console.log(error);
        })
    }

    handleRemove(_id) {
      const comments = this.state.comments.slice();

      http.delete('/comment-remove', { data: { commentId: _id, postId: this._id }})
        .then(({ data }) => {
          const filteredComments = comments.filter((comment) => comment._id !== _id );
          this.setState({ comments: filteredComments });
          Notification(data, 'success');
        })
        .catch((error) => {
          Notification(error, 'error');
          console.log(error);
        })
    }
}

export default Comments;