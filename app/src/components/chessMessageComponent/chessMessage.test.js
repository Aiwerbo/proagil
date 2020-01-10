import React from 'react';
import ReactDOM from "react-dom";
import { render, getByText } from '@testing-library/react';
import chai, { expect } from 'chai';
import ChessMessage from './chessMessage';
import { configure, shallow, mount } from 'enzyme';

configure({ adapter: new Adapter() });

describe('Checking ChessMessage-Component', () => {
	const wrapper = shallow(<ChessMessage/>);

	it('is there a container', () => {
			expect(wrapper.find(".chessMessage")).to.have.lengthOf(1); 
	});

});