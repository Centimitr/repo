import * as React from "react";

export interface PanelProps { }
export interface PanelState { }

export class Panel extends React.Component<PanelProps, PanelState> {

	constructor(props: PanelProps) {
		super(props);
		this.state = {};
	}

    render() {
        return (
			<div className="UIPanel">
				{this.props.children}
			</div>
        );
    }
}
