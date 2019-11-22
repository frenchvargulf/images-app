import React from "react";
import '../App.css';

const ImageRenderer = ({handleImageLoad, images, deleteImage, getExifData}) => {
  return (
    <div className="uploader">
      <div className="input">
        <input
          type="file"
          id="file"
          name="file"
          className="inputfile"
          onChange={handleImageLoad}
          accept="image/jpeg"
        />
        <label htmlFor="file">Upload a file</label>
      </div>

      <div className="output">
        <ul id="list">

        {[...new Set(images)].map( image => {

          return (<li key={image.image.name} className="img-box">
            <img src={ image.file } alt={image.file} onLoad={ (e) => {return getExifData(e, image, images)} } />
            <div className="info-box">
              <div className="title">{image.image.name}</div>
              <div> {image.longitude?`Long: ${image.longitude}`:null}</div> 
              <div> {image.longitude?`Lat: ${image.latitude}`:null}</div> 
              <div>Type: {image.image.type}</div>
              <div>Size: {image.image.size}</div>
              <button onClick={ e => deleteImage(e, image)}>Delete</button>
            </div>
           </li>)

        })}</ul>
      </div>
    </div>
  );
}


export default ImageRenderer;
