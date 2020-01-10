import React from 'react';
import ReactDOM from "react-dom";
import { render, getByText } from '@testing-library/react'; 
import chai, { expect } from 'chai';
import MoveList from './moveList';
import { configure, shallow, mount } from 'enzyme';

configure({ adapter: new Adapter() });

describe('Checking MoveList-Component', () => {
	const wrapper = shallow(<MoveList/>);

	it('is there a container', () => {
			expect(wrapper.find(".moveList")).to.have.lengthOf(1); 
	});

});