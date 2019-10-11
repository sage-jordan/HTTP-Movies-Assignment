import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import { Link, Redirect } from 'react-router-dom';


export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentDidUpdate(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  redirect = () => {
    this.props.history.push(`/`);
    document.location.reload(true);
  };

  deleteMovie = () => {
    axios
      .delete(`http://localhost:5000/api/movies/${this.props.match.params.id}`)
      .then(res => console.log(res))
      .catch(err => console.log(err));
    this.redirect();
  }

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    const id = this.props.match.params.id;

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div> 
        <Link to={{pathname: `/update-movie/${id}`, state: id.toString()}} className="update-button" >
          Update Movie
        </Link>
        <div className="delete-button" onClick={this.deleteMovie}>
          Delete
        </div> 
      </div> 
    );
  }
}
