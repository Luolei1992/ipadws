import { Link } from "react-router";

export const Visit = (props) => (     
    <div>
        
    </div>
)

export const BottomLis = (props) => (     // 底部导航
    <ul className="footNavList">
        <li><Link to="/login">合同内容</Link></li>
        <li><Link to="/login">任务记录</Link></li>
        <li><Link to="/login">回访记录</Link></li>
        <li><Link to="/login">会议纪要</Link></li>
        <li><Link to="/login">联系人</Link></li>
        <li><Link to="/login">调研档案</Link></li>
    </ul>
)
