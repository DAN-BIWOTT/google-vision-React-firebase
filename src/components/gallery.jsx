import React, { Component } from "react";
import { useState } from "react";
import Photograph from "./photograph";
import { GetAllPhotographs } from './db/db_functions.js';

export default function Gallery(){
  const callBackendVision = async () => {
    const response = await fetch('/MLphoto');
    const body = await response.json();
    console.log(body);
    if (response.status !== 200) {
      throw Error(body.message) 
    }
  };
  callBackendVision();
    const { docs } = GetAllPhotographs('All_Files');
    console.log(docs);
    return (
      <div id="portfolio" className="text-center">
        <div className="container">
          <div className="section-title">
            <h2>Gallery</h2>
            <p>
              Some of the popular works by our photographers.
            </p>
          </div>
          <div className="row">
            <div className="portfolio-items">
              {docs && docs.map(docs=>(
              <Photograph
                key = {docs.id}
                imgUrl = {docs.download_url}
                event = {docs.event}
                fName = {docs.fName}
                lName = {docs.lName}
              />
              ))}
             </div>
          </div>
        </div>
      </div>
    );
  }
