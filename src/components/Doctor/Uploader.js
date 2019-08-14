import React from 'react';
import axios from 'axios'
import DefaultImg from '../layout/images/docImg.jpg'

// base api url being used
const API_URL = "http://localhost:4000";

class Uploader extends React.Component {
  constructor() {
    super();

    this.state ={
      multerImage: DefaultImg
    };

   
  }

  uploadImage(e){
    
    let imageFormObj = new FormData();

      imageFormObj.append("imageName", "multer-image-" + Date.now());
      imageFormObj.append("imageData", e.target.files[0]);
      // stores a readable instance of 
      // the image being uploaded using multer
      this.setState({
        multerImage: URL.createObjectURL(e.target.files[0])
      });

      axios.post(`${API_URL}/image/uploadmulter`, imageFormObj)
        .then((data) => {
          if (data.data.success) {
            alert("Image has been successfully uploaded using multer");
            
          }
        })
        .catch((err) => {
          alert("Error while uploading image using multer");
          this.setState({
            multerImage: DefaultImg
          })
        });
  }



  render() {
    
    return (
      <div className="" style={{color:'Black'}}>
        <h3 className="tc">Doctor</h3>
            <input type="file" className="process__upload-btn" onChange={(e) => this.uploadImage(e)} />
            <img src={this.state.multerImage} alt="upload-image" className="process__image" style={{position:'relative'}} />
      </div>
    );
  }
 }

export default Uploader;