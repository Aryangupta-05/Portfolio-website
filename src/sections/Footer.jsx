import React from 'react'

const Footer = () => {
    return (
        <section className="c-space pt-7 pb-4 border-t border-black-300 flex justify-between items-center flex-wrap gap-5 mt-50">
            <div className="text-white-500 flex gap-2">
                <p>
                   Terms & Conditions
                </p>
                <p>
                    |
                </p>
                <p>
                    Privacy Policy
                </p>
            </div>
            <div className="flex gap-3">
                <div className="social-icon">
                    <a href="https://www.linkedin.com/in/aryan-gupta-871577240" target="_blank" rel="noopener noreferrer">
                        <img src="/assets/icons8-linkedin.svg" alt="linkedin" className="w-1/2 h-1/2 ml-3" />
                    </a>
                </div>
                <div className="social-icon">
                    <a href="https://github.com/Aryangupta-05" target="_blank" rel="noopener noreferrer">
                        <img src="/assets/github.svg" alt="github" className="w-1/2 h-1/2 ml-3" />
                    </a>
                </div>
                <div className="social-icon">
                    <a href="https://t.me/aryang05" target="_blank" rel="noopener noreferrer">
                        <img src="/assets/telegram.svg" alt="instagram" className="w-1/2 h-1/2 ml-3" />
                    </a>
                </div>
            </div>

            <p className="text-white-500">
                © 2025 Aryan. All rights reserved.
            </p>
        </section>
    )
}
export default Footer
