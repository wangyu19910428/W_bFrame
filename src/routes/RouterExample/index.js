import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const Index = () => <h2>Home</h2>;
const About = () => <h2>About</h2>;
const Users = () => <h2>Users</h2>;

export default class RouterExample extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       
    }
  }

  
  render() {
    return (
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about/">About</Link>
          </li>
          <li>
            <Link to="/users/">Users</Link>
          </li>
        </ul>
        <Router>
          <Route path='/' exact component={Index} />
          <Route path='/about/' component={About} />
          <Route path='/users/' component={Users} />
        </Router>

      </div>
    )
  }
}
