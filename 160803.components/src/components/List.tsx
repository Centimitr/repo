import * as React from "react";

export interface ListProps { }
export interface ListState { }

export class List extends React.Component<ListProps, ListState> {

	constructor(props: ListProps) {
		super(props);
		this.state = {};
	}

    render() {
        return (
			<ul className="UIList">
				{this.props.children}
			</ul>
        );
    }
}

export interface ListItemProps { }
export interface ListItemState { }

export class ListItem extends React.Component<ListItemProps, ListItemState> {

	constructor(props: ListItemProps) {
		super(props);
		this.state = {};
	}

    render() {
        return (
			<li className="UIListItem">
				{this.props.children}
			</li>
        );
    }
}
