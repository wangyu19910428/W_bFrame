import { Form, Row, Col, Button, Icon } from 'antd';
const FormItem = Form.Item;


class SearchBarComponent extends Component {
    constructor (props) {
        super(props);
        this.state = {
            childrenData:[],
            defaultObj: {},
            addButton: '',
            free: this.props.free,
        }
    }

    componentWillMount () {
        this.setState({
            childrenArr:this.props.childrenArr
        })
    }

    componentDidMount () {
        let obj = {};
        if (this.state.childrenArr) {
            this.state.childrenArr.map((item,index)=>{
                if(item.defaultValue) {
                    obj[item.params] = item.defaultValue;
                }
            })
        }
        this.setState({
            defaultObj:obj
        })
        this.props.form.setFieldsValue(obj);
    }

    componentWillReceiveProps (nextProps) {
        if(nextProps.children) {
            let childrenData = this.props.children && this.props.children instanceof Array ? nextProps.children : nextProps.children.props.children;
            let newData = [];
            if(childrenData instanceof  Array){
                newData = childrenData;
            }else{
                newData.push(childrenData);
            }
            this.setState ({
                childrenData: newData,
                addButton:nextProps.addButton
            })
        } else if(nextProps.childrenArr) {
            this.setState({
                childrenArr:nextProps.childrenArr,
            })
        }
        this.setState({btnLoading: nextProps.btnLoading});
    }

    handleSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            for(let key in values) {
                if(values[key] === undefined) {
                    values[key] = ''
                }
            }
            this.props.clickSearch(values);
        });
    }
    handleExport = () => {
        this.props.form.validateFields((err, values) => {
            for(let key in values) {
                if(values[key] === undefined) {
                    values[key] = ''
                }
            }
            this.props.handleExport(values);
        });
    }
    handleReset = () => {
        this.props.form.resetFields();
        this.props.form.setFieldsValue(this.state.defaultObj);
        this.props.handleReset && this.props.handleReset();
    };


    // To generate mock Form.Item
    getFields() {
        const { getFieldDecorator } = this.props.form;
        let children;
        if(!this.state.childrenArr) {
            children = this.state.childrenData.map((item, index)=>{
                if(item.type === 'div') {
                    return (
                        <Col style={{ display: (item.props.isShow === undefined || item.props.isShow) ? 'block' : 'none' }} span={8} key={index} >
                            {
                                item.props.children.map((items)=> {
                                    let formItemLayout = {
                                        labelCol: { span: items.props.labelCol || 6 },
                                        wrapperCol: { span: items.props.wrapperCol || 18 },
                                    };
                                    return (
                                        <FormItem className={'ant-col-' + 24/item.props.children.length} style={{ float:'left' }} {...formItemLayout} label={items.props.label}>
                                            {getFieldDecorator(items.props.params)(
                                                items
                                            )}
                                        </FormItem>
                                    )
                                })
                            }
                        </Col>
                    )
                } else {
                    let formItemLayout = {
                        labelCol: { span: item.props.labelCol || 6 },
                        wrapperCol: { span: item.props.wrapperCol || 18 },
                    };
                    return (
                        <Col span={8} key={index} style={{ display: (item.props.isShow === undefined || item.props.isShow) ? 'block' : 'none' }} >
                            <FormItem {...formItemLayout} label={item.props.label}>
                                {getFieldDecorator(item.props.params)(
                                    item
                                )}
                            </FormItem>
                        </Col>
                    )
                }
            });
        } else {
            children = this.state.childrenArr.map((item,index)=> {
                if(this.props.free) {
                    return (
                        <FormItem style={{ paddingRight:0, paddingLeft:0, marginLeft:item.merge ? 0 : 20, marginBottom:7 }} key={index} label={item.label}>
                            {getFieldDecorator(item.params)(
                                item.type
                            )}
                        </FormItem>
                    )
                } else {
                    let formItemLayout = {
                        labelCol: { span: 8 },
                        wrapperCol: { span: 16 },
                    }
                    return (
                        <Col span={8} key={index} >
                            <FormItem {...formItemLayout} label={item.label}>
                                {getFieldDecorator(item.params)(
                                    item.type
                                )}
                            </FormItem>
                        </Col>
                    )
                }
            })
        }

        return children;
    }

    render() {
        return (
            <Form inline={this.props.free ? true : false} className="ant-advanced-search-form" onSubmit={this.handleSearch}>
                <Row gutter={40}>{this.getFields()}</Row>
                <Row style={{ marginBottom:15 }}>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        <Button type="primary" htmlType="submit" loading={this.state.btnLoading} style={{display: this.props.hasScBtn? 'none': 'inline-block'}}>查询</Button>

                        <Button style={{display: this.props.hasCzBtn? 'none': 'inline-block', marginLeft: 8 }} onClick={this.handleReset}>
                            重置
                        </Button>
                        <Button style={{display: this.props.hasExBtn? 'inline-block': 'none', marginLeft: 8}} onClick={this.handleExport}>导出</Button>
                        {
                             this.props.addButton
                        }
                        {
                            this.props.pushButton
                        }
                    </Col>
                </Row>
            </Form>
        );
    }
}


const SearchBar = Form.create( {
    withRef: true,
    mapPropsToFields(props) {
        let data = {};
        if (props.children instanceof Array) {
            props.children.map((item, index) => {
                data[item.props.params] = {value: item.props.value};
            })
            return data;
        } else {
            props.children.props.children.map(item => {
                data[item.props.params] = {value: item.props.value};
            })
            return data;
        }
    }
} )(SearchBarComponent);
export default SearchBar;
