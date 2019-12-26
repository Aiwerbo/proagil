import React from 'react';
import ReactDOM from "react-dom";
import { render, getByText } from '@testing-library/react';
import chai, { expect } from 'chai';
import Lobby from './lobby';
import { configure, shallow, mount } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Lobby />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('Checking Lobby component', () => {
	const wrapper = shallow(<Lobby/>);

	it('is there two button', () => {
			expect(wrapper.find("button")).to.have.lengthOf(2); 
	});

	it('is there a table', () => {
		expect(wrapper.find("table")).to.have.lengthOf(1); 
	});

	it('is there a tr', () => {
		expect(wrapper.find("lobby-tr")).to.have.lengthOf(0); 
	});
});





/* 
	it('Add a tr to table when clicking button', () => {
		const wrapper = shallow(<Lobby/>);
		expect(wrapper.find("table")).to.have.lengthOf(1); //<-- Innan knapptryckning, ser om den är helt tom.
		//wrapper.find(".lobby-button").simulate("click"); //<-- Knapptryckning
		expect(wrapper.find("table")).to.have.lengthOf(1); //<--- Efter knapptryckning, ser om det tillkommit en.
	}); */