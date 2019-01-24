import './index.scss';
import { Button } from 'antd';

export default class Home extends Component{
    constructor(props) {
        super(props);
    }

    componentWillMount = () => {
        console.log(this.props)
    }
    

    handleCLick = () => {
        this.props.history.push({pathname: '/', query: {id: 1}, search: '?id=1'});
        
    }

    render () {
        return (
            <div id='home'>
                <svg width="40" height="40" >
                    <use href="#global" fill="blue" />
                </svg>
                Home
                <Button type='primary' onClick={this.handleCLick} >gaibna</Button>
            </div>
        )
    }
}