import React, {Component} from 'react';

import './item-status-filter.css';

export default class ItemStatusFilter  extends Component{

state = {
  classNames: ['btn btn-info', 'btn btn-outline-secondary', 'btn btn-outline-secondary']
};
    render() {
        const {changeSearch} = this.props;
        const all = () =>{
            changeSearch('all');
            this.setState({
                classNames: ['btn btn-info', 'btn btn-outline-secondary', 'btn btn-outline-secondary']
            });

        };

        const active = () =>{
            changeSearch('active');
            this.setState({
                classNames: ['btn btn-outline-secondary', 'btn btn-info', 'btn btn-outline-secondary']
            });
        };
        const done = () =>{
            changeSearch('done');
            this.setState({
                classNames: ['btn btn-outline-secondary', 'btn btn-outline-secondary', 'btn btn-info']
            });
        };
        return (
            <div className="btn-group">
                <button type="button"
                        className={this.state.classNames[0]} onClick={all}>All</button>
                <button type="button"
                        className={this.state.classNames[1]} onClick={active}>Active</button>
                <button type="button"
                        className={this.state.classNames[2]} onClick={done}>Done</button>
            </div>
        );
    };
}
