import React, { Component } from 'react';
//import './nav.css';
import Card from "./components/card";


class Articles extends Component {
    constructor(props) {
        super(props);
        this.state = {

            data: [],
            errorMessage: ''
        };
    }
    //MAKES  a get request to get all the articles from the database 
    componentDidMount() {

        this.getAllNote().then(
            res => this.setState({ data: res })
        ).catch(err => {
            // console.log(err);
            this.setState({ errorMessage: err });
        });
    }
    //getAllNote makes an async request for all the articles in the database and 
    //returns the response to the componentDidMount
    getAllNote = async () => {
        const response = await fetch('/notes');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    }
    render() {
        return (
            <div>
                {/*  this will show an error message if we are not connected with our DB */}
                {this.state.errorMessage ? <div className="alert alert-danger" role="alert">
                    "oops something bad happened while retrieving your information from our server..."
                </div> : null
                }
                {this.state.data === [] ? <div className="alert alert-warning" role="alert">
                    getting data .............
                                          </div> : null
                }

                <div className="container">
                    <div className="row">
                        {/* pass data from our state.data to our child Card component to be displayed  */}
                        {this.state.data.map((x, i) => {
                            return (
                                <div key={i} className="col-md-4">
                                    <Card picture={x["img"]} title={x["title"]} content={x["content"].split('').slice(0,80).join('')+'...'} articleID={x["_id"]} />
                                </div>
                            )
                        })}

                    </div>
                </div>
            </div>
        )
    }
}

export default Articles;