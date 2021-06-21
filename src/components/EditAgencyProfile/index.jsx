import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './style.css';
import Cookies from 'js-cookie';
import { IoMdSearch } from "react-icons/io";
import AgencyProfileRight from '../AgencyProfileRight/index';

const EditAgencyProfile = () => {
  const agency = useSelector((state) => state.agency);
  const [profile, setProfile] = useState({});
  const id = useSelector(state => state.agency.id);
  const bearer = useSelector(token => token.bearer)

  useEffect(() => {
    document.getElementsByClassName('aside-right')[0].style.display = "block";
    const fetchProfile = () => {
      fetch(`https://mainhouseapi.herokuapp.com/agencies/${id}`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('Bearer_agency')}`
        },
      }).then((response) => response.json())
        .then((response) => {
          console.log(response)
          setProfile(response);
        }).catch(function () {
          console.log("error");
        });

    };
    fetchProfile()
    console.log(profile.name)
  }, []);

  const OnSend = (e) => {
    e.preventDefault();
    var name = profile.name;
    var siren = profile.siren;
    var adress = profile.adress;
    var zipcode = profile.zipcode;
    var city = profile.city;
    var email = profile.email;
    var phone_number = profile.phone_number;
    if (document.querySelector('#name').value !== "") {
      name = document.querySelector('#name').value;
    }
    if (document.querySelector('#siren').value !== "") {
      siren = document.querySelector('#siren').value;
    }
    if (document.querySelector('#adress').value !== "") {
      adress = document.querySelector('#adress').value;
    }
    if (document.querySelector('#zipcode').value !== "") {
      zipcode = document.querySelector('#zipcode').value;
    }
    if (document.querySelector('#city').value !== "") {
      city = document.querySelector('#city').value;
    }
    if (document.querySelector('#email').value !== "") {
      email = document.querySelector('#email').value;
    }
    if (document.querySelector('#phone_number').value !== "") {
      phone_number = document.querySelector('#phone_number').value;
    }

    const infos = { "agency": { "name": name, "siren": siren, "adress": adress, "zipcode": zipcode, "city": city, "email": email, "phone_number": phone_number } };
    fetch(`https://mainhouseapi.herokuapp.com/agencies/${id}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('Bearer_agency')}`
      },
      body: JSON.stringify(infos),
    }).then((response) => response.json())
    .then((response) => {
      setProfile(response);
      console.log(response)
      setProfile(response);
    }).catch(function () {
      console.log("error");
    });


  }

  return (
<>
    <main className="main">
      <div className="wrap">
        <div className="headprofile">
          <p type="text" className="left-head-profile">Bonjour {profile.name}</p>
        </div>
      </div>
      <div className="editform">
        <form onSubmit={OnSend}>
          <div className="input-style-long">
            <label className="label">Nom de l'agence</label>
            <input className="input--style-4" type="text" name="name" id="name" placeholder={profile.name} />
          </div>
          <div className="input-style-long">
            <label className="label">N° de Siret</label>
            <input className="input--style-4" type="text" name="siren" id="siren" placeholder={profile.siren} />
          </div>
          <div className="input-style-long">
            <label className="label">Adresse</label>
            <input className="input--style-4" type="text" name="adress" id="adress" placeholder={profile.adress} />
          </div>
          <div className="input-style-long">
            <label className="label">Code postal</label>
            <input className="input--style-4" type="text" name="zipcode" id="zipcode" placeholder={profile.zipcode} />
          </div>
          <div className="input-style-long">
            <label className="label">Ville</label>
            <input className="input--style-4" type="text" name="city" id="city" placeholder={profile.city} />
          </div>
          <div className="input-style-long">
            <label className="label">Email</label>
            <input className="input--style-4" type="text" name="email" id="email" placeholder={profile.email} />
          </div>
          <div className="input-style-long">
            <label className="label">Téléphone</label>
            <input className="input--style-4" type="text" name="phone_number" id="phone_number" placeholder={profile.phone_number} />
          </div>
          <button type="submit" className="btcreateform">Modifier</button>
        </form>
      </div>
    </main>
        <aside className="aside-right">
        <AgencyProfileRight />
  </aside>
  </>
  );
};

export default EditAgencyProfile;
