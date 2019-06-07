import React from "react"
import { Typography, List, Button, Icon, Input,  Row, Col } from 'antd';
import uuidv4 from 'uuid/v4';
import http from '../services/http';
import { Notification } from '../components/Notification.jsx';

const { Title } = Typography;

class Categories extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      alert: true
    };

    this.getCategories = this.getCategories.bind(this)
  }

  componentDidMount() {
    this.getCategories();
  }

  render() {

    const { categories } = this.state;

    return (
      <div>
        <Row gutter={16}>
          <Col span={21}>
            <Title level={2}>Categories</Title>
          </Col>
          <Col span={3}>
            <Button
              onClick={() => { this.handleAdd() }}
              type="primary"
              icon='plus'
              block>Add</Button>
          </Col>
        </Row>
        <List bordered>
          {
            categories.map((category, index) => {
              const { _id, name, slug, added, edited } = category;

              return (
                <List.Item key={_id}>
                  <Row gutter={16} style={{width: '100%'}}>
                    <Col span={9}>
                      <Input
                        onChange={() => { this.handleChange(event, index, 'name') }}
                        placeholder="Name"
                        value={name}
                      />
                    </Col>
                    <Col span={9}>
                      <Input
                        onChange={() => { this.handleChange(event, index, 'slug') }}
                        placeholder="Slug"
                        value={slug
                      }/>
                    </Col>
                    <Col span={3}>
                      { added ?
                        <Button
                          onClick={() => { this.handleCreate(index) }}
                          block
                        ><span><Icon type="save" />&nbsp;Save</span></Button>
                        :
                        <Button
                          onClick={() => { this.handleEdit(index) }}
                          block
                        >{ edited ? <span><Icon type="save" />&nbsp;Save</span> : <span><Icon type="edit" />&nbsp;Edit</span> }</Button>
                      }
                    </Col>
                    <Col span={3}>
                      <Button
                        onClick={() => { this.handleRemove(index) }}
                        type="danger"
                        block
                      >
                        <span><Icon type="delete" />&nbsp;Delete</span>
                      </Button>
                    </Col>
                  </Row>
                </List.Item>
              )
            })
          }
        </List>
      </div>
    )
  }

  getCategories() {
    http.get('/categories')
      .then(({ data }) => {
        this.setState({ categories: data });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  handleAdd() {
    const { categories } = this.state;
    const category = {
      _id: uuidv4(),
      name: '',
      slug: '',
      added: true,
      edited: true
    };

    this.setState({
      categories: [
        ...categories,
        category
      ]
    });
  };

  handleCreate(index) {
    const categories = this.state.categories.slice();
    const category = categories[index];
    const { name, slug } = category;

    if(name !== '' && slug !== '') {
      http.post('/create-category', category)
        .then(({ data }) => {
          Notification(data, 'success');
          this.getCategories();
        })
        .catch((error) => {
          Notification(error, 'error');
        })
    } else {
      Notification('Fields is required', 'error');
    }
  }

  handleEdit(index) {
    const categories = this.state.categories.slice();
    const category = categories[index];
    const { name, slug } = category;

    if(name !== '' && slug !== '') {
      http.put('/edit-category', category)
        .then(({ data }) => {
          categories[index]['edited'] = false;
          Notification(data, 'success');
          this.setState({ categories });
        })
        .catch((error) => {
          Notification(error, 'error');
        })
    } else {
      Notification('Fields is required', 'error');
    }
  }

  handleRemove(index) {
    const categories = this.state.categories.slice();
    const _id = categories[index]._id;
    const added = categories[index].added;

    if(added) {
      const filteredCategories = categories.filter((category, idx) => idx !== index );
      this.setState({ categories: filteredCategories });
    } else {
      http.delete('/remove-category', { data: { _id }})
        .then(({ data }) => {
          const filteredCategories = categories.filter((category, idx) => idx !== index );
          Notification(data, 'success');
          this.setState({ categories: filteredCategories });
        })
        .catch((error) => {
          Notification(error, 'error');
        })
    }
  }

  handleChange(event, index, type) {
    const categories = this.state.categories.slice();
    categories[index][type] = event.target.value;
    categories[index]['edited'] = true;
    this.setState({ categories });
  }
}

export default Categories;