/**
 * Posts.js

 * Have a nice day.

 *
 *
 * @author  Biplov Dahal, https://github.com/biplovdahal/
 * @updated 05-08-2018

 *
 *
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/postActions';
import Masonry from 'react-masonry-component';
import {Button, Grid, Row, Col} from 'react-bootstrap'
import Modal from 'react-modal';
import { savePlace } from '../actions/postActions';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeModal: null,
      showResults:true,
      showMyPlaces:false,
    }
    this.clickHandler = this.clickHandler.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.placeHandle = this.placeHandle.bind(this)
    this.myPlaces = this.myPlaces.bind(this)
  }
  clickHandler(e, index) {
    this.setState({ activeModal: index })
  }
  unsaveHandler(e,index){
    this.props.my_places.pop(index)
    this.setState({showMyPlaces:false})
    this.setState({showMyPlaces:true})
  }
  myPlaces(e){

    if (this.state.showMyPlaces == true){
      this.setState({showMyPlaces:false})
      this.setState({showResults:true})

    }else{
      this.setState({showResults:false})
      this.setState({showMyPlaces:true})
    }

  }

  placeHandle(e, index){
    alert("Successfully saved the place go 'My Places' to see it.")
    const post = {
      place : this.props.posts[index]

    }
    this.props.savePlace(post)

  }
  hideModal() {
      this.setState({ activeModal: false })
  }
  componentWillReceiveProps(nextProps) {
    this.setState({showResults:true})
    if (nextProps.my_places) {
      this.props.my_places.push(nextProps.new_place)
    }
  }

  render() {
    const masonryOptions = {
      transitionDuration: 0
    };
    const imagesLoadedOptions = { background: '.my-bg-image-el' }

    const myItems = this.props.my_places.slice(1).map((poster, index) =>
    <li  key={index} className="image-element-class">
        <Button id={poster.id} className="top-right" onClick={e => this.unsaveHandler(e, index)}>UNSAVE</Button>
        <Modal
            isOpen={this.state.activeModal === index}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.hideModal}
            style={customStyles}
            contentLabel="Example Modal">
            <Grid>
                <Row className="show-grid">
                  <Col xs={12} md={8}>
                  <iframe width="500" height="500" src={poster.iframe_url}></iframe>
                  </Col>
                  <Col xs={6} md={4}>
                    <h1> {poster.address} </h1>

                    <Button id={poster.id} className="top-right" onClick={e => this.placeHandle(e, index)}>SAVE</Button>
                  </Col>
                </Row>


              </Grid>;
        </Modal>

        <img src={poster.image_url}>

        </img>

    </li>

    )
    const postItems = this.props.posts.map((poster, index) =>

        <li  key={poster.id} className="image-element-class">
            <Button id={poster.id} className="top-right" onClick={e => this.clickHandler(e, index)}>SAVE</Button>
            <Modal
                isOpen={this.state.activeModal === index}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.hideModal}
                style={customStyles}
                contentLabel="Example Modal">
                <Grid>
                    <Row className="show-grid">
                      <Col xs={12} md={8}>
                      <iframe width="500" height="500" src={poster.iframe_url}></iframe>
                      </Col>
                      <Col xs={6} md={4}>
                        <h1> {poster.address} </h1>

                        <Button id={poster.id} className="top-right" onClick={e => this.placeHandle(e, index)}>SAVE</Button>
                      </Col>
                    </Row>


                  </Grid>;
            </Modal>

            <img src={poster.image_url}>

            </img>

        </li>




    );
    return (
      <div>
      <Button onClick={this.myPlaces}>My Places</Button><br/>
      { this.state.showResults ?       <Masonry

              className={'my-gallery-class'} // default ''
              elementType={'ul'} // default 'div'
              options={masonryOptions} // default {}
              disableImagesLoaded={false} // default false
              updateOnEachImageLoad={false}
              imagesLoadedOptions={imagesLoadedOptions}// default false and works only if disableImagesLoaded is false

          >
              {postItems}
        </Masonry> : null }
        { this.state.showMyPlaces ?        <h1> My Places <Masonry

                className={'my-gallery-class'} // default ''
                elementType={'ul'} // default 'div'
                options={masonryOptions} // default {}
                disableImagesLoaded={false} // default false
                updateOnEachImageLoad={false}
                imagesLoadedOptions={imagesLoadedOptions}// default false and works only if disableImagesLoaded is false

            >

                {myItems}
          </Masonry></h1> : null }








      </div>
    );
  }
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired,
  my_places:PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  posts: state.posts.items,
  my_places: state.posts.my_places,
  new_place:state.posts.new_place
});

export default connect(mapStateToProps, {savePlace})(Posts);
