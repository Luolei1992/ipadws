import React from 'react';
// import {hashHistory,browserHistory,Link} from 'react-router';
// import {NavBar, Drawer, Icon, TabBar, List, NoticeBar, WhiteSpace} from 'antd-mobile';

export default class App extends React.Component {
    constructor(props) {
        super(props);          //es6新的属性，用于类继承
        this.state = {
            
        };
    }

    render() {
        return (
            <div className="contain">
                {this.props.children && React.cloneElement(this.props.children, { state: this.state, props: this.props, setState: this.setState.bind(this) })}
            </div>
        );
    }
}

App.contextTypes = {
    router: React.PropTypes.object
};
