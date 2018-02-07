import React from "react";
import {Link} from "react-router"

const urls = {
    logo: require('../images/logo.png'),
    years: require('../images/years.png'),
    right: require('../images/right.png'),
}
export default class Guide extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    render() {
        return (
            <div className="guideWrap">
                <div className="head">
                    <img src={urls.logo} />
                </div>
                <div className="main midCenter">
                    {/* <img src={urls.years} />
                    <h2><span>同心</span>共进&nbsp;&nbsp;<span>感恩</span>汇聚</h2> */}
                    <ul className="guideList">
                        {/* <li>
                        <Link to='/company'>公司</Link>
                    </li> */}
                        <li>
                            {/* <Link to='/survey'>调研</Link> */}
                            <Link to='/login'>调研</Link>
                        </li>
                        <li>
                            <Link to='/visit'>回访</Link>
                        </li>
                        <li>
                            <Link to='/quality'>质检</Link>
                        </li>
                    </ul>
                    <div className="right">
                        <Link to='/login'>
                            <img src={urls.right} />
                        </Link>
                    </div>
                </div>
                
            </div>
        )
    }
}