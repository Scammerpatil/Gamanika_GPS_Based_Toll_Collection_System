"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";

const AddLocationPage = () => {
  const [geoFence, setGeoFence] = useState({
    lat: 0,
    lng: 0,
    name: "",
    radius: 10,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGeoFence((prev) => ({
            ...prev,
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }));
        },
        (error) => {
          console.error("Error fetching geolocation: ", error);
        }
      );
    }
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGeoFence((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted: ", geoFence);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <form
        className="w-full max-w-lg p-6 rounded-lg shadow-md space-y-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold text-center">Add Location</h2>

        <div className="form-control">
          <label htmlFor="lat" className="label">
            <span className="label-text">Latitude</span>
          </label>
          <input
            type="number"
            name="lat"
            id="lat"
            className="input input-bordered w-full"
            value={geoFence.lat}
            onChange={handleInputChange}
            readOnly
            required
          />
        </div>

        <div className="form-control">
          <label htmlFor="lng" className="label">
            <span className="label-text">Longitude</span>
          </label>
          <input
            type="number"
            name="lng"
            id="lng"
            className="input input-bordered w-full"
            value={geoFence.lng}
            onChange={handleInputChange}
            readOnly
            required
          />
        </div>

        <div className="form-control">
          <label htmlFor="name" className="label">
            <span className="label-text">Location Name</span>
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="input input-bordered w-full"
            value={geoFence.name}
            onChange={handleInputChange}
            placeholder="Enter location name"
            required
          />
        </div>

        <div className="form-control">
          <label htmlFor="radius" className="label">
            <span className="label-text">Geofence Radius (meters)</span>
          </label>
          <input
            type="number"
            name="radius"
            id="radius"
            className="input input-bordered w-full"
            value={geoFence.radius}
            onChange={handleInputChange}
            min="1"
            required
          />
        </div>

        <div className="flex justify-center">
          <button type="submit" className="btn btn-primary w-full">
            Save Location
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddLocationPage;
