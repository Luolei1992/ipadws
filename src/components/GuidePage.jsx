import React from "react";
import {Link} from "react-router"

export default class Guide extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div className="guideWrap">
                <ul className="guideList midCenter">
                    <li>
                        <Link to='/company'>公司</Link>
                    </li>
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
            </div>
        )
    }
}