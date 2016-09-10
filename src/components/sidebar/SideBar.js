import React, {PropTypes} from 'react';
import SideBarHeader from './SideBarHeader.js';
import SideBarBody from './SideBarTreeBody.js';
import Paper from 'material-ui/Paper';
export
default React.createClass({
    propTypes: {
        className: PropTypes.string
    },
    getInitialState() {
        return {
            collapsed: false
        };
    },
    /**
     * Toggles if the panel body should be shown or not
     * @param  {Bool} nextState Value to be set
     */
    toggleView(nextState) {
        this.setState({
            collapsed: nextState
        });
    },
    shouldComponentUpdate(nextProps, nextState) {
        return this.state.filtering !== nextState.filtering ||
            this.state.collapsed !== nextState.collapsed;
    },
    render() {
        return <div className={this.props.className}>
                <Paper>
                    <SideBarHeader toggleView={this.toggleView}/>
                    <SideBarTreeBody hide={this.state.collapsed}/>
                </Paper>
            </div>;
    }
});
