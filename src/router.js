// import Index from './Index/index';
// 按路由拆分代码
import Loadable from 'react-loadable';
import Loading from './routes/Loading/index';
const MyLoadingComponent = ({ isLoading, error, pastDelay }) => {
    // console.log(isLoading, error, pastDelay)
    // Handle the loading state
    if (isLoading) {
        return <Loading />;
    }
    // Handle the error state
    else if (error) {
        return <div>Sorry, there was a problem loading the page.</div>;
    }
    else {
        return null;
    }
};
const Index = Loadable({
    loader: () => import(/* webpackChunkName: "Index" */ "./routes/Index/index"),
    loading: MyLoadingComponent
});
const Home = Loadable({
    loader: () => import(/* webpackChunkName: "Home" */ "./routes/Home/index"),
    loading: MyLoadingComponent
});
const User = Loadable({
    loader: () => import(/* webpackChunkName: "User" */ "./routes/User/index"),
    loading: MyLoadingComponent
});

// import Index from './routes/Index/index';
// import Home from './routes/Home/index';
// import User from './routes/User/index';


const Root = () => (
  <BrowserRouter history={browserHistory} >
    <div>
      <Switch>
        <Route path="/" exact component={Index} />
        <Route path='/w/home' component={Home} />
        <Route path='/w/user' component={User} />
      </Switch>
    </div>
  </BrowserRouter>
)

export default Root;

ReactDOM.render(<Root />,document.getElementById('root'));