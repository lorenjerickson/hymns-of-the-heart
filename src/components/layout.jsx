import React from 'react'

import '../assets/scss/main.scss'
import Header from './Header'
import Menu from './Menu'
import Contact from './Contact'
import Footer from './Footer'
import { Helmet } from 'react-helmet/es/Helmet'

class Layout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isMenuVisible: false,
            loading: 'is-loading'
        }
        this.handleToggleMenu = this.handleToggleMenu.bind(this)
    }

    componentDidMount() {
        this.timeoutId = setTimeout(() => {
            this.setState({ loading: '' });
        }, 100);
    }

    componentWillUnmount() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
    }

    handleToggleMenu() {
        this.setState({
            isMenuVisible: !this.state.isMenuVisible
        })
    }

    render() {
        const { children } = this.props

        return (
            <div className={`body ${this.state.loading} ${this.state.isMenuVisible ? 'is-menu-visible' : ''}`}>
                <Helmet>
                    <link href="https://fonts.googleapis.com/css2?family=Allura&display=swap" rel="stylesheet" />
                    <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
{/* 

                    <script>
                        if (window.netlifyIdentity) {
                            window.netlifyIdentity.on("init", user => {
                                if (!user) {
                                    window.netlifyIdentity.on("login", () => {
                                        document.location.href = "/admin/";
                                    });
                                }
                            })
                        }
                    </script> */}
                </Helmet>
                <div id="wrapper">
                    <Header onToggleMenu={this.handleToggleMenu} />
                    {children}
                    <Contact />
                    <Footer />
                </div>
                <Menu onToggleMenu={this.handleToggleMenu} />

            </div>
        )
    }
}

export default Layout
