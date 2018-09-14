import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import axios from 'axios';

const mapStateToProps = state => ({
  user: state.user,
  itemToAdd: state.itemToAdd,
});

class AddItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      image_url: '',
    }
  }
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  componentDidUpdate() {

    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  handleDescriptionChange = (event) => {
    this.props.dispatch({
      type: 'ADD_ITEM_DESCRIPTION',
      payload: event.target.value
    })
  }

  handleImageChange = (event) => {
    this.props.dispatch({
      type: 'ADD_ITEM_IMAGE',
      payload: event.target.value
    })
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(this.props.itemToAdd);
    axios({
      method: 'POST',
      url: '/api/shelf',
      data: this.props.itemToAdd,
    }).then((response) => {
      console.log(response);
      this.props.dispatch({
        type: 'RESET_STATE',
      })
      alert('Item was added.');
    }).catch((error) => {
      console.log(error);
      alert('Unable to add item.');
    })
  }


render() {
  let content = null;

  if (this.props.user.userName) {
    content = (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <input type="text" placeholder="description" name="description" onChange={this.handleDescriptionChange} />
          <input type="text" placeholder="image url" name="image_url" onChange={this.handleImageChange} />
          <input type="submit" value="submit" />
        </form>
        {JSON.stringify(this.props.id)}
      </div>
    );
  }

  return (
    <div>
      <Nav />
      {content}
    </div>
  );
}
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(AddItem);
