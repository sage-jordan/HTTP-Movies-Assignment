import React from 'react';
import axios from 'axios';

class UpdateMovie extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            //Spread props through state
        }
    }

    componentDidMount(id){ 
        this.fetchMovie(id);
    };

    handleChange = e => {
        this.setState({
            ...this.state.movie,
            [e.target.name]: e.target.value
        });
    };

    updateMovie = (id, updatedQuote) => { 
        axios
            .put(`http://localhost:5000/api/movies/${id}`)
            .then(res => this.setState({ movie: res.data }))
            .catch(err => console.log(err.response));
    };

    fetchMovie = id => {
        this.props.fetchMovie(id);
    };

    render() {
        return (
            <div className="update-form">
                <h2>Update Movie</h2>
                <form onSubmit={this.updateMovie}>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        onChange={this.handleChange}
                    />
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        onChange={this.handleChange}
                    />
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        onChange={this.handleChange}
                    />
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        onChange={this.handleChange}
                    />
                </form>
            </div>
        )
    }

};

export default UpdateMovie;