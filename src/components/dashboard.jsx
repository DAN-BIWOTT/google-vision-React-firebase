import React from 'react';
import { useState } from 'react';
import "./style/dashboard.scss";
import db, { storage } from '../firebase';
import { ProgressBar } from 'react-bootstrap';
import { useEffect } from 'react';
import https from "https";
import axios from "axios";

export default function Dashboard() {
    const [state , setState] = useState({
        fName : "",
        lName : "",
        email : "",
        event : "",
        imgUrl : ""
    });
    const[progress,setProgress] = useState(0);
    const handleChange = (e) => {
        const {id , value} = e.target
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }


    const [imageAsFile, setImageAsFile] = useState('');
    const [imageAsUrl, setImageAsUrl] = useState(state.imgUrl);

    const googleVision = async (download_url,uniId) =>{
        const data = JSON.stringify({
            image_url: `${download_url}`
          });

          axios({
            method: 'post',
            url: 'https://janicephotography.herokuapp.com/mlphoto',
            headers: { 'Content-Type': 'application/json',
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                        "Accept":"*/*" 
                    },
            data: data
          }).then(function(response){
              console.log(response);
              uploadToFirebaseAfterGoogleVision(download_url,uniId,response.data);
          })
          
        //   const options = {
        //     hostname: 'janicephotography.herokuapp.com',
        //     path: '/mlphoto',
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json',
        //       'Content-Length': data.length,
        //       "Access-Control-Allow-Origin": "*",
        //       "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
        //       "Accept":"*/*"
        //     }
        //   }
        //   const req = https.request(options, res => {
        //     res.on('data', d => {
        //       console.log(d);
        //     //   

        //     })
        //   })
    }
    const handleImageAsFile = (e) => {
        const image = e.target.files[0];
        setImageAsFile(imageFile => (image));
    }
    function guidGenerator() {
        const S4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    
    }
    const handleFireBaseUpload = e => {
        e.preventDefault()
      console.log('start of upload');
      if(imageAsFile === '' ) {
        console.error(`not an image, the image file is a ${typeof(imageAsFile)}`)
      }
      const uploadTask = storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile)
      uploadTask.on('state_changed', 
    (snapShot) => {
        setProgress((snapShot.bytesTransferred / snapShot.totalBytes) * 100);
        console.log('Upload is ' + progress + '% done');
    }, (err) => {
      console.log(err)
    }, () => {
        const uniId = guidGenerator().toString();
      storage.ref('images').child(imageAsFile.name).getDownloadURL()
       .then(fireBaseUrl => {
         setImageAsUrl(prevObject => ({...prevObject, imgUrl: fireBaseUrl}))
         console.log('File available at', fireBaseUrl);
         googleVision(fireBaseUrl,uniId);
                  //
       })
    })
      }
      const uploadToFirebaseAfterGoogleVision=(fireBaseUrl,uniId,event)=>{
          console.log("called");
        db.collection("All_Files").doc(uniId).set({
            file_name: imageAsFile.name.toString(),
            id: uniId,
            download_url: fireBaseUrl.toString(),
            email:state.email,
            fName:state.fName,
            lName:state.lName,
            event:event
        })
            .then(() => {
                console.log("Document successfully written!");
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
      }
     
    return (
        <>
            <div className="wrapper dashbody">
                <div className="inner">
                    <form action="">
                        <h3>Upload Your Work</h3>
                        <div className="form-group">
                            <div className="form-wrapper">
                                <label>First Name</label>
                                <input value={state.fName} onChange={handleChange}  id="fName" type="text" placeholder="Enter First Name" className="form-control" />
                            </div>
                            <div className="form-wrapper">
                                <label>Last Name</label>
                                <input onChange={handleChange} type="text" value={state.lName} id="lName" placeholder="Enter Last Name" className="form-control" />
                            </div>
                        </div>
                        <div className="form-wrapper">
                            <label>Email</label>
                            <input onChange={handleChange} value={state.email} id="email" placeholder="Enter Contact email" className="form-control" />
                        </div>
                        {/* <div className="form-wrapper">
                            <label>Event</label>
                            <input onChange={handleChange} value={state.event} id="event" placeholder="Enter Event in picture" type="text" className="form-control" />
                        </div> */}
                        <div className="form-wrapper">
                            <input onChange={handleImageAsFile} type="file" className="form-control" id="file-control" />
                        </div>
                        <ProgressBar now={progress} label={`${progress}%`} animated now={progress}/>
                        <button onClick={handleFireBaseUpload}>Upload</button>
                    </form>
                </div>
            </div>
        </>
    )
}