import React, { Component } from 'react';
//import './nav.css';
import { Link } from "react-router-dom";


class Card extends Component {
    render() {
        return (
        
            <div className="card" >
                <img className="card-img-top" src={this.props.picture} alt="Card image cap" style={{height:"30%"}} />
                <div className="card-body">
                    <h5 className="card-title">{this.props.title}</h5>
                    <p className="card-text">{this.props.content}</p>
                    <Link to={"/View/"+this.props.articleID} className="btn btn-primary">View Full Article</Link>
                </div>
            </div>
        
        )
    }
}

export default Card;