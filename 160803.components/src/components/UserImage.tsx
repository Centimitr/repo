import * as React from "react";

export interface UserImageProps { name?: string, src?: string, hue?: number }
export interface UserImageState { }

export class UserImage extends React.Component<UserImageProps, UserImageState> {

	constructor(props: UserImageProps) {
		super(props);
	}

    render() {
		let className = 'UIUserImage';
		let imageHTML: any;

		if (this.props.src) {
			imageHTML = <img className={className} src={this.props.src} title={this.props.name} />;
			// imageHTML = <div className={className}
			// style={{background:'url('+this.props.src+')'}}
			// ></div>
		} else {
			// generate abbr
			let names = [''];
			if (this.props.name) {
				names = this.props.name.split(' ');
			}
			let abbr: string;
			if (names.length > 1) {
				// abbr = names.map(name => name.charAt(0)).join('');
				abbr = names[0].charAt(0) + names[names.length - 1].charAt(0);
			} else {
				abbr = this.props.name.charAt(0);
			}
			// english name small class
			if (abbr.split('').length > 1) {
				className += ' ' + 'small';
			}
			// generate color
			let hue: number;
			if (this.props.hue && this.props.hue <= 360 && this.props.hue >= 0) {
				hue = this.props.hue;
			} else {
				hue = Math.floor(Math.random() * 60) * 6;
			}
			imageHTML = <div className={className}
				title={this.props.name}
				style={{
					backgroundColor: 'hsl(' + hue + ',100%,93%)',
					borderColor: 'hsl(' + hue + ',75%,75%)',
					color: 'hsl(' + hue + ',40%,30%)',
				}}>{abbr}</div>
		}

        return (
			<span>
				{imageHTML}
			</span>
        );
    }
}
