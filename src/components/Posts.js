import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/postActions';
import Masonry from 'react-masonry-component';


class Posts extends Component {
  componentWillMount() {


  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.newPost) {
      this.props.posts.unshift(nextProps.newPost);
    }
  }

  render() {
    const masonryOptions = {
      transitionDuration: 0
    };

    const imagesLoadedOptions = { background: '.my-bg-image-el' }

    const postItems = this.props.posts.map(post => post.map(poster=>
      <li key={poster.id} className="image-element-class">
                  <img src={poster.image_url}></img>
      </li>



    ));
    return (
      <div>
      <Masonry

              className={'my-gallery-class'} // default ''
              elementType={'ul'} // default 'div'
              options={masonryOptions} // default {}
              disableImagesLoaded={false} // default false
              updateOnEachImageLoad={false}
              imagesLoadedOptions={imagesLoadedOptions}// default false and works only if disableImagesLoaded is false

          >
              {postItems}
        </Masonry>


      </div>
    );
  }
}

Posts.propTypes = {
  //fetchPosts: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
  newPost: PropTypes.object
};

const mapStateToProps = state => ({
  posts: state.posts.items,
  newPost: state.posts.item
});

export default connect(mapStateToProps, {})(Posts);
