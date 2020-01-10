import React from 'react';
import ReactDOM from "react-dom";
import { render, getByText } from '@testing-library/react';
import chai, { expect } from 'chai';
import SideMenu from './sideMenu';
import { configure, shallow, mount } from 'enzyme';

configure({ adapter: new Adapter() });

describe('Checking SideMenu-Component', () => {
	const wrapper = shallow(<SideMenu/>);

	it('is there a container', () => {
			expect(wrapper.find(".sideMenu")).to.have.lengthOf(1); 
	});

});