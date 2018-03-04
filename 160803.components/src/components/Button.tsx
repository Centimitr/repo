import * as React from "react";

export interface ButtonProps { type?: string, text?: string, action: any, disabled?: string, src?: string }
export interface ButtonState { }

export class Button extends React.Component<ButtonProps, ButtonState> {

	constructor(props: ButtonProps) {
		super(props);
		this.state = {};
	}

    render() {
		// disabled
		let disabled = this.props.disabled === 'true' || this.props.disabled === 'disabled' ? 'true' : 'false';
		let className = 'UIButton';

		// class
		let type = this.props.type;
		if (type === 'second' || type === 'tertiary' || type === 'icon') {
			className += ' ' + type;
		} else {
			className += ' ' + 'primary';
		}

		// background
		let background: string;
		if (this.props.type === 'icon' && this.props.src) {
			background = 'url(' + this.props.src + ')';
		}

        return (
			<div className={className} disabled={disabled}
				style={{ background: background }}
				onClick={this.props.action}
				>
				{this.props.type !== 'icon' ? this.props.text : null}
			</div>
        );
    }
}
