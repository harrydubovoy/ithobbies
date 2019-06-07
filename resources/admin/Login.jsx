import React from "react";
import { Layout, Form, Icon, Input, Button } from 'antd';
import axios from 'axios';

import { Notification, type } from './components/Notification.jsx';

const { Content } = Layout;

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Layout>
        <Content style={{ margin: 16, overflow: 'initial' }}>
          <div className='content content--login-form'>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item>
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: 'Please input Username!' }],
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Username"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please input Password!' }],
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="Password"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button">
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Content>
      </Layout>
    )
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (err) {
        console.log('Received values of form: ', values);
      } else {
        console.log(values);
        axios.post('/login', values)
          .then(function (response) {
            console.log('res', response);
            window.location.href = '/admin/'
          })
          .catch(function (error) {
            Notification('Wrong login or password', 'error');
          });
      }
    });
  };
}

const WrappedLoginForm = Form.create({ name: 'login_form' })(Login);

export default WrappedLoginForm;