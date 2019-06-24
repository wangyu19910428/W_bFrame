import './index.scss';
import { Button } from 'antd';
import Dialog from '../../component/Dialog/index';

export default class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }

    componentWillMount = () => {
        console.log(this.props)
    }
    

    handleCLick = () => {
        // this.props.history.push({pathname: '/', query: {id: 1}, search: '?id=1'});
        this.setState({
            visible: true
        });
    }

    render () {
        return (
            <div id='home'>
                <svg width="40" height="40" >
                    <use href="#global" fill="blue" />
                </svg>
                Home
                <Button type='primary' onClick={this.handleCLick} >gaibna</Button>
                {
                    this.state.visible? 
                    <div onClick={() => {this.setState({visible: false})}} >
                        <Dialog>
                            1234567890
                        </Dialog>
                    </div>
                    : null
                }
            </div>
        )
    }
}