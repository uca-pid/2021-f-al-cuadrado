import React from 'react'
import Login from '../../src/components/landing/Login'
import {render, screen, fireEvent} from '@testing-library/react';

jest.mock('../../src/services/loginService');

describe('Login', () => {

  const mockFuntion = () => {return true};
  let wrapper;
  beforeEach(() => {
    wrapper = render(<Login setLayoutForgotPassword={mockFuntion} setLayoutRegister={mockFuntion}/>)
  })

  it("login component renders sucsessfully", () => {
    expect(wrapper).toMatchSnapshot();
  })

  it("login set inputs", () => {
    fireEvent.change(screen.getByTestId("user-input"),{target:{value:"test@gmail.com"}})
    fireEvent.change(screen.getByTestId("password-input"),{target:{value:"12345"}})
    expect(screen.getByTestId("user-input").value).toBe("test@gmail.com")
    expect(screen.getByTestId("password-input").value).toBe("12345")
  })

  it("login successful", () => {
    fireEvent.change(screen.getByTestId("user-input"),{target:{value:"test@gmail.com"}})
    fireEvent.change(screen.getByTestId("password-input"),{target:{value:"12345"}})
    
    fireEvent.click(screen.getByTestId("login-button"));
    expect(localStorage.getItem('session')).toBe(JSON.stringify({code:"123456", user_id:1}))
  })

  it("login wrong email", () => {
    fireEvent.change(screen.getByTestId("user-input"),{target:{value:"wrongEmail@gmail.com"}})
    fireEvent.change(screen.getByTestId("password-input"),{target:{value:"12345"}})
    
    expect(screen.getByText("Wrong credentials").style._values.display).toBe("none");
    fireEvent.click(screen.getByTestId("login-button"));
    expect(screen.getByText("Wrong credentials").style._values.display).toBe("block");
  })

  it("login wrong password", () => {
    fireEvent.change(screen.getByTestId("user-input"),{target:{value:"test@gmail.com"}})
    fireEvent.change(screen.getByTestId("password-input"),{target:{value:"wrongPassword"}})
    
    expect(screen.getByText("Wrong credentials").style._values.display).toBe("none");
    fireEvent.click(screen.getByTestId("login-button"));
    expect(screen.getByText("Wrong credentials").style._values.display).toBe("block");
  })


})
