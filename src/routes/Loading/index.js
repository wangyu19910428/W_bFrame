import './index.scss';

const Loading = ({ isLoading, error, pastDelay }) => {
    // Handle the loading state
    if (isLoading) {
        return <div>loading...</div>
    }
    // Handle the error state
    else if (error) {
        return <div>Sorry, there was a problem loading the page.</div>;
    }
    else {
        return null;
    }
};

export default Loading;