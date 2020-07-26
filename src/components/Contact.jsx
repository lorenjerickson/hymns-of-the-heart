import React from 'react'

const Contact = () => (
    <section id="contact">
        <div className="inner">
            <section>
                <form method="post" action="#">
                    <div className="field half first">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" />
                    </div>
                    <div className="field half">
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" id="email" />
                    </div>
                    <div className="field">
                        <label htmlFor="message">Message</label>
                        <textarea name="message" id="message" rows="6" />
                    </div>
                    <ul className="actions">
                        <li><input type="submit" value="Send Message" className="special" /></li>
                        <li><input type="reset" value="Clear" /></li>
                    </ul>
                </form>
            </section>
            <section className="split">
                <section>
                    <p>All works on this site are licensed freely for use at home, in church services, or in any non-commercial setting. They may not be redistributed, included in compilations, or sold for any other purpose without explicit written permission from yours truly.</p>

                </section>
                <section>
                    <p>If you are interested in other uses of my work please drop me a note using the feedback form.</p>
                </section>
            </section>
        </div>
    </section>
)

export default Contact
