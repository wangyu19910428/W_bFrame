import {Table, Pagination, message} from 'antd';
import SearchBar from '../../component/SearchBar/index';
import sendFetch from '../../utils/fetch';


class SearchList extends Component {
    constructor (props) {
        super(props);
        this.state = {
            tableList:[],
            total:0,
            page:1,
            tableLoading:false,
            options:{}, // 筛选条件
            selectedRowsArr:[],//列表选中的集合
        }
    }
    componentWillMount () {
        this.getData({page:1});
    }

    /**
     *
     *
     * @memberof TestList
     */
    componentDidMount () {
    }
    
    /**
     *
     *
     * @param {*} params
     */
    getData = (params) => {
        this.setState({ tableLoading:true });
        let url = this.fetchOptions()? this.fetchOptions().url: '';
        let method = this.fetchOptions()? this.fetchOptions().method: '';
        sendFetch(url, params, method)
            .then(res=> {
                if(res.code === 1) {
                    this.setState({
                        tableList:res.data.list,
                        total:res.data.total,
                        page:res.data.current
                    })
                } else {
                    message.error(res.msg);
                }
            })
            .then(res=> {
                this.setState({ tableLoading:false });
            })
    }

    /**
    *
    *
    * @memberof TestList
    */

    handleSearch = (params) => {
        this.setState({options:params});
        this.getData({...params, page:1});
    }
    handlePageChange = (page) => {
        this.setState({page});
        this.getData({...this.state.options, page:page});
    }

    render () {
        const {tableList, tableLoading, total, page, selectedRowsArr} = this.state;
        const { rowSelection, searchBarFree } = this.props;
        const rowSelectionOptions = rowSelection? {selectedRowKeys:selectedRowsArr, onChange:(selectedRowKeys, selectedRows)=>{this.setState({selectedRowsArr:selectedRowKeys})}}: null
        return (
            <div style={{ width:'98%' }} className="TestList" >
                <SearchBar children={this.SearchBarArr()} free={searchBarFree} clickSearch={this.handleSearch} addButton={null} pushButton={null} />
                <Table loading={tableLoading} style={{ marginBottom:15 }} columns={this.columns()} dataSource={tableList} pagination={false} rowKey={record => record.id} rowSelection={rowSelectionOptions} />
                <Pagination showQuickJumper showTotal={total => `共 ${total} 条`} defaultCurrent={1} total={total} defaultPageSize={10}  onChange={this.handlePageChange} current={page}/>
            </div>
        )
    }
}

export default SearchList;
