import React from 'react';
import axios from 'axios';

class UpdateMovie extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            updatedMovie: {
                title: '',
                director: '',
                metascore: '',
                stars: []
            },
        }
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
        console.log(this.state.updatedMovie);
    };

    fetchMovie = () => {
        axios
          .get(`http://localhost:5000/api/movies/${this.props.match.params.id}`)
          .then(res => {
            this.setState({ updatedMovie: res.data })
            console.log(this.state)
          })
          .catch(err => console.log(err.response));
      };

    updateMovie = () => { 
        console.log(this.state.updatedMovie);
        axios
            .put(`http://localhost:5000/api/movies/${this.props.match.params.id}`, this.state.updatedMovie)
            .then(res =>  {
                this.setState({ ...this.state, movie: res.data });
                console.log(res.data);
            })
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
                        placeholder={this.state.updatedMovie.title}
                        onChange={this.handleChange}
                    />
                    <input
                        type="text"
                        name="director"
                        placeholder={this.state.updatedMovie.director}
                        onChange={this.handleChange}
                    />
                    <input
                        type="text"
                        name="metascore"
                        placeholder={this.state.updatedMovie.metascore}
                        onChange={this.handleChange}
                    />
                    <button onClick={this.updateMovie}>Update</button>
                </form>
            </div>
        )
    }

};

export default UpdateMovie;