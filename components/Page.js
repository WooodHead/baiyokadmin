import React, { Component } from 'react'
import Footer from './Footer'
import Header from './Header'
import Meta from './Meta'
// import styled from 'styled-component'

class Page extends Component {
  render() {
    return (
      <div>
        <Meta />
        <Header />
        <div style={{ marginTop: '60px' }}>{this.props.children}</div>
        <Footer />
      </div>
    )
  }
}

export default Page
