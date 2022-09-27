import React, {useState} from 'react'
import {motion} from 'framer-motion'

import {urlFor, client} from '../../client'
import { images } from '../../constants'
import { AppWrap, MotionWrap } from '../../wrapper'
import './Footer.scss'


const variants = {
  show: {
    opacity: 1,
    y: 0,
    transition: {
      ease: 'easeIn',
      duration: 0.3
    }
  },
  hide: {
    y: -20,
    opacity: 0
  }
}

const Footer = () => {
  const [formData, setFormData] = useState({name: '',email: '',message: ''})
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const { name, email, message } = formData

  const handleChangeInput = (e) => {
    const { name, value} = e.target
    setFormData({...formData, [name]: value})
  }

  const handleSubmit = () => {
    setLoading(true)

    const contact = {
      _type: 'contact',
      name: name,
      email: email,
      message: message
    }

    client.create(contact)
      .then(() => {
        setLoading(false)
        setIsFormSubmitted(true)
      })
      .catch((err) => console.log(err))
  }

  return (
    <>
    <div className='app__footer-head-text'>
      <h1 className="head-text">Take a coffee & chat with me</h1>      
    </div>
      <div className='app__footer-cards'>
        <div className='app__footer-card'>
          <img src={images.gmail} alt='email'/>
          <a href="mailto:kanskharat222000@gmail.com" className='p-text'>kanskharat222000@gmail</a>
        </div>
        <div className='app__footer-card'>
          <img src={images.smartphone} alt='mobile'/>
          <a href="tell: +91 9552509634" className='p-text'>9552509634</a>
        </div>
      </div>
      {!isFormSubmitted ? 
      <div className='app__footer-form app__flex'
        >
        <div className='app__flex'>
          <input className='p-text' type='text' placeholder='Your Name' name='name' value={name} onChange={handleChangeInput}/>
        </div>
        <div className='app__flex'>
          <input className='p-text' type='email' placeholder='Your Email' name='email' value={email} onChange={handleChangeInput}/>
        </div>
        <div>
          <textarea className='p-text' placeholder='Your Message' value={message} name='message' onChange={handleChangeInput}></textarea>
        </div>
        <button type='button' className='p-text' onClick={handleSubmit}>{loading ? 'Sending' : 'Send Message'}</button>
      </div>
      : 
      <motion.div
        whileInView={{opacity: [0,1]}}
        transition={{duration: 0.7, type: 'tween'}}
      >
        <h3 className='head-text'>Thank you for getting in touch!</h3>
      </motion.div>
      }

    </>
  )
}

export default AppWrap (
  MotionWrap(Footer,'app__footer'), 
  'contact',
  'app__whitebg'
)