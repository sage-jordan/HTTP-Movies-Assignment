import React from 'react';
import axios from 'axios';

class UpdateMovie extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            updatedMovie: null,
            movie: null
            //Spread props through state
        }
        console.log("props updatedMovie.js: ", props)
    }

    componentDidMount(){ 
        this.fetchMovie(this.props.match.params.id);
    };

    handleChange = e => {
        this.setState({
            ...this.state,
            updatedMovie: {
                [e.target.name]: e.target.value
            }
        });
    };

    fetchMovie = id => {
        axios
          .get(`http://localhost:5000/api/movies/${id}`)
          .then(res => this.setState({ movie: res.data }))
          .catch(err => console.log(err.response));
      };

    updateMovie = (id, updatedMovie) => { 
        axios
            .put(`http://localhost:5000/api/movies/${id}`)
            .then(res => this.setState({ movie: res.data }))
            .catch(err => console.log(err.response));
    };

    render() {
        return (
            <div className="update-form">
                <h2>Update Movie</h2>
                <form onSubmit={this.updateMovie}>
                    <input
                        type="text"
                        name="title"
                        placeholder={this.state.movie.title}
                        onChange={this.handleChange}
                    />
                    <input
                        type="text"
                        name="director"
                        placeholder={this.state.movie.director}
                        onChange={this.handleChange}
                    />
                    <input
                        type="text"
                        name="metascore"
                        placeholder={this.state.movie.metascore}
                        onChange={this.handleChange}
                    />
                    <button type="submit">Update</button>
                </form>
            </div>
        )
    }

};

export default UpdateMovie;