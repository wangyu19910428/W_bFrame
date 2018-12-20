import './index.scss';
import { Spin, Icon } from 'antd';
import ErrorPage from '../ErrorPage/index';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;


const Loading = ({ isLoading, error, pastDelay }) => {
    // Handle the loading state
    if (isLoading) {
        return <div style={{width: '100%', height: '100%', background: 'rgba(0,0,0,.3)', position: 'relative'}} >
            <Spin style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, margin: 'auto', padding: '10%'}} indicator={antIcon} />
        </div>
    }
    // Handle the error state
    else if (error) {
        return <ErrorPage/>;
    }
    else {
        return null;
    }
};

export default Loading;