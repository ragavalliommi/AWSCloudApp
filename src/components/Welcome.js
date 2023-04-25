import React, {useState, useEffect} from 'react';
//import welcomeImagesData from './data/welcome_images.json';

const Welcome = () => {
  const [welcomeImagesData, setWelcomeImagesData] = useState([]);

  useEffect(() => {
    loadWelcomeImagesData();
  }, []);

  const loadWelcomeImagesData = async() => {
    const resp = await fetch('https://prf4yi3o58.execute-api.us-east-1.amazonaws.com/Production/WelcomePages');
    let jsonData = await resp.json();

    setWelcomeImagesData(jsonData);
  };
    return(
          <div className="scene" id="welcome">
            <article className="content">
              <div className="gallery">
                {
                  welcomeImagesData.map((picture) =>
                    <img src={picture.link} alt={picture.desc} />
                  )
                }
              </div>
              <h1>Welcome to the Landon&nbsp;Hotel</h1>
              <p>The original Landon perseveres after 50 years in the heart of West London. The West End neighborhood has something for everyone—from theater to dining to historic sights. And the not-to-miss Rooftop Cafe is a great place for travelers and locals to engage over drinks, food, and good&nbsp;conversation. &nbsp;To learn more about the Landon Hotel in the West End, browse our website and <a href="files/landon_information_sheet_London.pdf">download our handy information sheet</a>.</p>
            </article>
          </div>
    );
}

export default Welcome;