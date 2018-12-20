//全局loading
import Loading from './component/Loading/index';
//全局 svg
import './assets/index';
//登录页
const Index = Loadable({
    loader: () => import(/* webpackChunkName: "Index" */ "./routes/Index/index"),
    loading: Loading
});
//manLayout
const MainLayout = Loadable({
    loader: () => import(/* webpackChunkName: "MainLayout" */ "./MainLayout/index"),
    loading: Loading
});
//manLayout
const NotFound = Loadable({
    loader: () => import(/* webpackChunkName: "NotFound" */ "./component/NotFound/index"),
    loading: Loading
});

const Root = () => (
    <BrowserRouter >
        <div>
            <Switch>
                {/* <Redirect to='/notFound' component={NotFound} /> */}

                <Route path="/" exact component={Index} />
                <Route path="/fe" component={MainLayout} />
                <Route component={NotFound} />
            </Switch>
        </div>
    </BrowserRouter>
)

ReactDOM.render(<Root />,document.getElementById('root'));