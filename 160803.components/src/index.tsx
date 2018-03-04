import * as React from "react";
import * as ReactDOM from "react-dom";

import { Search } from "./components/Search";
import { Button } from "./components/Button";
import { Panel } from "./components/Panel";
import { Tabs } from "./components/Tabs";
import { UserImage } from "./components/UserImage";
import { List } from "./components/List";
import { Sidemenu } from "./components/Sidemenu";
import { Fapiao } from "./components/Fapiao";


var action: any = (value: any) => {
	alert(value);
};

var sampleIcon:string = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AEWDjA79lFiDAAAA+RJREFUWMPNmL1v3GQcx/345fGdE18e3xknlwtCaiSE2BiqUIjUoVsVWMiKEIj+AV0oC6pYCkJIDCBWKnUNEko6sDAgpZQKpE5ELESqavkSn4L9yI5ztp/zw5Kgq/P4Hp/jpH1Gv378e/P3+wBKqfAiL1kQBAEAUPoGRVFWIITriqJckWX5lfFzhJAnaZo+TJJkI03TR2eFo5QKgFJaClDTtE8QQp+rqtoo8/A4jocY4++iKLpDKfXODbDRaHzYbre/LwuWX4SQbDAYfDwcDn+oHRAhtG0Yxtt11BLGeMfzvNVpolkICAAwLMva1TQN1VnwURT5ruteKgtZCDg/P+/x4IIgsOM4/iXXQJfn5uZerwuSCdhqtTY7nc47RfXk+/69MAxvFr0AAGA0m80bnU7nC1mWRdY1nuc98H1/dWpACOFar9fbqqOGAACGYRjbRRHt9/sf8RrnFODi4uIRq1vLfvE0jRbH8bDf7y9O+mBKqSCOzzkWHMZ4pyqcIAiC7/urnuc9yB9XVbXRbDZvcDNxEkFWYxBCMtu2zaqDdjzd3W7XyQcgjuOh4zhNbgQlSVpmda3v+/fOCnf8Is/3/dusKCqKsjLpXvH4wvdYHRuG4c0aZ+BXhJAsfxxCuM4FlGX5VI0dHh7+XUf0crPzISOK17mAEMI38ifSNP2jbumUJMnmKQBRbHEBC9TIRt2AhJAdRorNSoAXtXgqqRBQFMWXLgIwiiK/EqCiKFfrhmE9czQahVzAvCo5Dv21c0jndUZdPuECpmn6a/6ErutLkiQt1wUHADBmZmZeK9PZrAj+VOBDPqsLcHZ29huW/Irj+EcuIKXUwxifGgGmaX7A+xWVWZIkLSOE3meJ3tFo9E+pJgnD8Bbrgna7/TMAwDhLak3T/JMVvSiKvuXdL47Vwv0gCGxGmpFlWbtVIE9Ea5F9YNX+xDGDMV4vqEXU7XYdCOHaNAbfsqzdSR5lYWHht1JqZuyLHrmu+3XRxO/1elsIoe1JD1UUZQUhtL20tPQ7z3jJsizyIJmurowfJoRkR0dHTpIkjyml/6qqeg1CaFYx+ISQbG9v7638dslE416naa8K+YwnYXmJ/f39WyyReS67WAXpFnkq2HGcV1ndPYVItW3bfpNlnMpAlt7dghCuaZr2qa7rV4oMed6qRlH0ZZIk98dm6l+8nYdxs5ZlmVcaMA+rKMpVliSL43hjHKrqns/BwcEWxvjdSoBnFQ1lIIMgsAeDwcsXrqgppZ7rupd4QvW5Sv4ykEmSPJ6qSS4y3SdbdFmWecLz3uUHABi6rt81TfOpaZpPW63W5okw+f9P8iKv/wCR5lHiuuVTsgAAAABJRU5ErkJggg==';

ReactDOM.render(
	<div>
		<div className="component">
			<h3>Search</h3>
			<Search action={action} />
		</div>

		<div className="component">
			<h3>Button</h3>
			<Button type="icon" text="icon: text will not appear" action={action} src={sampleIcon}/>
			<Button type="icon" text="icon: text will not appear" action={action} />
			<Button type="primary" text="Primary Button" action={action} />
			<Button type="second" text="Second Button" action={action} />
			<Button type="tertiary" text="Tertiary Button" action={action} />
		</div>

		<div className="component">
			<h3>Panel</h3>
			<Panel>
				<article>
					<h1>Heading</h1>
					<p>
						Panel is a simple container with a gray background and a 100% width.
					</p>
				</article>
			</Panel>
		</div>

		<div className="component">
			<h3>Tabs</h3>
			<Tabs titles={['T1', 'Tab2', 'LongTabTitleStretch']} defaultActiveIndex={1}>
				<Panel><article><h1>Description</h1><p>Tab titles and tab content are seprately defined.</p></article></Panel>
				<Panel><article><h1>Default Tab</h1><p>defaultActiveIndex can be specified to tell Tabs which tab to show when initialized.It starts from 0.</p></article></Panel>
				<Panel><article><h1>Container</h1><p>Tab can contain other components.Here is a Search component: </p><Search action={action} /></article></Panel>
			</Tabs>
		</div>

		<div className="component">
			<h3>UserImage</h3>
			<UserImage name="Little Ming"/>
			<UserImage name="小明"/>
			<UserImage name="not so good it here" src={sampleIcon} />
		</div>

		<div className="component">
			<h3>Sidemenu</h3>
			<div style={{ position: 'relative', height: '500px' }}>
				<Sidemenu>
					<div className="logo">logo</div>
					<menu className="menu">
						<li>
							<button>
								<i></i>
								<span>my invoice</span>
							</button>
						</li>
						<li>
							<button>
								<i></i>
								<span>validate invoice</span>
							</button>
						</li>
						<li>
							<button>
								<i></i>
								<span>settings</span>
							</button>
						</li>
					</menu>
					<div className="user" style={{display:'none'}}>
						<div className="avatar">avatar</div>
						<div className="user">
							<div className="account">a @a.com</div>
							<div className="type">company</div>
						</div>
						<div className="close">close</div>
					</div>
				</Sidemenu>
			</div>
		</div>

		<div className="component">
			<h3>Fapiao</h3>
			<Fapiao />
		</div>

	</div>,
	document.getElementById("showcases")
);

