import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

import App from './components/App';
import Login from './components/Login';
import GuidePage from './components/GuidePage';
import Company from './components/Company';
import Quality from './components/Quality';
import Survey from './components/Survey';
import Visit from './components/Visit';
import Signature from './components/Signature';

import 'lib-flexible/flexible'
import './css/index.less'
import './css/font/iconfont.css'

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={GuidePage} />
            <Route path="/guide" component={GuidePage} />
        </Route>
        <Route path="/login" component={Login} />
        <Route path="/company" component={Company} />
        <Route path="/quality" component={Quality} />
        <Route path="/survey" component={Survey} />
        <Route path="/visit" component={Visit} />
        <Route path="/sign" component={Signature} />
    </Router>
, document.getElementById('mainWrap'));