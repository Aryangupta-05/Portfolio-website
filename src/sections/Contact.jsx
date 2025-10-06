import React, {useRef, useState} from 'react'
import emailjs from '@emailjs/browser'
import { useMediaQuery } from 'react-responsive';


const Contact = () => {

    const formRef = useRef();

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        name: '',
        email: '',
        message: ''
    })

    const isSmallScreen = useMediaQuery({ query: '(max-width: 1024px)' })

    const handleChange = ({target: {name, value}}) => {
        setForm({...form, [name]: value})
    }

    // service_n3ls4ma


    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try{
            await emailjs.send(
                'service_fov0q6d',
                'template_n4zjvin',
                {
                    from_name: form.name,
                    to_name: 'Aryan',
                    from_email: form.email,
                    to_email: 'aryangupta050903@gmail.com',
                    message: form.message
                },
                'pElwLKLKvr4CVxWSi'
            )
            setLoading(false);

            alert('Message Sent Successfully');
            setForm({
                name: '',
                email: '',
                message: ''
            });
        }catch(error){
            setLoading(false);
            console.log(error);
            alert('Message Failed to Send');
        }
    }

    return (
        <section className="c-space my-20" id="contact">
            <p className="head-text">
                Contact Me
            </p>
            <div className="relative min-h-screen flex items-center justify-center flex-col">
                {!isSmallScreen && (
                    <img
                        src="/assets/terminal.png"
                        alt="terminal background"
                        className="absolute inset-0 min-h-screen"
                    />
                )}
                <div className="contact-container">
                        <p className="text-lg text-white-600 mt-20">
                            Whether you're a recruiter looking to hire, or a developer looking to collaborate, I'm always happy to chat.
                        </p>

                        <form ref={formRef} onSubmit={handleSubmit} className="mt-7 flex flex-col space-y-7">

                            <label className="space-y-3">
                                <span className="field-label">Full Name</span>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                    className="field-input"
                                    placeholder="Your Full Name"
                                />
                            </label>
                            <label className="space-y-3">
                                <span className="field-label">Email</span>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    className="field-input"
                                    placeholder="Your Email"
                                />
                            </label>
                            <label className="space-y-3">
                                <span className="field-label">Your Message</span>
                                <textarea
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    className="field-input"
                                    placeholder="Hi, Your website looks good, so I am sending you the job offer!"
                                />
                            </label>

                            <button className="field-btn" type="submit" disabled={loading}>
                                {loading ? 'Sending...' : 'Send Message'}
                                <img  src="/assets/arrow-up.png" alt="arrow-up" className="field-btn_arrow"/>
                            </button>
                        </form>
                        <div className="mt-20">

                        </div>
                    </div>
            </div>

        </section>
    )
}
export default Contact
