import React, { Component } from 'react';

class Update extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            title: '',
            img: ''
        }
    }
    componentDidMount() {
        console.log(this.props.match.params.id);
        this.callApi(this.props.match.params.id)
            .then(res => this.setState({ content: res.content, title: res.title, img: res.img }))
            .catch(err => console.log(err));
    }
    callApi = async (e) => {
        //  console.log("call api", e);
        const response = await fetch("/notes/" + e);
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    };
    changeContent = (e) => {
        console.log('i am runing at update'); this.setState({ content: e.target.value });
        console.log(this.state.content)
    }
    changeTitle = (e) => {
        console.log('i am runing at update'); this.setState({ title: e.target.value });
        console.log(this.state.title)
    }
    updateArticle= () => {

        fetch('/notes/'+this.props.match.params.id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: this.state.title,
                content: this.state.content,

            }),

        }).then(response => response.json()).then(res => {
            console.log(res);
            // this.getAllNote().then(
            //     res => this.setState({ data: res })
            // ).catch(err => {
            //     console.log(err);
            // });
            this.props.history.push('/View/'+res._id);
        }).catch(error => console.error('Error:', error));

    }
    render() {
        return (
            <div className="container">
                <br />
                <h3 className="text-center">Edit Your Article </h3>
                <div className="form-group">
                    <label htmlFor="Title ">Title</label>
                    <input type="text" className="form-control" value={this.state.title} onChange={this.changeTitle} placeholder="enter text" />
                </div>
                <br />


                <div className="form-group">
                    <label htmlFor="exampleFormControlTextarea1">Example textarea</label>
                    <textarea className="form-control" value={this.state.content} rows="15" onChange={this.changeContent} ></textarea>
                </div>
                <br />
                <br />
                <button onClick={this.updateArticle} className="btn btn-primary"> Update Article</button>

            </div>
        );
    }
}

export default Update;
