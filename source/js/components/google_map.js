import React, { Component } from 'react';

/* global google */

export default class GoogleMap extends Component {
  componentDidMount() {
    const location = { lat: 43.722360, lng: 20.687349 };
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 18,
      center: location,
    });

    const Icon = {
      path: 'M8,0C3.400,0,0,3.582,0,8s8,24,8,24s8-19.582,8-24S12.418,0,8,0z M8,12c-2.209,0-4-1.791-4-4   s1.791-4,4-4s4,1.791,4,4S10.209,12,8,12z',
      fillColor: '#ff0000',
      fillOpacity: 0.8,
      strokeColor: '#0f0002',
      strokeWeight: 1,
      labelOrigin: new google.maps.Point(-80, 20),
      anchor: new google.maps.Point(9, 35),
    };

    new google.maps.Marker({
      position: location,
      icon: Icon,
      map,
      animation: google.maps.Animation.DROP,
      label: {
        text: 'Tomislava Andrića Džigija 45',
        color: 'black',
        fontSize: '12px',
      },
    });
  }

  render() {
    return <div id='map' />;
  }
}
