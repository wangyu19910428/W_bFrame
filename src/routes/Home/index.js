import './index.scss';
import { Button, DatePicker, Input, Table, Card, Select } from 'antd';
import Dialog from '../../component/Dialog/index';
const Options = Select.Option;

export default class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
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

    dialogClick = () => {
        this.setState({
            visible: false
        });
        alert()
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
                    <div style={{height: 300, background: 'red'}} onClick={this.dialogClick}>
                        <Dialog  >
                            <div >1234567890</div>
                        </Dialog>
                    </div>
                    : null
                }
            </div>
        )
    }
}