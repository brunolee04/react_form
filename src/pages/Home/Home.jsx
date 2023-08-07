import { useState } from 'react'
import './Carousel.css'
import './Bootstrap.css'

import './Home.css'

export default function Home(){
    return (
  
        <div className="content">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mr-auto">
              <div className="mb-5">
                <h3 className="text-white mb-4"><img src="https://www.maresbrasil.com.br/image/catalog/sistema/logo-mares.png"/></h3>
                <p className="text-white">Participe do nosso <span className='redSpan'>sorteio</span> e concorra a produtos Mares</p>
              </div>
              <div className="row">
                <div className="col-md-6">
                    
                </div>
                <div className="col-md-6">
                </div>
              </div>
            </div>
    
            <div className="col-lg-6">
              <div className="box">
                <h3 className="heading">Send us a message</h3>
                <form className="mb-5" method="post" id="contactForm" name="contactForm">
                  <div className="row">
                    
                    <div className="col-md-12 form-group">
                      <label for="name" className="col-form-label">Name</label>
                      <input type="text" className="form-control" name="name" id="name"/>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 form-group">
                      <label for="email" className="col-form-label">Email</label>
                      <input type="text" className="form-control" name="email" id="email"/>
                    </div>
                  </div>
    
                  <div className="row mb-3">
                    <div className="col-md-12 form-group">
                      <label for="message" className="col-form-label">Message</label>
                      <textarea className="form-control" name="message" id="message" cols="30" rows="7"></textarea>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <input type="submit" value="Send Message" className="btn btn-block btn-danger rounded-0 py-2 px-4"/>
                      <span className="submitting"></span>
                    </div>
                  </div>
                </form>
    
                <div id="form-message-warning mt-4"></div> 
                <div id="form-message-success">
                  Your message was sent, thank you!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}