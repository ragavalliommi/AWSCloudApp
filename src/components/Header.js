import React, {useState, useEffect} from 'react'; //React hooks usestate and useeffect
//import menuLinksData from './data/menu_links.json';

//create a function component
const Header = () => {

  //1. Declare a state variable
  const [menuLinksData, setmenuLinksData] = useState([])

  //2. Create a side effect - render the page along with this effect
  useEffect(() => {
    //Load the menu data from the API Gateway
    //async function
    loadMenuLinksData();
  }, []);

  //3. Define the async function call
  const loadMenuLinksData = async() =>{
    // Query the API Gateway
    const resp = await fetch('https://prf4yi3o58.execute-api.us-east-1.amazonaws.com/Production/MenuLinks');
    let jsonData = await resp.json();
    //assign the response to state variable
    setmenuLinksData(jsonData);
  }
    return(
        <header id="intro">
          <article className="fullheight">
            <div className="hgroup">
              <h1>Landon Hotel</h1>
              <h2>West London</h2>
              <p><a href="#welcome"><img src="https://landonhotel.com/images/misc/arrow.png" alt="down arrow" /></a></p>
            </div>
          </article>

          <nav id="nav">
            <div className="navbar">
              <div className="brand"><a href="#welcome">Landon <span>Hotel</span></a></div>
              <ul>
                {
                  menuLinksData.map((link) =>
                    <li><a className={`icon ${link.class}`} href={link.href}><span>{link.text}</span></a></li>
                  )
                }
              </ul>
            </div>
          </nav>
        </header>
    );
}

export default Header;