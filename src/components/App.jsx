import React from 'react';
import {hashHistory,browserHistory,Link} from 'react-router';
import {NavBar, Drawer, Icon, TabBar, List, NoticeBar, WhiteSpace} from 'antd-mobile';

import '../css/base.css'

export default class App extends React.Component {
    constructor(props) {
        super(props);          //es6新的属性，用于类继承
        this.state = {
            
        };
    }

    render() {
        return (
            <div className="contain">
                {this.props.children}
                                
            </div>
        );
    }
}

App.contextTypes = {
    router: React.PropTypes.object
};
