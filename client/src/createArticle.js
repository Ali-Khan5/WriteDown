import React, { Component } from 'react';

class CreateArticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            title: '',
            imgDetails: ''
        }
    }
    upload = () => {
        var data = new FormData();
        data.append("title", this.state.title);
        data.append("content", this.state.content);
        data.append("img", this.state.imgDetails);
        fetch('/notes', {
            method: 'POST',
            body: data,
        }).then(response => response.json()).then(res => {
            console.log(res);
            this.props.history.push('/View/' + res._id);
        }).catch(error => console.error('Error:', error));


    }
    handleUploadFile = (event) => {
        console.log(event.target.files[0]);

        this.setState({ imgDetails: event.target.files[0] });
    }
    changeContent = (e) => {
        console.log('i am runing at update'); this.setState({ content: e.target.value });
        console.log(this.state.content)
    }
    changeTitle = (e) => {
        console.log('i am runing at update'); this.setState({ title: e.target.value });
        console.log(this.state.title)
    }
    render() {
        return (
            <div className="container">
                <br />
                <h3 className="text-center">Create  Your Article </h3>
                <div className="form-group">
                    <label htmlFor="Title ">The Title of your Article</label>
                    <input type="text" className="form-control" value={this.state.title} onChange={this.changeTitle} placeholder="enter your title" />
                </div>
                <br />


                <div className="form-group">
                    <label htmlFor="exampleFormControlTextarea1">Write Your Article</label>
                    <textarea className="form-control" value={this.state.content} rows="15" onChange={this.changeContent} 
                    placeholder="Write whats on your mind here.... "></textarea>
                </div>
                <br />
                <div className="form-group">
                    <label htmlFor="exampleFormControlFile1">Upload a Picture for your Article</label>
                    <input type="file" onChange={this.handleUploadFile} className="form-control-file" />
                </div>

                <br />
                <button onClick={this.upload} className="btn btn-primary"> Create Article </button>
                <br />
                <br />
            </div>
        );
    }
}

export default CreateArticle;
