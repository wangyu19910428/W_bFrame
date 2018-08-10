// import Index from './Index/index';
// 按路由拆分代码
import Loadable from 'react-loadable';
const MyLoadingComponent = ({ isLoading, error, pastDelay }) => {
    console.log(isLoading, error, pastDelay)
    // Handle the loading state
    if (isLoading) {
        return <div>Loading...</div>;
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
    loader: () => import(/* webpackChunkName: "Index" */ "./Index/index.js"),
    loading: MyLoadingComponent
});

// const Root = () => {
    // return () => () => import(/* webpackChunkName: 'Index' */ './Index/index.js').then(component => {
        // console.log(component);
    // })
    // return (<Index/>)
// }

ReactDOM.render(<Index />,document.getElementById('root'));