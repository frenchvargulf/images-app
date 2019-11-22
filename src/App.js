import React, { Component } from "react";
import ImageRenderer from './components/ImageRenderer';
import "./App.css";
import EXIF from "exif-js";
import { getBase, toDecimal } from './HelperFunctions'

class ImagesUploaderApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      files: []
    }
    this.getExifData = this.getExifData.bind(this);
  }

  // Delete image
  deleteImage = ( e, i ) => {
    const deletedImage = i;

    setTimeout( (i) => {
      let imagesList = this.state.images;
      let newImagesList = [];

      imagesList.map( (image) => {
        if (image.image.name !== deletedImage.image.name) {
          newImagesList.push(image);
        }
        return image;
      })
      
      this.setState({
        images: newImagesList
      });

    }, 1000);

  }; 

  // Load image
  handleImageLoad = e => {
    var files = e.target.files;

    if (files.length === 0) {
      return null;
    } 

    Array.from( files ).map( file => {
      if (file.size > 1000000) {
        return null;
      }
      return this.state.images.map( img => {
      if(file.name === img.image.name){
        return null;
      } 
      
      if(file.type !== "image/jpeg"){
        return null;
      } 
        
      return file;
      
    })
 
    })

    this.getImageInfo(files);
  
  };

  // Save info, image to state
  getImageInfo = files1 => {
  
    const getData = (files) => {
      const images = [];
      return Array.from(files).map( file => {
        const file1 = file;
        images.push(file1)
        return getBase(file).then( file => {
            const img1 = images.map( image => {
              return {
                image, 
                file
              }
            })
            this.setState( prevState => ({
              images: [ ...prevState.images, ...img1]
            }))
          }
        )
      })
    }


    getData(files1)

  }

  // Update state for mutations
  updateState = newImg => {
    const images = this.state.images;
    const newImages = images.map( image => {
      if(image.image.name === newImg.image.name) {
        return newImg;
      }
      return image;
    })
    images.concat(newImg);
    this.setState(({
      images: newImages
    }))
  }

  // Get exif data
  getExifData(e, image) {

      EXIF.getData(image.image, () => {
        let latitude = EXIF.getTag(image.image, "GPSLatitude");
        let longitude = EXIF.getTag(image.image, "GPSLongitude");

        if(latitude === undefined) {
          return;
        }
  
        const newImg = img => {
          return {
            ...img, 
            latitude: toDecimal(latitude), 
            longitude: toDecimal(longitude)
          };
        }
        
        const newImageImage = newImg(image);
        this.updateState(newImageImage);
      })
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <header><h1>Image Uploader</h1></header>
          <div className="images-cnt">
            <ImageRenderer 
              images={this.state.images}
              files={this.state.files}
              handleImageLoad={this.handleImageLoad} 
              deleteImage={this.deleteImage} 
              getExifData={this.getExifData}
              />
          </div>
        </div>
      </div>
    );
  }

}

export default ImagesUploaderApp;
