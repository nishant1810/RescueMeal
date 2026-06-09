import React from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import L
from "leaflet";

/*
========================================
LEAFLET CSS
========================================
*/

import "leaflet/dist/leaflet.css";

/*
========================================
MARKER ICONS
========================================
*/

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";

import markerIcon from "leaflet/dist/images/marker-icon.png";

import markerShadow from "leaflet/dist/images/marker-shadow.png";

/*
========================================
FIX DEFAULT ICON
========================================
*/

delete L.Icon.Default.prototype
  ._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    markerIcon2x,

  iconUrl:
    markerIcon,

  shadowUrl:
    markerShadow,
});

const FoodMap = ({
  lat,
  lng,
}) => {

  /*
  ========================================
  VALIDATION
  ========================================
  */

  if (
    !lat ||
    !lng
  ) {

    return (
      <div
        className="
          h-[400px]
          flex
          justify-center
          items-center
          bg-gray-100
          rounded-2xl
        "
      >
        Location not available
      </div>
    );
  }

  return (
    <div
      className="
        h-[400px]
        w-full
        rounded-2xl
        overflow-hidden
      "
    >
      <MapContainer
        center={[
          Number(lat),
          Number(lng),
        ]}

        zoom={13}

        scrollWheelZoom={
          true
        }

        style={{
          height: "100%",
          width: "100%",
        }}
      >
        {/* ========================================
            MAP TILE
        ======================================== */}

        <TileLayer
          attribution='&copy; OpenStreetMap contributors'

          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* ========================================
            MARKER
        ======================================== */}

        <Marker
          position={[
            Number(lat),
            Number(lng),
          ]}
        >
          <Popup>
            Food Pickup Location
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default FoodMap;