// import Index from './Index/index';
// 按路由拆分代码
// import Loadable from 'react-loadable';
import Loading from './routes/Loading/index';
import MainLayout from './MainLayout/index';

const Index = Loadable({
    loader: () => import(/* webpackChunkName: "Index" */ "./routes/Index/index"),
    loading: Loading
});


// import Index from "./routes/Index/index";
// import Home from "./routes/Home/index";
// import User from "./routes/User/index";


const Root = () => (
  <BrowserRouter >
    <div>
        <Switch>
            <Route path="/:abc" exact component={Index} />
            <Route path="/fe" component={MainLayout} />
        </Switch>
        
    </div>
    </BrowserRouter>
)

ReactDOM.render(<Root />,document.getElementById('root'));