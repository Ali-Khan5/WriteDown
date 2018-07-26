
import React, { Component } from 'react';
import { Route, Router } from 'react-router-dom';
import Home from './home'
import Update from "./update";
import Navbar from './components/navbar'
import createBrowserHistory from 'history/createBrowserHistory'
import Articles from './articles';
import ViewArticles from './viewArticle';
import CreateArticle from './createArticle';
const history = createBrowserHistory()



class Routers extends Component {
    render() {
        return (
            <Router history={history}>
            <div>
                <Navbar/>
                <Route exact path="/" component={Home} />
                <Route exact path="/Update/:id" component={Update} />
                <Route exact path="/Articles/:page" component={Articles}/>
                <Route exact path ="/View/:id" component={ViewArticles}/>
                <Route exact path="/Create" component={CreateArticle} />
            </div>
            </Router>
        )
    }
}

export default Routers;