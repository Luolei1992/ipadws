import React from 'react';

export default class App extends React.Component {
    constructor(props) {
        super(props);          //es6新的属性，用于类继承
        this.state = {
            baseFlagId:""
        };
    }
    componentDidMount(){
 
    }
    
    setBaseId=(id)=>{
        this.setState({
            baseFlagId:id
        })
    }
    render() {
        return (
            <div className="gloableState" style={{backgroundColor:"#000"}}>
                {this.props.children && React.cloneElement(
                    this.props.children, { state: this.state, props: this.props, setState: this.setState.bind(this), setBaseId :this.setBaseId}
                )}
            </div>
        );
    }
}

App.contextTypes = {
    router: React.PropTypes.object
};
