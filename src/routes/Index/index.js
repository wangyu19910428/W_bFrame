import './index.less';

export default class Index extends Component{
    constructor(props) {
        super(props);
    }
    componentWillMount = () => {
      console.log(this.props)
    }
    
    render () {
        return (
            <div id='index' onClick={() => {
                this.props.history.push({pathname: '/fe/home', search: '?id=2'})
            }} >Index</div>
        )
    }
}