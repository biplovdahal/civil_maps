import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPost } from '../actions/postActions';
import { Modal, Button } from 'react-bootstrap';
import { savePlace } from '../actions/postActions';

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location:'',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const post = {
      location: this.state.location,
      showResults:true,
    };
    this.props.createPost(post);
  }


  render() {
    return (
      <div>
        <h1>Search POI using google places API by city</h1>
        <form onSubmit={this.onSubmit}>
          <div>
            <label>Location: </label>
            <br />
            <input
              type="text"
              name="location"
              onChange={this.onChange}
              value={this.state.location}
            />
          </div>
          <br />

          <Button type="submit">Submit</Button>

        </form>
      </div>
    );
  }
}

PostForm.propTypes = {
  createPost: PropTypes.func.isRequired
};

export default connect(null, { createPost })(PostForm);
