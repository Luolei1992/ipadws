import React from "react";
import {Link} from "react-router"

const urls = {
    logo: require('../images/logo.png'),
    years: require('../images/years.png'),
    right: require('../images/right.png'),
    play: require('../images/play.png'),
    guide1: require('../images/guide1.png'),
    guide2: require('../images/guide2.png'),
    guide3: require('../images/guide3.png'),
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
                <Link to='/customs'><img className="midCenter" src={urls.play} /></Link>
                <div className="main">
                    <h2><span>同心</span>共进&nbsp;&nbsp;<span>感恩</span>汇聚</h2>
                    <ul className="guideList">
                        <li>
                            <Link to='/newSurveyHistory?tab=5'>
                                <img src={urls.guide1} />调 研
                            </Link>
                        </li>
                        <li>
                            <Link to='/customs?tab=0'>
                                <img src={urls.guide2} />回 访
                            </Link>
                        </li>
                        <li>
                            <Link to='/visit'>
                                <img src={urls.guide3} />质 检
                            </Link>
                        </li>
                    </ul>
                </div>
                
            </div>
        )
    }
}