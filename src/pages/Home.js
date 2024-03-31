import React from 'react';
import offices_image from '../images/New_Offices.jpg';
import atm from '../images/ATM.jpg';

function Home() {
  return (
    <>
      <div className="Home-Image-Container">
        <img src={offices_image} alt='offices' className='office-image'/>
        <div>
        <h1>New office!</h1>
        <p className="offices-ptag">Step into our financial hub, where expertise meets convenience!
        <br/>
        Our offices are your gateway to tailored solutions and personalized service.
        <br/> 
        Whether you're stopping by for a quick transaction or seeking expert advice, our team is here to guide you on your financial journey.
        <br/> 
        At Ezy Banking we welcome you to a space designed with you in mind, where every visit is an opportunity to enhance your banking experience.
        </p>
        </div>
      </div>

      <div className="home-atm-image-container">
        <img src={atm} alt='atm' className='atm'/>
        <div>
        <h1>New office!</h1>
        <p className="offices-ptag">Step into our financial hub, where expertise meets convenience!
        <br/>
        Our offices are your gateway to tailored solutions and personalized service.
        <br/> 
        Whether you're stopping by for a quick transaction or seeking expert advice, our team is here to guide you on your financial journey.
        <br/> 
        At Ezy Banking we welcome you to a space designed with you in mind, where every visit is an opportunity to enhance your banking experience.
        </p>
        </div>
      </div>
    </>
  )
}

export default Home;