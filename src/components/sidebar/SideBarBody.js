import React, {PropTypes} from 'react';
import {
    ListGroup
}
from 'react-bootstrap';
import CourseCtrl from '../../models/CourseCtrl.js';
import _ from 'lodash';
import EventServer from '../../models/EventServer.js';
import CourseTree from './CourseTree.js';

export default React.createClass({
    propTypes: {
        filter: PropTypes.string.isRequired
    },
    getInitialState() {
        return {
            filter: '',
            tree: []
        };
    },
    componentWillReceiveProps(nextProps){
        this.setState({
            filter: nextProps.filter
        });
    },
    componentDidMount() {
        EventServer.on('courses.loaded', ()=> this.setState({
            tree: CourseCtrl.flatten(null, null, 'nr')
        }));
    },
    render(){
        var courses = this.state.tree;
        var filter = this.state.filter.toLowerCase();
        if (filter.length > 0) {
            courses = _(courses)
                .filter(function(course) {
                    return CourseCtrl.hasNeedle(course, filter);
                })
                .uniqBy(function(course) {
                    return course.id;
                })
                .value();
        }
        const rows = courses
            .map(function(child) {
                const visible = child.parent === 1;
                return <CourseTree key={child.nr}
                    filter={filter}
                    visible={visible}
                    course={child}/>;
            });
        if(rows.length === 0) {
            return <div className='panel-body empty'>
                No matching course found
            </div>;
        }
        return <div className='panel-body'>
            <ListGroup>
                {rows}
            </ListGroup>
        </div>;
    }
});
