// import Loading from '../component/Loading/index';
// const Home = Loadable({
//     loader: () => import(/* webpackChunkName: "Home" */ "../routes/Home/index"),
//     loading: Loading
// });
// const User = Loadable({
//     loader: () => import(/* webpackChunkName: "User" */ "../routes/User/index"),
//     loading: Loading
// });
// const NotFound = Loadable({
//     loader: () => import(/* webpackChunkName: "NotFound" */ "../component/NotFound/index"),
//     loading: Loading
// });
import lazyLoad from '../utils/lazyLoad';
// import Home from '../routes/Home/index';
// import User from '../routes/User/index';
// import NotFound from '../component/NotFound/index';
const Home = lazyLoad(() => import(/* webpackChunkName: "Home" */'../routes/Home/index'));
const User = lazyLoad(() => import(/* webpackChunkName: "User" */'../routes/User/index'));
// const NotFound = lazyLoad(() => import(/* webpackChunkName: "NotFound" */'../component/NotFound/index'));

import './index.scss';


import {Layout, Menu, Icon,} from 'antd';
const {Header, Content, Footer, Sider,} = Layout;
const SubMenu = Menu.SubMenu;


class MainLayout extends Component{
    constructor(props) {
        super(props);
        
        this.state = {
            collapsed: true,
            selectedKeys: [],
            menuData: [
                {
                    name: '一级导航', 
                    url: '',                // child为[], url有值，反之则为空
                    icon: 'setting',           // url为空则，有值
                    type: 1, //导航类型 1 一级导航 2 二级导航 3 三级导航
                    chilren: [
                        {
                            name: '二级导航',
                            url: '',
                            icon: 'setting',
                            type: 2,
                            chilren: [
                                {
                                    name: '三级导航',
                                    url: '/fe/home',
                                    icon: '',
                                    type: 3,
                                    chilren: []
                                }
                            ]
                        }
                    ]
                },
                {
                    name: '一级导航',
                    url: '/fe/user',
                    icon: 'setting',
                    type: 1,
                    chilren: []
                },
            ]
        }
    }

    componentDidMount = () => {
        this.setState({
            selectedKeys: [this.props.location.pathname]
        });
    }
    
    /**
     * @description 打开关闭菜单栏
     * @param {boolean} collapsed
     */
    onCollapse = (collapsed) => {
        this.setState({ collapsed });
    }

    /**
     * @description 遍历菜单递归
     * @param {object} item {name: '名称', url: '路径', icon: 'icon', type: '类型', children: [下级导航数据]}
     */
    loop = (item) => {
        if (item.chilren instanceof Array && item.chilren.length) {
            return <SubMenu key={item.url} title={<span><Icon type={item.icon} /><span>{item.name}</span></span>}>
            {
                item.chilren.map(item_2 => {
                    return this.loop(item_2);
                })
            }
            </SubMenu>
        } else {
            return <Menu.Item key={item.url}  onClick={() => {this.props.history.push({pathname: item.url})}} >
            {
                (item.type === 1||  item.chilren.length)? <Icon type={item.icon} />: null
            }
                <span >{item.name}</span>
            </Menu.Item>
        };
    }

    /**
     * @description 菜单选中事件
     * @param {object} item
     */
    onMenuSelect = (item) => {
        this.setState({
            selectedKeys: item.selectedKeys
        });
    }

    render () {
        const { match } = this.props;
        const { collapsed, menuData, selectedKeys } = this.state;
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider
                    collapsible
                    collapsed={collapsed}
                    onCollapse={this.onCollapse}
                >
                    <div className="logo" />
                    <Menu theme="dark" selectedKeys={selectedKeys} mode="inline" onSelect={this.onMenuSelect} >
                    {
                        menuData.map(item => {
                            return this.loop(item);
                        })
                    }
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }} />
                    <Content style={{ margin: '16px' }}>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                            <Route path={`${match.path}/home`} component={Home}/>
                            <Route path={`${match.path}/user`} component={User} />
                            {/* <Route component={NotFound} /> */}
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        UXIN 后台管理系统 @2018
                    </Footer>
                </Layout>
            </Layout>
        )
    }
    
}

export default MainLayout;