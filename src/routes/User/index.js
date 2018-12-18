import './index.scss';
import SearchListTpl from '../../component/SearchListTpl/index';
export default class User extends Component{
    constructor(props) {
        super(props);
    }

    handleCLick = () => {
        
    }
    render () {
        return (
            <div id='user' onClick={this.handleCLick} >User</div>
        )
    }
}