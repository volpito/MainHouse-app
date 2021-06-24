import React, { useEffect } from 'react';

const DeleteEvent = (props) => {
 
            useEffect (() => {
          const fetchDeleteEvent = async () => {
             
          fetch(`https://mainhouseapi.herokuapp.com/events/${props.id}` , {
            method: 'delete',
            headers: {
            'Content-Type': 'application/json',
            },
            }).then((response) => response.json())
              .then((response) => {

                console.log(response)
                }).catch(function() {
                  console.log("error");
            });
          };       
    
          fetchDeleteEvent()
          
          }, [props]);


 
return(<p></p>)
}
export default DeleteEvent;