// src/App.js
import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import AppointmentForm from './components//Appointment/AppointmentForm';
import DoctorSearch from './components/Doctor/DoctorSearch';
import DoctorCard from './components/Doctor/DoctorCard';
import AlphabetSearch from './components/DiseaseAnalyze/AlphabetSearch';
import HospitalFinder from './components/NearbyHospital/HospitalFinder';
import NewsUpdates from './components/News/NewsUpdates';

function App ()
{
        return (
                <div className="App">
                        <Header />
                        <div className="content">
                                <AppointmentForm />
                                <DoctorSearch />
                                <div className="doctor-cards">
                                        <DoctorCard
                                                name="Dr. Ayane"
                                                specialty="Neurologist"
                                                image="doctor1.jpg"
                                        />
                                        <DoctorCard
                                                name="Dr. Smith"
                                                specialty="Cardiologist"
                                                image="doctor2.jpg"
                                        />
                                </div>
                                <AlphabetSearch />
                                <NewsUpdates />
                                <HospitalFinder />
                        </div>
                </div>
        );
}

export default App;
