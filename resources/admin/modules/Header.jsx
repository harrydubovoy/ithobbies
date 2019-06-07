import React from "react";
import { Link } from "react-router-dom";
import { Layout, Input, Button, Typography, Row, Col } from "antd";
import { redirect } from "../services";


const { Header } = Layout;
const { Text } = Typography;

const Search = Input.Search;


class PageHeader extends React.Component {
  constructor(props) {
    super(props);

    console.log('header', props)
  }

  render() {
    return (
      <Header style={{ background: '#fff'}}>
        <Row gutter={16}>
          <Col span={3}>
            <Link to="/" target='_blank'>
              <Text type="secondary" style={{fontSize: '24px', fontWeight: '600'}}>itHobbies</Text>
            </Link>
          </Col>
          <Col span={18}>
            <Search
              placeholder="input search text"
              onSearch={(string) => { this.props.onSearch(string); redirect(this, '/admin/search') }}
            />
          </Col>
          <Col span={3}>
            <Button type="primary" block icon="logout">Logout</Button>
          </Col>
        </Row>
      </Header>
    )
  }
}

export default PageHeader;