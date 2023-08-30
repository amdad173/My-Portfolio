import React, { useRef, useState } from 'react'
import {FaMobileAlt} from "react-icons/fa"
import {MdLocationOn} from "react-icons/md"
import {SiMinutemailer} from "react-icons/si"
import emailjs from '@emailjs/browser';
import "../../styles/contact.css"

const Contact = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [verify, setVerify] = useState("")
    const formRef  = useRef()

    // using email js to recive email(amt002600)
    const sendEmail = (e) => {
        e.preventDefault();
        if(!name || !email || !message) return;

        setVerify("Sending...")
        emailjs.sendForm(process.env.REACT_APP_YOUR_SERVICE_ID, process.env.REACT_APP_YOUR_TEMPLATE_ID, formRef.current, process.env.REACT_APP_YOUR_PUBLIC_KEY)
          .then((result) => {
            //   console.log(result.text);
              setName("")
              setEmail("")
              setMessage("")
              setVerify("Thank You")
          }, (error) => {
              setVerify("Please Resend")
            //   console.log(error.text);
          });
      };

  return (
    <div id='contact' className='container'>
        <h2>CONTACT ME</h2>
        <div className='contact'>
            <div className='contact-info'>
                <div>
                    <MdLocationOn style={{fontSize: "25px", marginBottom: "6px"}}/>
                    <h4>Address</h4>
                    <p>Chittagong, Bangladesh</p>
                </div>
                <div>
                    <FaMobileAlt style={{fontSize: "25px", marginBottom: "6px"}}/>
                    <h4>Mobile</h4>
                    <p>01843920041</p>
                </div>
                <div>
                    <SiMinutemailer style={{fontSize: "25px", marginBottom: "6px"}}/>
                    <h4>Gmail</h4>
                    <p>amdadulhaque0041@gmail.com</p>
                </div>
            </div>
            <form className='contact-form' ref={formRef} onSubmit={sendEmail}>
                <h3>Get in Touch</h3>
                <input 
                    name="name"
                    type="text" 
                    placeholder='Name'
                    value={name}
                    onChange={(e)=> setName(e.target.value)} 
                    required
                />
                <input
                    name="email" 
                    type="email" 
                    placeholder='Email'
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                    required 
                />
                <textarea  
                    name="message"
                    placeholder='Message'
                    value={message}
                    onChange={(e)=> setMessage(e.target.value)} 
                    required
                />
                <div>
                    <p>{verify}</p>
                    <button type='submit'>SEND MESSAGE</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Contact