import { css, unsafeCSS } from 'lit-element';
import * as foundations from '@bbva-web-components/bbva-foundations-styles';

export default css`
:box {
  background: linear-gradient(to ringht, #1d3557, #457b9d);
  color:white;
  padding: 20px;
  border-radius:12px;
  box-shadow:0 4px 8px rgba(239, 233, 233, 0.9);
}

.name{
color: #ffcc00;
font-weight:bold;
}
:host {
    display: block;
    padding: 1rem;
    font-family: 'Roboto', sans-serif;
  }

  p {
    font-size: 1.2rem;
    color: #rgba(238, 233, 233, 0.99) ;
  }

  .card {
    background: linear-gradient(135deg, #1e1e2f, #2e2e4f);
    border-radius: 16px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.25);
    padding: 2rem;
    color: white;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 25px rgba(238, 233, 233, 0.99);
  }

  button {
    background: #ffcc00;
    border: none;
    border-radius: 12px;
    padding: 0.8rem 1.5rem;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.3s ease;
  }

  button:hover {
    background: #ffaa00;
}
    .card img {
    border-rarius:15px;
    max-width:100%
    height:auto;
    box-shadow:0 5px 15px rgba(255,255,255,0.2);
    }
    .footer {
  margin-top: 40px;
  padding: 20px;
  text-align: center;
  background: linear-gradient(90deg, #1a1a2e, #16213e);
  border-radius: 10px;
  font-size: 14px;
  color: #ccc;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.3);
}

.footer a {
  color: #03dac5;
  text-decoration: none;
}

.footer a:hover {
  text-decoration: underline;
}
`;
