import React from 'react';
import { render, getByText } from '@testing-library/react';
import chai, { expect } from 'chai';
import Login from './login';
import Lobby from './lobby';
import { configure, shallow, mount } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

it('is there a button', () => {
    const wrapper = shallow(<Login />); //Väljer komponenten
    expect(wrapper.find(".login-button")).to.have.lengthOf(1); 
});

it('is there an input', () => {
    const wrapper = shallow(<Login />); //Väljer komponenten
    expect(wrapper.find(".login-input")).to.have.lengthOf(1); 
});

describe('Checking input', () => {
	const wrapper = shallow(<Login />); //Väljer komponenten

	it('Are input empty in the beginning?', () => {
        expect(wrapper.find(".login-input").prop('value')).to.equal(''); 
    });

    it('When input has a value', () => {
        wrapper.find(".login-input").simulate("change", {target: {value: "Test"}}); //Simulerar en onChange och sätter value till "Test". 
        expect(wrapper.find(".login-input").prop("value")).to.equal("Test"); //Checkar att value faktiskt blivit "Test".
    });
});

describe('Button click', () => {
	const wrapper = shallow(<Login />); 

	it('click button', () => {
		wrapper.find('.login-button').simulate('click', {preventDefault: () => {}});
	});
});







