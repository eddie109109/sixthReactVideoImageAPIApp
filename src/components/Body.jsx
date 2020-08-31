import React, {useState, useEffect} from 'react';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';

import API_KEY from "../secret.js";




function Body() {

  const [videos, setVideos] = useState([]);
  const [images, setImages] = useState([]);
  const [input, setInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  function handleChange(e) {
    const userInput = e.target.value
    setInput(userInput);
  }

  // async function handleClick(e) {
  //   e.preventDefault();
  //   const userInput = input; // we get the userInput from the handleChange function because of setInput function
  //   // console.log("user input is ", userInput);
  //   const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${userInput}&image_type=photo`;
  //   const request = await fetch(URL);
  //   setIsLoading(true);
  //   const response = await request.json();
  //
  //   // console.log("response is", response);
  //   const {total, totalHits, hits} = response; // deconstruct the json object into 3 fields
  //   if (total == 0) {
  //     setIsLoading(false);
  //     setImage("");
  //     setErrorMessage("Please enter a valid keyword");
  //     // setIsLoading(false);
  //   } else {
  //
  //     // console.log(response.hits[0].largeImageURL);
  //     setImage(response.hits[0].largeImageURL);
  //     setErrorMessage("");
  //     setIsLoading(false);
  //     // setIsLoading(false);
  //   }
  // }

  function Image(props) {
    return(
      <div className="Image">
      <a href={props.image}><img src= {props.image} width= "200" height= "200" alt="" key= {props.id} /></a>
      </div>
    );
  }

  function Video(props) {
    return (
      <div>
      <video width="320" height="240" controls >
      <source src={props.video} type="video/mp4" alt="video"/>
      <source src={props.video} type="video/ogg" alt="video"/>
      Your browser does not support the video tag.
      </video>
      </div>
    );

  }

  function addVideoLink(link) {
    setVideos(preLinks => {
      return [...preLinks,link];
    })
  }

  function addLink(link) {
    setImages(preLinks => {
      return [...preLinks,link];
    })
  }

  async function handleClickVideo(e) {
    e.preventDefault();
    const userInput = input; // we get the userInput from the handleChange function because of setInput function
    const URL = `https://pixabay.com/api/videos/?key=${API_KEY}&q=${userInput}`;
    // const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${userInput}&image_type=photo`;

    try {
      setImages([]);
      setVideos([]);
      setIsLoading(true);
      const data = await axios.get(URL).then(res => {

        const arrayLength = (res.data.hits).length;
        console.log(res.data.hits[0].videos);
        // console.log(res.data.hits[i].videos.large.url);
        if (arrayLength ==0) {
          setErrorMessage("Please enter a valid keyword");
        } else {
          setErrorMessage("");
        }

        for (var i =0; i < arrayLength; i++) {
          const pageURL = res.data.hits[i].videos.tiny.url;
          {/* const imgLink = res.data.hits[i].largeImageURL;*/}

          {/* addLink(imgLink);*/}
          addVideoLink(pageURL);
        }
      // setErrorMessage("");
      setIsLoading(false);

    });
  }catch (err) {
    setErrorMessage("Please enter a valid keyword");
    setIsLoading(false);
    }
  }

  async function handleClickImage(e) {
    e.preventDefault();
    const userInput = input; // we get the userInput from the handleChange function because of setInput function
    const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${userInput}&image_type=photo`;

    try {
      setImages([]);
      setVideos([]);
      setIsLoading(true);
      const data = await axios.get(URL).then(res => {

        const arrayLength = (res.data.hits).length;
        // console.log(res.data.hits[i].videos.large.url);
        if (arrayLength ==0) {
          setErrorMessage("Please enter a valid keyword");
        } else {
          setErrorMessage("");
        }

        for (var i =0; i < arrayLength; i++) {
          const imgLink = res.data.hits[i].largeImageURL;

          addLink(imgLink);
        }
      setIsLoading(false);

    });
  }catch (err) {
    setErrorMessage("Please enter a valid keyword");
    setIsLoading(false);
    }
  }




  return (
      <div className = "bodyWrapper">
      <form>
        <input onChange={handleChange} type="text" name="good" className = "searchInput" required="" placeholder= "Enter a keyword..." ></input>
        <button onClick={handleClickImage} type="submit" className ="searchButton">Search For Images</button>
        <button onClick={handleClickVideo} type="submit" className ="searchButton">Search For Videos</button>
      </form>
      <div className="imageParent">

      {videos.length > 0? videos.map((video, index) =>{
        return (<Video key={index} video={video}/>);
      }) : null}
      {images.length > 0? images.map((img, index) =>{
        return (<Image key={index} image={img}/>);
      }) : null}
      </div>
      <h3>{errorMessage}</h3>
      {isLoading ? <Spinner animation="border" variant="primary" />: null }  {/*if its is loading use the spinner from react bootstrap*/}
      </div>
  );
}

// {images.length > 0 ? images.map((createImage,index) =>{
//   key: index
// }) : null}
// setImages(images.length > 0 ?images.map((img,index) =>
//    <CreateImage key={index} image = {img} />
// ) :null);


export default Body;
