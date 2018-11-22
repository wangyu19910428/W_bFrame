import './index.scss';
import { browserHistory } from 'react-router-dom';
export default class User extends Component{
    constructor(props) {
        super(props);
    }

    handleCLick = () => {
        browserHistory.push({pathname: '/fe/home'})
    }
    render () {
        return (
            <div id='user' onClick={this.handleCLick} >User</div>
        )
    }
}