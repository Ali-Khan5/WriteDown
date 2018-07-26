import React, { Component } from 'react';
//import './nav.css';
import { Link } from "react-router-dom";


class ViewArticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            title: '',
            img: '',
            errorMessage:'',
            id:''
        }
    }
    componentDidMount() {
        console.log(this.props.match.params.id);
        this.callApi(this.props.match.params.id)
            .then(res => this.setState({ content: res.content, title: res.title, img: res.img ,id:res._id}))
            .catch(err =>  this.setState({errorMessage:err}) );
    }
    callApi = async (e) => {
        console.log("call api", e);
        const response = await fetch("/notes/" + e);
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    };
    render() {
        return (
          
         <div className="container " style={{width:"75%"}}>
           {this.state.errorMessage ? <div className="alert alert-danger text-center" role="alert">
                    "oops something bad happened while retrieving your information from our server..."
                </div> : null
            }
            <div className="card text-center" >
                <img className="card-img-top" src={this.state.img} alt="ViewArticle image cap" />
                <div className="card-body">
                    <h2 className="card-title">{this.state.title}</h2>
                    <hr/>
                    <p className="card-text" style={{textAlign:'left'}}>{this.state.content}</p>
                    <hr/>
                 <Link to={"/Update/"+this.state.id}  > <button className="btn btn-warning">Edit ME </button></Link>
                </div>
            </div>
        </div>
        )
    }
}

export default ViewArticle;