import * as React from "react";

export interface TabsProps { titles: Array<string>, defaultActiveIndex:number }
export interface TabsState { activeIndex: number }

export class Tabs extends React.Component<TabsProps, TabsState> {

	constructor(props: TabsProps) {
		super(props);
		let activeIndex = 0;
		if(props.defaultActiveIndex<props.titles.length) {
			activeIndex = this.props.defaultActiveIndex;
		}
		this.state = { activeIndex: activeIndex };
	}

	switchTab = (index: number) => {
		this.setState({ activeIndex: index });
	}

    render() {
		let children = React.Children.toArray(this.props.children);
		let activeView = children[this.state.activeIndex] || <div></div>;
        return (
			<div className="UITabs">
				<menu>
					<div className="tabs">
					{
						this.props.titles.map((title: string, index: number) => {
							let className = "tab";
							if(this.state.activeIndex===index) {
								className += ' '+'active';
							}
							return <div key={title+'.'+index.toString()} className={className} onClick={()=>{this.switchTab(index)}}>{title}</div>
						})
					}
				</div>
				</menu>
				{activeView}
			</div>
        );
    }
}
