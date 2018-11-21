import './index.less';
import { Button, DatePicker } from 'antd';

export default class Home extends Component{
    constructor(props) {
        super(props);
    }
    render () {
        return (
            <div id='home'>Home
                <Button type='primary' >gaibna</Button>
                <DatePicker/>
            </div>
        )
    }
}