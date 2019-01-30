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
}