import React, { useEffect } from 'react'
import { withFormik, Form, Field} from 'formik'
import * as yup from 'yup'
import axios from 'axios'

const UserForm = (props) => {
    const { users, setUsers, errors, touched, status, values } = props
    console.log(props)
    useEffect(() => {
        if(status) {
            setUsers([ ...users, status ])
        }
    }, [status])

    return (
        <Form>
            {touched.user && errors.user && <p className='error'>{errors.user}</p>}
            <Field type='text' name='user' placeholder='user' />

            {touched.email && errors.email && <p className='error'>{errors.email}</p>}
            <Field type='text' name='email' placeholder='email' />

            {touched.password && errors.password && <p className='error'>{errors.password}</p>}
            <Field type='text' name='password' placeholder='password' />

            {touched.termsOfService && errors.termsOfService && <p className='error'>{errors.termsOfService}</p>}
            <label>
                <Field type='checkbox' name='termsOfService' checked={values.termsOfService} />
                <span>Terms of Service</span>
            </label>
            <button type='submit'>Submit</button>
        </Form>
    )
}

export default withFormik({
    mapPropsToValues: (values) => {
        return {
            user: values.user || '',
            email: values.email || '',
            password: values.password || '',
            termsOfService: values.termsOfService || false
        }
    },
    validationSchema: yup.object().shape({
        user: yup.string().required().min(2, "invalid name"),
        email: yup.string().email('invalid email').required(),
        password: yup.string().min(8, 'password must be at least 8 characters').required(),
        termsOfService: yup.boolean().required()
    }),
    handleSubmit: (values, { setStatus, resetForm, setValues }) => {
        axios.post('https://reqres.in/api/users', values)
            .then(res => {
                resetForm()
                return setStatus(res.data)
            })
            .catch(err => {
                return err.response
            })
    }
})(UserForm)