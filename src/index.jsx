import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

import App from './components/App';
import Login from './components/Login';
import GuidePage from './components/GuidePage';
import Customs from './components/Customs';
import Survey from './components/Survey';
import Visit from './components/Visit';
import Signature from './components/Signature';
import VisitRecord from './components/VisitRecord';
import SceneVisit from './components/SceneVisit';
import Meeting from './components/Meeting';
import Quality from './components/Quality';
import VisitLists from './components/VisitLists';

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
        <Route path="/customs" component={Customs} />
        <Route path="/survey" component={Survey} />
        <Route path="/visit" component={Visit} />
        <Route path="/sign" component={Signature} />
        <Route path="/visitRecord" component={VisitRecord} />
        <Route path="/scene" component={SceneVisit} />
        <Route path="/meeting" component={Meeting} />
        <Route path="/quality" component={Quality} />
        <Route path="/visitLists" component={VisitLists} />
    </Router>
, document.getElementById('mainWrap'));