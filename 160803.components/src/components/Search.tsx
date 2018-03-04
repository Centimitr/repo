import * as React from "react";

export interface SearchProps { action: any }
export interface SearchState { value: string, active: boolean }

export class Search extends React.Component<SearchProps, SearchState> {

	constructor(props: SearchProps) {
		super(props);
		this.state = { value: '', active: false };
	}

	clearInputValue = () => {
		this.setState({ value: '', active: false });
	}

	onValueChange = (event: any) => {
		this.setState({ value: event.target.value, active: this.state.active });
	}

	onFocus = () => {
		let val = this.state;
		val.active = true;
		this.setState(val);
	}

	onBlur = () => {
		if (!this.state.value.length) {
			let val = this.state;
			val.active = false;
			this.setState(val);
		}
	}

	onKeyPress = (event: any) => {
		if (event.key === 'Enter') {
			console.log(this.state.value);
			this.props.action(this.state.value);
		}
	}

    render() {
		let clearButton: any;
		let className: string = 'UISearch';
		if (this.state.active) {
			clearButton = <button onClick={this.clearInputValue}>X</button>;
			className += ' ' + 'active';
		}
        return (
			<div className={className}>
				<input type="text" value={this.state.value}
					onChange={this.onValueChange}
					onFocus={this.onFocus}
					onBlur={this.onBlur}
					onKeyPress={this.onKeyPress}
					/>
				{clearButton}
			</div>
        );
    }
}
