import React, {useState, useEffect} from 'react'
import {motion} from 'framer-motion'
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi'
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import AppWrap from '../../wrapper/AppWrap'
import {urlFor, client} from '../../client'
import { images } from '../../constants'
import { MotionWrap } from '../../wrapper'
import './Testimonial.scss'

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

const Testimonial = () => {

  const [brands, setBrands ] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [inProp, setInProp] = useState(false)

  const handleClick = (index) => {
    setCurrentIndex(index)
  }

  useEffect(() => {
    const query = '*[_type == "testimonials"]'
    const brandsQuery = '*[_type == "brands"]'

    client.fetch(query)
      .then((data) => {
        setTestimonials(data)
      })

      client.fetch(brandsQuery)
      .then((data) => {
        setBrands(data)
      })
  }, [])

  const test = testimonials[currentIndex]

  return (
    <>
      <div className='app__testimonial-header-text'>
      <h2 className='head-text'>Testimonials</h2>
      </div>
      {/* {console.log(testimonials)} */}
      {testimonials?.length && (
        <>
          <motion.div 
           key={currentIndex}
           variants={variants}
           animate={'show'} initial="hide"
           className='app__testimonial-item app__flex'>

            <img src={urlFor(test.imageurl)} alt='testimonial'/>
            <div className='app__testimonial-content'>
              <p className='p-text'>{test.feedback}</p>
              <div>
                <h4 className='bold-text'>{test.name}</h4>
                <h5 className='p-text'>{test.company}</h5>
              </div>
            </div>
          </motion.div>
          

          <div className='app__testimonial-btns app__flex'>
            <div className='app__flex' onClick={() => handleClick(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1)}>
              <HiChevronDoubleLeft />
            </div>
            <div className='app__flex' onClick={() => handleClick(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1)}>
              <HiChevronDoubleRight />
            </div>
              
          </div>
          
        </>
      )}

      <div className='app__testimonial-brands app__flex'>
        {brands.map((brand) => (
          <motion.div
            whileInView={{opacity: [0,1]}}
            transition={{duration: 0.5, type: 'tween'}}
            key={brand._id}
          >
            {console.log(urlFor(brand.imgUrl))}
            <img src={urlFor(brand.imgUrl)} alt={brand.name}/>
          </motion.div>
        ))}
      </div>

    </>
  )
}

export default AppWrap (
  MotionWrap(Testimonial,'app__testimonial'), 
  'testimonial',
  'app__primarybg'
)