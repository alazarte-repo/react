import React from 'react';
import { Col, Row, Grid } from 'react-bootstrap';
import './Footer.scss';


function Footer() {
  return (
    <Grid fluid>
      <Row>
        <Col className="no-padding" md={12}>
          <footer className="strix-dashboard-footer">
            <p>
              2017 © LO/JACK
              | <a href="https://www.strix.com.ar/politicas" target="_blank" rel="noopener noreferrer">Política de privacidad </a>
              | <a href="https://www.strix.com.ar/legales" target="_blank" rel="noopener noreferrer">Legales </a>
              | <a href="https://www.consumidor.gov.ar" target="_blank" rel="noopener noreferrer">Dirección General de Defensa y Protección al Consumidor</a>
            </p>
          </footer>
        </Col>
      </Row>
    </Grid>
  );
}


export default Footer;
