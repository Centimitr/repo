import * as React from "react";

export interface SidemenuProps { defautFlatStatus?: boolean }
export interface SidemenuState { flat: boolean }

export class Sidemenu extends React.Component<SidemenuProps, SidemenuState> {

	constructor(props: SidemenuProps) {
		super(props);
		this.state = { flat: !!props.defautFlatStatus };
	}

	contract = () => {
		this.setState({ flat: false });
	}

	flat = () => {
		this.setState({ flat: true });
	}

    render() {
		let className = 'UISidemenu';
		if (this.state.flat) {
			className += ' ' + 'flat';
		}
        return (
			<div className={className} onMouseEnter={this.flat} onMouseOut={this.contract}>
				{this.props.children}
			</div>
        );
    }
}
