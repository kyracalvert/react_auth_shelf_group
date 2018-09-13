import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';
import Axios from '../../../node_modules/axios';


const mapStateToProps = state => ({
  user: state.user,
});

class ViewShelf extends Component {
  constructor(props){
    super(props);
    this.state = {
      shelf: [],
    }
  }

  componentDidMount = () => {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.getItems();
  }

  getItems = () => {
    Axios({
      method: 'GET',
      url: '/api/shelf',
    }).then((response) => {
      this.setState({
        shelf: response.data,
      })
    }).catch((error) => {
      console.log(`error: ${error}`);
    })
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  logout = () => {
    this.props.dispatch(triggerLogout());
  }

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
          <h1
            id="welcome"
          >
            Welcome, { this.props.user.userName }!
          </h1>
          <ul>
            {this.state.shelf.map((item, i) => {
              return(
                <li key={i}> 
                  <img src={item.image_url} /> {item.description} - {item.person}
                  <button>Delete</button>
                </li>
              )
            })}
          </ul>
          <button
            onClick={this.logout}
          >
            Log Out
          </button>
        </div>
      );
    }

    return (
      <div>
        <Nav />
        { content }
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(ViewShelf);

