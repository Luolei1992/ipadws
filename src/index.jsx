import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

// import App from './components/App';
import Login from './components/Login';
import GuidePage from './components/GuidePage';
import Customs from './components/Customs';
import Survey from './components/Survey';
import Visit from './components/Visit';
import Signature from './components/Signature';
import VisitRecord from './components/VisitRecord';
import SceneVisit from './components/SceneVisit';
import SceneVisitStatic from './components/SceneVisitStatic';
import Meeting from './components/Meeting';
import MeetingStatic from './components/MeetingStatic';
import Quality from './components/Quality';
import VisitLists from './components/VisitLists';
import Company from './components/Company';
import SurveyHistory from './components/SurveyHistory';
import Mycustom from './components/Mycustom';
import NewSurveyHistory from './components/NewSurveyHistory';
import MeetingList from './components/MeetingList';
import QualityList from './components/QualityList';
import SurveyHistoryStatic from './components/SurveyHistoryStatic';
import BaseState from './components/BaseState';
import PersonalList from './components/PersonalList';
import PdfView from './components/PdfView';
import QualityStatic from './components/QualityStatic';
import Test from './components/test';

import 'lib-flexible/flexible';
import './css/index.less';
import './css/font/iconfont.css';

ReactDOM.render(
    <Router history={hashHistory}>
        <Router path="/" component={BaseState}>
            <IndexRoute component={GuidePage} />
            {/* <Route path="/" component={App}> */}
                <Route path="/guide" component={GuidePage} />
            {/* </Route> */}
            <Route path="/mycustom" component={Mycustom}>
                <IndexRoute component={Company} />
                <Route path="/company" component={Company} />  
                <Route path="/visitRecord" component={VisitRecord} />
                <Route path="/visitLists" component={VisitLists} />
                <Route path="/meetingList" component={MeetingList} />
                <Route path="/PersonalList" component={PersonalList} />
                <Route path="/surveyHistoryStatic" component={SurveyHistoryStatic} />
                <Route path="/qualityList" component={QualityList} />
            </Route>
            <Route path="/meeting" component={Meeting} />
            <Route path="/quality" component={Quality} />
            <Route path="/pdf" component={PdfView} />
            <Route path="/meetingStatic" component={MeetingStatic} />
            <Route path="/survey" component={Survey} />            
            <Route path="/customs" component={Customs} />
            <Route path="/login" component={Login} />
            <Route path="/visit" component={Visit} />
            <Route path="/scene" component={SceneVisit} />
            <Route path="/sceneStatic" component={SceneVisitStatic} />
            <Route path="/qualityStatic" component={QualityStatic} />
            <Route path="/surveyHistory" component={SurveyHistory} />
            <Route path="/newSurveyHistory" component={NewSurveyHistory} />
            <Route path="/Test" component={Test} />
        </Router>
    </Router>
, document.getElementById('mainWrap'));