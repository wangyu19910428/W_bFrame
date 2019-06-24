<<<<<<< HEAD
import { unstable_renderSubtreeIntoContainer, unmountComponentAtNode } from 'react-dom';
import './index.scss';

export default class Dialog extends Component{
    constructor(props) {
        super(props);
        
        this.state = {

        }
    }
    render () {
        return null;
    }
    
    componentDidMount () {
        const doc = window.document;
        this.node = doc.createElement('div');
        doc.body.appendChild(this.node);

        this.renderPortal(this.props);
    }

    componnetDIdUpdate() {
        this.renderPortal(this.props);
    }

    componentWillUnmount() {
        unmountComponentAtNode(this.node);
        window.document.body.removeChild(this.node);
    }

    renderPortal (props) {
        unstable_renderSubtreeIntoContainer(
            this, //代表当前组件
            <div className='dialog'> 
                {props.children}
            </div>, //塞进传送门的JSX
            this.node //传送门另一端的DOM node
        )
    }
=======
import {createPortal} from 'react-dom';
import './index.scss';

export default class Dialog extends Component{
    constructor() {
        super(...arguments);
        
        const doc = window.document;
        this.node = doc.createElement('div');
        doc.body.appendChild(this.node);
    }
    
    render () {
        return createPortal(
            <div className='dialog' >
                {this.props.children}
            </div>, //塞进传送门的JSX
            this.node //传送门的另一端DOM node
        );
    }

    componentWillUnmount () {
        window.document.body.removeChild(this.node);
    }
>>>>>>> master
}