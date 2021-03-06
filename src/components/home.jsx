import React, { Component } from 'react';
import homeImage from './style/home.jpeg';

export class home extends Component {
  render() {
    return (
        <div id="home">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-6"> <img src={homeImage} className="img-responsive" alt="home image"/> </div>
            <div className="col-xs-12 col-md-6">
              <div className="home-text">
                <h2>LEVEL UP CREATIVITY</h2>
                <p>{this.props.data ? this.props.data.paragraph : 'loading...'}</p>
                <h3>Why Work With Us?</h3>
                <div className="list-style">
                  <div className="col-lg-6 col-sm-6 col-xs-12">
                    <ul>
                      {this.props.data ? this.props.data.Why.map((d, i) => <li  key={`${d}-${i}`}>{d}</li>) : 'loading'}
                    </ul>
                  </div>
                  <div className="col-lg-6 col-sm-6 col-xs-12">
                    <ul>
                    {this.props.data ? this.props.data.Why2.map((d, i) => <li  key={`${d}-${i}`}> {d}</li>) : 'loading'}

                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default home
