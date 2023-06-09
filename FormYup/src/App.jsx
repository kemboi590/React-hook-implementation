
import './App.css'
// npm install react-hook-form
import { useForm } from 'react-hook-form'
// npm install yup
import * as yup from 'yup'
// npm install @hookform/resolvers
import { yupResolver } from '@hookform/resolvers/yup'



function App() {

  const chema = yup.object().shape({
    fullname: yup.string().required('Full name is required'),
    email: yup.string().email('Email is invalid').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm password is required')
  })
  const { register, handleSubmit, formState: {errors}, reset} = useForm({ resolver: yupResolver(chema)})

  const SendDataToServer = (data) => { 
    console.log(data)
    reset()

  }



  return (
    <div id='MyForm'>
      <form onSubmit={handleSubmit(SendDataToServer)}>
        <>
          <input type="text" placeholder='Your full name' {...register("fullname")} />
          <p>{errors.fullname?.message}</p>
        </>
        <>
          <input type="email" placeholder='Your email' {...register("email")} />
          <p>{errors.email?.message}</p>
        </>
        <>
          <input type="password" placeholder='Your password' {...register("password")} />
          <p>{errors.password?.message}</p>
        </>
        <>
          <input type="password" placeholder='Confirm your password' {...register("confirmPassword")} />
          <p>{errors.confirmPassword?.message}</p>
        </>
        <input type="submit" value="submit" className='submitbtn' />
      </form>
     
    </div>
  )
}

export default App
