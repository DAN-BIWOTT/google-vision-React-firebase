import React from 'react';

export default function Photograph(props){
    return(<>
        <div className="col-sm-6 col-md-4 col-lg-4">
                <div className="portfolio-item">
                  <div className="hover-bg">
                    {" "}
                    <a
                      href="img/portfolio/01-large.jpg"
                      title="Project Title"
                      data-lightbox-gallery="gallery1"
                    >
                      <div className="hover-text">
                        <h4>{props.event}</h4>
                        <p>{props.fName}</p>
                      </div>
                      <img
                        src={props.imgUrl}
                        className="img-responsive"
                        alt="Project Title"
                      />{" "}
                    </a>{" "}
                  </div>
                </div>
              </div>
        </>);
}