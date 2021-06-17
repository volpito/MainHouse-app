import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import './style.css';
import { login_owner } from '../redux';


function LogInFormOwner  () {
  const owner = useSelector((state) => state.owner);
  const dispatch = useDispatch();
  const history = useHistory();

      const OnSend = (e) => {
        e.preventDefault();
          const email = document.querySelector('#fmail').value;
          const password = document.querySelector('#fpassword').value;
          
            const log = {"owner": {"email": email, "password": password}};
            fetch('https://mainhouseapi.herokuapp.com/owners/sign_in', {
              method: 'post',
              headers: {
                'Content-Type': 'application/json', 
              },
              
          
              body: JSON.stringify(log),
            })
            .then((response) => {
              
              console.log(response)
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
                  console.log(token)
                  console.log(json)
                  const email = json.token.email;
                  const id = json.token.id; 
                  Cookies.set("owner_id", json.token.id);
                  Cookies.set("building_id", json.token.building_id);
                  Cookies.set('Bearer_owner', token);
                  Cookies.set('email_owner', email);
                  dispatch({ type: login_owner(), token, email, id });
                })
            )
            
        };
          useEffect(() => {
            
            if (owner.id !== (undefined || null)) {
              history.push('/');
            }
          }, [owner]);

    return (

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
              <a className="end__link" href="#">Inscrivez-vous</a>
            </div>
          </div>
        </form>
    </div>
    );
    
}
export default LogInFormOwner;
