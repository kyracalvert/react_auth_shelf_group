import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';

const mapStateToProps = state => ({
  user: state.user,
});

class AddItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      description: '',
      image_url: '',
    }
  }
  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
          <form>
            <input type="text" placeholder="description" value={this.state.description} name="description" onChange={this.handleInputChange}/>
            <input type = "text" placeholder="image url" value={this.state.image_url} name="image_url" onChange={this.handleInputChange}/>
            <input type="submit" value="submit" />
            </form>
            {JSON.stringify(this.state)}
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
export default connect(mapStateToProps)(AddItem);
