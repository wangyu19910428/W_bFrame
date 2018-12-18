import './index.scss';
import { Button, DatePicker, Input, Table, Card, Select } from 'antd';
const Options = Select.Option;

export default class Home extends Component{
    constructor(props) {
        super(props);
    }

    componentWillMount = () => {
        console.log(this.props)
    }
    

    handleCLick = () => {
        this.props.history.push({pathname: '/10', query: {id: 1}, search: '?id=1'});
        
    }

    render () {
        return (
            <div id='home'>
            <svg>
          
            <use href="#global" fill="blue" width="40" height="40" />
            </svg>Home
                <Button type='primary' onClick={this.handleCLick} >gaibna</Button>
                <DatePicker/>
                <Input/>
                <Table/>
                <Card></Card>
                <Select>
                    <Option value={1}>name</Option>
                </Select>

            </div>
        )
    }
}