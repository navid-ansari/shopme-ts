import React, { useEffect, useState } from 'react'

// redux
import { useSelector } from 'react-redux'

// components
import Cart from '../components/Cart'

import { IProduct } from '../types/Product'
import { IStore } from '../types/Store'

import signIn from '../client-request/sign-in'

import useProductActionHook from '../hooks/useProductActionHook'

const SignIn = () => {
  const [formFields, setFormFields] = useState({ email: '', password: '' })
  const [formErrors, setFormErrors] = useState<any>({})
  const [isSubmit, setIsSubmit] = useState(false)

  const cart = useSelector((state: IStore) => state.cart)
  const { setUserDetails } = useProductActionHook()

  const cartElem = cart.map((product: IProduct) => <Cart key={product.id} product={product} />)

  const formValueChange = (event: any) => {
    console.log(formFields)
    const { name, value } = event.target
    setFormFields((values) => ({ ...values, [name]: value }))
  }

  const onSignIn = (e: any) => {
    e.preventDefault()
    console.log(formFields)
    setFormErrors(validate(formFields))
    setIsSubmit(true)
  }

  useEffect(() => {
    console.log('use effect')
    console.log(formErrors)
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log('form submit')
      loginReq()
    }
  }, [formErrors])

  const validate = (values: any) => {
    const errors: any = {}

    // email validator
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
    if (!values.email) {
      errors.email = 'Email is required'
    } else if (!emailRegex.test(values.email)) {
      errors.email = 'Email format is incorrect'
    }

    // password validator
    if (!values.password) {
      errors.password = 'Password is required'
    }
    return errors
  }

  const loginReq = async () => {
    const formData = {
      ...formFields
    }
    /*console.log(formData)
    const req = {
      type: 'POST',
      url: 'api/signin',
      data: formData,
      params: null
    }
    try {
      const response = await Utils.restClient(req)
      if (response) {
        showToast('SUCCESS', 'User Logged In')
      }
    } catch (error) {
      const { status } = error
      if (status && status === 404) {
        showToast('ERROR', 'User not found')
      }
      if (status && status === 401) {
        showToast('ERROR', 'Username or Password is incorrect')
      }
      if (status && status === 500) {
        showToast('ERROR', 'Error executing the Sign In query')
      }
    }*/
    signIn(formData)
      .then((response: any) => {
        const { data } = response
        // dispatch data to store
        setUserDetails(data)
      })
      .catch((error: any) => {
        //console.log(error) // show error on alert box on UI
      })
  }

  const setInitialValues = () => {
    setFormFields({ email: '', password: '' })
    setFormErrors({})
    setIsSubmit(false)
  }

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="sign-in-page" data-testid="sign-in-page">
          <form>
            <div className="form-group">
              <label>Email</label>
              <input type="text" name="email" value={formFields.email} onChange={formValueChange} />
              <div className="form-error-msg">{formErrors.email}</div>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" name="password" value={formFields.password} onChange={formValueChange} />
              <div className="form-error-msg">{formErrors.password}</div>
            </div>
            <div className="button-group">
              <button className="default" type="submit" onClick={onSignIn}>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignIn
