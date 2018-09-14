import React, { Component } from 'react';
import { connect } from 'react-redux'; // { connect } has to be imported before we have access to dispatch

import Nav from '../../components/Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';
import Axios from '../../../node_modules/axios';

// give the component access to the state of listed reducers
const mapStateToProps = state => ({
  user: state.user,
  onShelf: state.onShelf, 
});

class ViewShelf extends Component {

  componentDidMount = () => {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.getItems();
  }

  getItems = () => {
    Axios({
      method: 'GET',
      url: '/api/shelf',
    }).then((response) => {
      // this.props.dispatch is the action
      this.props.dispatch({
        payload: response.data,
        type: 'DISPLAY_ITEMS',
      })
    }).catch((error) => {
      console.log(`error: ${error}`);
    })
  }

  deleteItem = (event) => {
    Axios({
      method: 'DELETE',
      url: `/api/shelf/${event.target.value}`
    }).then((response) => {
      console.log(response.data);
      this.getItems();
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
            {/* pull items from the reducer via props */}
            {this.props.onShelf.map((item, i) => {
              let conditionalDeleteButton;
              if (this.props.user.id === item.person_id){
                conditionalDeleteButton = <button onClick={this.deleteItem} value={item.id}>Delete</button>
              }
              return(
                <li key={i}> 
                  <img alt="" src={item.image_url} /> {item.description} - {item.person}
                  {conditionalDeleteButton}
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
export default connect(mapStateToProps)(ViewShelf); // connect also has to be exported

