import * as React from "react";

export interface FapiaoProps { }
export interface FapiaoState { }

export class Fapiao extends React.Component<FapiaoProps, FapiaoState> {

	constructor(props: FapiaoProps) {
		super(props);
		this.state = {};
	}

    render() {
        return (
			<div className="UIFapiao"></div>
        );
    }
}
