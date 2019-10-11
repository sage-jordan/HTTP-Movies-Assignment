import React from 'react';
import axios from 'axios';
import SuccessMessage from './SuccessMessage';

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
            successMessage: null
        }
    }

    componentDidMount(){ 
        this.fetchMovie(this.props.match.params.id);
    };

    handleChange = e => {
        this.setState({
            ...this.state,
            updatedMovie: {
                ...this.state.updatedMovie,
                [e.target.name]: e.target.value
            }
        });
        console.log(this.state.updatedMovie);
    };
 
    fetchMovie = () => {
        axios
          .get(`http://localhost:5000/api/movies/${this.props.match.params.id}`)
          .then(res => {
            this.setState({ ...this.state, updatedMovie: res.data })
            console.log(this.state)
          })
          .catch(err => console.log(err.response));
      };

    updateMovie = () => { 
        console.log(this.state.updatedMovie);
        axios
            .put(`http://localhost:5000/api/movies/${this.props.match.params.id}`, this.state.updatedMovie)
            .then(res =>  {
                this.setState({ ...this.state, updatedMovie: res.data });
                console.log(res.data);
            })
            .catch(err => console.log(err.response));
        this.setState({ ...UpdatedMovie, successMessage: 'Movie Successfully Updated!' })
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
                        value={this.state.updatedMovie.title}
                    />
                    <input
                        type="text"
                        name="director"
                        placeholder={this.state.updatedMovie.director}
                        onChange={this.handleChange}
                        value={this.state.updatedMovie.director}
                    />
                    <input
                        type="text"
                        name="metascore"
                        placeholder={this.state.updatedMovie.metascore}
                        onChange={this.handleChange}
                        value={this.state.updatedMovie.metascore}
                    />
                    <button onClick={this.updateMovie}>Update</button>
                </form>
                {() => {
                    if(this.state.successMessage){
                        <SuccessMessage message={this.state.successMessage} /> 
                    }
                }}
            </div>
        )
    }

};

export default UpdateMovie;