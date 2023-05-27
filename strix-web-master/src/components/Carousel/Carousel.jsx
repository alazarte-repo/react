import React from 'react';
import { Carousel as BsCarousel } from 'react-bootstrap';
import imageOne from 'images/Onboarding1.png';
import imageTwo from 'images/Onboarding2.png';
import imageThree from 'images/Onboarding3.png';
import imageFour from 'images/Onboarding4.png';
import imageFive from 'images/Onboarding5.png';

import './Carousel.scss';


function Carousel() {
  return (
    <BsCarousel
      bsClass="carousel-login carousel"
      interval={null}
    >
      <BsCarousel.Item className="carousel-login-item">
        <img src={imageOne} alt="" />
        <BsCarousel.Caption>
          <h1> Bienvenido a Strix </h1>
          <span>
            Aprovecha todas las funcionalidades de Strix bajandote nuestra app.
          </span>
        </BsCarousel.Caption>
      </BsCarousel.Item>
      <BsCarousel.Item className="carousel-login-item">
        <img src={imageTwo} alt="" />
        <BsCarousel.Caption>
          <h1> Strix Auto </h1>
          <span>
            Strix en tu auto te va a permitir saber su ubicación,
            a que velocidad esta circulando, configurar una zona segura y
            activar el modo estacionado para estar tranquilo que está
            donde lo dejaste.
          </span>
        </BsCarousel.Caption>
      </BsCarousel.Item>
      <BsCarousel.Item className="carousel-login-item">
        <img src={imageFour} alt="" />
        <BsCarousel.Caption>
          <h1> Strix Cosas </h1>
          <span>
            Strix en tus cosas te permite conocer la ubicación de todo lo tuyo.
            A través de un equipo configurado por vos podes conocer el seguimiento lo que
            necesites, podría ser la mochila de tu hijo, tú bicicleta o tu cartera.
          </span>
        </BsCarousel.Caption>
      </BsCarousel.Item>
      <BsCarousel.Item className="carousel-login-item">
        <img src={imageThree} alt="" />
        <BsCarousel.Caption>
          <h1> Strix Casa </h1>
          <span>
            Strix en tu casa te permite activar o desactivar la alarma
            de tu casa con un solo click. Vas a poder programar su armado y
            conocer el registro de alarmas.
          </span>
        </BsCarousel.Caption>
      </BsCarousel.Item>
      <BsCarousel.Item className="carousel-login-item">
        <img src={imageFive} alt="" />
        <BsCarousel.Caption>
          <h1> ¿Todavía no contrataste un producto Strix? </h1>
          <span>
            Hacé <a href="https://strix.com.ar/integral/" target="_blank" rel="noopener noreferrer"> click acá </a>
            para que nos pongamos en contacto con vos.
          </span>
        </BsCarousel.Caption>
      </BsCarousel.Item>
    </BsCarousel>
  );
}


export default Carousel;
