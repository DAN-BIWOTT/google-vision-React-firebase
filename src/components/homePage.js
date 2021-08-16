import React, { Component } from 'react'
import Features from './features';
import Home from './home';
import Gallery from './gallery';
import Contact from './contact';
import JsonData from '../data/data.json';

export class HomePage extends Component {
  state = {
    landingPageData: {},
  }
  getlandingPageData() {
    this.setState({landingPageData : JsonData})
  }

  componentDidMount() {
    this.getlandingPageData();
  }

  render() {
    return (
      <div>
        <Home data={this.state.landingPageData.Home} />
        <Gallery />
        <Features data={this.state.landingPageData.Features} /> 
      </div>
    )
  }
}
