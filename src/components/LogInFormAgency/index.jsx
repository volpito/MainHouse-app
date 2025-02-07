import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import './style.css';
import { login } from '../redux';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/index'
import logo from '../../assets/images/Mainhouseblack.png'

function LogInFormAgency() {
  const agency = useSelector((state) => state.agency);
  const dispatch = useDispatch();
  const history = useHistory();

  const OnSend = (e) => {
    e.preventDefault();
    const email = document.querySelector('#fmail').value;
    const password = document.querySelector('#fpassword').value;
    const log = { "agency": { "email": email, "password": password } };

    fetch('https://mainhouseapi.herokuapp.com/agencies/sign_in', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(log),
    })
      .then((response) => {
        return response;
      })
      .then((res) =>
        res
          .json()
          .then((json) => ({
            token: res.headers.get("authorization").split(" ")[1],
            json,
          }))
          .then(({ token, json }) => {
            const email = json.token.email;
            const id = json.token.id;
            Cookies.set("agency_id", json.token.id);
            Cookies.set('Bearer_agency', token);
            Cookies.set('email_agency', email);
            dispatch({ type: login(), token, email, id });
          })
      )
    history.push('/mes-immeubles');
  };

  return (
    <>
      <div>
        <div className="containerNavbar">
          <p className="logoContainer">
            <img className="logoLogin" alt="logo" src={logo}></img>
          </p>
        </div>
      </div>
      <div className="LoginContainer">
        <div className="formcontainer">
          <form onSubmit={OnSend} className="signUp signform" >
            <div className="formbg-inner padding-horizontal--48">
              <span className="padding-bottom--15 titleform">Se connecter</span>
              <div className="field">
                <input className="champform" type="email" id="fmail" name="email" placeholder="Email" required />
              </div>
              <div className="field">
                <input className="champform" type="password" id="fpassword" name="password" placeholder="Password" required />
              </div>
              <button type="submit" id="loginButton" className="boutonform">Valider</button>
              <div className="endform">
                <a className="endquestforms" >Pas de compte ? </a>
                <a className="end__link" href="#"><Link to="">Nous contacter</Link></a>
              </div>
            </div>
          </form>
        </div>
      </div>
      <footer className="footerLogin">
        <h3>Besoin d’aide ? Contactez nous à hello@mkdev.com</h3>
        <p className="copyrights">Mk Dev corporation | 2021 © Tous droits réservés</p>
      </footer>
    </>
  );

}
export default LogInFormAgency;
