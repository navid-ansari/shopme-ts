import React, { useEffect, useState } from 'react'

// redux
//import { useSelector } from 'react-redux'

// components
/*import Cart from '../components/Cart'

import { IProduct } from '../types/Product'
import { IStore } from '../types/Store'*/

import { useForm, Controller } from 'react-hook-form'
import signUp from '../client-request/sign-up'
import useProductActionHook from '../hooks/useProductActionHook'
import Select from 'react-select'
import Datepicker from '../components/common/Datepicker/Daterpicker'
import getRoles from '../client-request/get-roles'

const SignUp = () => {
  //const cart = useSelector((state: IStore) => state.cart)

  //const cartElem = cart.map((product: IProduct) => <Cart key={product.id} product={product} />)

  const { setUserDetails } = useProductActionHook()

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm()
  const [signUpForm, setSignUpForm] = useState<any>()
  const [roles, setRoles] = useState([])

  useEffect(() => {
    getRoles().then((response: any) => {
      const { data } = response
      setRoles(data)
    })
  }, [])

  const formSubmit = (data: any) => {
    console.log(data)
    console.log(signUpForm)
    setSignUpForm({ ...data })
    onSignUp(data)
  }

  const onSignUp = async (formData: any) => {
    console.log('Sign up form')
    console.log(formData)
    signUp(formData)
      .then((response: any) => {
        const { data } = response
        // dispatch data to store
        setUserDetails(data)
      })
      .catch((error: any) => {
        //console.log(error) // show error on alert box on UI
      })
  }

  const customStyles = {
    option: (provided: any, state: any) => ({
      ...provided,
      padding: 5
    }),
    control: (provided: any, state: any) => ({
      ...provided,
      background: '#fff',
      borderColor: '#ced4da',
      minHeight: '30px',
      height: '30px',
      boxShadow: state.isFocused ? null : null,
      borderRadius: '0'
    }),

    valueContainer: (provided: any, state: any) => ({
      ...provided,
      height: '30px',
      padding: '0 6px'
    }),

    input: (provided: any, state: any) => ({
      ...provided,
      margin: '0px'
    }),
    indicatorSeparator: (state: any) => ({
      display: 'none'
    }),
    indicatorsContainer: (provided: any, state: any) => ({
      ...provided,
      height: '30px'
    })
  }

  const registerOptions = {
    role: { required: 'Role is required' }
  }

  const getSelectedDob = (date: any) => {
    //setSignUpForm({ dob: date })
    console.log('callback date ', date)
  }

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="sign-up-page" data-testid="sign-up-page">
          <form onSubmit={handleSubmit(formSubmit)}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                {...register('username', {
                  required: true,
                  minLength: 3,
                  maxLength: 50,
                  pattern: /^[ A-Za-z0-9_.-]*$/
                })}
              />
              <div className="form-error-msg">
                {errors.username?.type === 'required' && <span>Username is required</span>}
                {errors.username?.type === 'minLength' && <span>Minimum three characters required</span>}
                {errors.username?.type === 'maxLength' && <span>Maximum fifty characters required</span>}
                {errors.username?.type === 'pattern' && <span>Only A-Z, 0-9 and _.- are allowed</span>}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                {...register('email', {
                  required: true,
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
                })}
              />
              <div className="form-error-msg">
                {errors.email?.type === 'required' && <span>Email is required</span>}
                {errors.email?.type === 'pattern' && <span>Invalid Email format</span>}
              </div>
              <div id="emailHelp" className="form-help-text">
                We&apos;ll never share your email with anyone else.
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="fname">First Name</label>
              <input
                type="text"
                id="fname"
                {...register('fname', {
                  required: true,
                  pattern: /^[a-zA-Z]+$/
                })}
              />
              <div className="form-error-msg">
                {errors.fname?.type === 'required' && <span>First name is required</span>}
                {errors.fname?.type === 'pattern' && <span>First name is invalid</span>}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="lname">Last Name</label>
              <input type="text" id="lname" {...register('lname', { required: true })} />
              <div className="form-error-msg">
                {errors.lname?.type === 'required' && <span>Last name is required</span>}
                {errors.lname?.type === 'pattern' && <span>Last name is invalid</span>}
              </div>
            </div>
            <div className="form-group">
              <label>Date Of Birth</label>
              <Datepicker selectedDob={getSelectedDob}></Datepicker>
              <div className="form-error-msg">{errors.dob && <span>Date of Birth is required</span>}</div>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                {...register('password', {
                  required: true
                })}
              />
              <div className="form-error-msg">
                {errors.password?.type === 'required' && <span>Password is required</span>}
                {errors.password?.type === 'pattern' && <span>Password format is invalid</span>}
              </div>
              <div className="form-help-text">
                Minimun 15 characters & must contain one uppercase, lowercase, number and a special character.
              </div>
            </div>
            <div className="form-group">
              <label>Role</label>
              <Controller
                name="role"
                control={control}
                rules={registerOptions.role}
                render={({ field }) => (
                  <Select
                    options={roles}
                    isMulti
                    {...field}
                    className="react-select-container"
                    classNamePrefix="react-select"
                  />
                )}
              />
              <div className="form-error-msg">{errors?.role && errors.role?.message?.toString()}</div>
            </div>
            <div className="button-group">
              <button className="default" type="submit">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp
