import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
function SomethingWentWrong() {
  return (
    <>  
        <div className="main-wrapper">
            <div className="wrapper">
                <div className="gear">
                    <span style={{ '--i': 1 }}></span>
                    <span style={{ '--i': 2 }}></span>
                    <span style={{ '--i': 3 }}></span>
                    <span style={{ '--i': 4 }}></span>
                    <span style={{ '--i': 5 }}></span>
                    <span style={{ '--i': 6 }}></span>
                </div>
            </div>
            <div className="wrapper wrapper2">
                <div className="gear">
                    <span style={{ '--i': 1 }}></span>
                    <span style={{ '--i': 2 }}></span>
                    <span style={{ '--i': 3 }}></span>
                    <span style={{ '--i': 4 }}></span>
                    <span style={{ '--i': 5 }}></span>
                    <span style={{ '--i': 6 }}></span>
                </div>
            </div>
        </div>

        <div className='default-text-error-page'>
        <h1 className='default-text'>Something went wrong...</h1>
        <h3 className='default-text'>We will be working on a fix asap! <FontAwesomeIcon icon={faScrewdriverWrench} /> </h3>
        </div>
    </>
  )
}

export default SomethingWentWrong;