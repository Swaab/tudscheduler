import React, {PropTypes} from 'react';
import SimpleDropTarget from './SimpleDropTarget.js';
import ISPPanel from './ISPPanel.js';

/**
 * Renders an ISPField which is turn a drop target for CourseDnD.
 */
export
default React.createClass({
    propType:{
        category: PropTypes.object.isRequired,
        className: PropTypes.string
    },
    render() {
        const category = this.props.category;
        return <SimpleDropTarget className={this.props.className} id={category.id}>
            <ISPPanel {...this.props}/>
        </SimpleDropTarget>;
    }
});