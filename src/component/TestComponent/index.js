export default class TestCom extends Component{
    constructor(props) {
        super(props);
        this.state = {
            title: ''
        };
        console.log('child--constructor')
    }

    componentWillMount = () => {
        console.log('child--componentWillMount')
    }

    componentDidMount = () => {
        console.log('child--componentDidMount')
    }

    componentWillReceiveProps (nextProps) {
        this.setState({
            title: nextProps.title
        })
        console.log('child--componentWillReceiveProps')
    }

    componentWillUpdate = (nextProps, nextState) => {
        console.log('child--componentWillUpdate')
    }

    componentDidUpdate = (prevProps, prevState) => {
        console.log('child--componentDidUpdate');
    }
    
    // shouldComponentUpdate () {
    //     console.log('child--shouldComponentUpdate')
    //     return false
    // }
    
    // shouldComponentUpdate = (nextProps, nextState) => {
    //     console.log(nextProps)
    // }
    
    
    
    
    render () {
        console.log('child--render')
        return (
            <div>
                {this.state.title}
            </div>
        )
    }
}