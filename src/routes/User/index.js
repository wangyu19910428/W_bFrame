import './index.scss';
import TestCom from '../../component/TestComponent/index';
export default class User extends Component{
    constructor(props) {
        super(props);
        this.state = {
            title: 'user'
        }
        console.log('constructor')
    }

    componentWillMount = () => {
        console.log('componentWillMount')
        this.setState({
            title: 'user_1'
        });
        console.log(this.state.title)
        this.setState({
            title: 'user_2'
        });
        console.log(this.state.title)
    }

    componentDidMount = () => {
        console.log('componentDidMount')
        console.log(this.state.title)
        // document.getElementById('user').addEventListener('click', this.handleCLick);
        // this.setState({
        //     title: 'user'
        // });
    }

    // shouldComponentUpdate () {
    //     console.log('shouldComponentUpdate')
    // }

    componentWillReceiveProps (nextProps) {
        this.setState({
            title: nextProps.title
        })
        console.log('componentWillReceiveProps')
    }

    componentWillUpdate = (nextProps, nextState) => {
        console.log('componentWillUpdate')
    }

    componentDidUpdate = (prevProps, prevState) => {
        console.log('componentDidUpdate')
    }

    handleCLick = () => {
        this.setState({
            title: 'userLaest'
        });
        console.log(this.state.title)
        this.setState({
            title: 'userLaest_2'
        }, () => {console.log(this.state.title)});
        console.log(this.state.title)
    }
    render () {
        console.log('render')
        return (
            <div id='user' onClick={this.handleCLick} >123
                <TestCom title={this.state.title} />
            </div>
        )
    }
}