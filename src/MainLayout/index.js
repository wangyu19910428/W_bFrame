import { Layout, Menu, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import {withRouter} from 'react-router-dom';
// import Loadable from 'react-loadable';
import Loading from '../routes/Loading/index';
const Home = Loadable({
    loader: () => import(/* webpackChunkName: "Home" */ "../routes/Home/index"),
    loading: Loading
});
const User = Loadable({
    loader: () => import(/* webpackChunkName: "User" */ "../routes/User/index"),
    loading: Loading
});

import './index.scss';

class MainLayout extends Component{
    constructor(props) {
        super(props);
        
        this.state = {
            
        }
    }

    componentDidMount = () => {
        console.log(this.props)
    }
    
    

    render () {
        const { match } = this.props
        return (
            <Layout>
                <Sider collapsible style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}>
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                        <Menu.Item key="1">
                            <Icon type="user" />
                            <span className="nav-text">nav 1</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="video-camera" />
                            <span className="nav-text">nav 2</span>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Icon type="upload" />
                            <span className="nav-text">nav 3</span>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Icon type="bar-chart" />
                            <span className="nav-text">nav 4</span>
                        </Menu.Item>
                        <Menu.Item key="5">
                            <Icon type="cloud-o" />
                            <span className="nav-text">nav 5</span>
                        </Menu.Item>
                        <Menu.Item key="6">
                            <Icon type="appstore-o" />
                            <span className="nav-text">nav 6</span>
                        </Menu.Item>
                        <Menu.Item key="7">
                            <Icon type="team" />
                            <span className="nav-text">nav 7</span>
                        </Menu.Item>
                        <Menu.Item key="8">
                            <Icon type="shop" />
                            <span className="nav-text">nav 8</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout style={{ marginLeft: 200 }}>
                    <Header >header</Header>
                    <Content>
                        <Route path={`${match.path}/:id/home`} component={Home}/>
                        <Route path={`${match.path}/user`} component={User} />
                    </Content>
                    <Footer>
                        Ant Design ©2018 Created by Ant UED
                    </Footer>
                </Layout>
            </Layout>
        )
    }
    
}

export default withRouter(MainLayout);