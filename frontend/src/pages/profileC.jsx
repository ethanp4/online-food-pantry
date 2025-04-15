import './ProfileC.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    homeAddress: '',
    maritalStatus: '',
    statusInCanada: '',
    ageGroup: '',
    ids: {
      healthCard: false,
      driversLicense: false,
      personalId: false,
      passport: false,
      other: '',
    },
    householdSize: '',
    dietaryRestrictions: 'No',
    receivingAssistance: 'Yes',
    hasInfant: 'Yes',
    foodAssistanceFrequency: 'Monthly',
  });

  const handleNext = () => setStep(2);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleIdChange = (e) => {
    const { name, checked, value } = e.target;
    setFormData(prev => ({
      ...prev,
      ids: {
        ...prev.ids,
        [name]: name === 'other' ? value : checked,
      }
    }));
  };

  const handleSubmit = () => {
    console.log('Profile Created:', formData);
    navigate('/profile');
  };

  return (
    <div className="profile-form-container">
      {step === 1 && (
        <div className="form-section">
          <h2>Create your Profile</h2>
          <input name="firstName" placeholder="First Name" onChange={handleChange} />
          <input name="lastName" placeholder="Last Name" onChange={handleChange} />
          <input name="phoneNumber" placeholder="Phone Number" onChange={handleChange} />
          <input name="homeAddress" placeholder="Current Home Address" onChange={handleChange} />
          
          <select name="maritalStatus" onChange={handleChange}>
            <option value="">Marital Status</option>
            <option>Single</option>
            <option>Married</option>
          </select>

          <select name="statusInCanada" onChange={handleChange}>
            <option value="">Your Status in Canada</option>
            <option>Citizen</option>
            <option>Permanent Resident</option>
            <option>Refugee</option>
          </select>

          <select name="ageGroup" onChange={handleChange}>
            <option value="">Your Age Group</option>
            <option>18-24</option>
            <option>25-34</option>
            <option>35-44</option>
            <option>45+</option>
          </select>

          <label><input type="checkbox" name="healthCard" onChange={handleIdChange} /> Health Card</label>
          <label><input type="checkbox" name="driversLicense" onChange={handleIdChange} /> Driver's License</label>
          <label><input type="checkbox" name="personalId" onChange={handleIdChange} /> Personal ID</label>
          <label><input type="checkbox" name="passport" onChange={handleIdChange} /> Passport</label>
          <label><input type="text" name="other" placeholder="Other..." onChange={handleIdChange} /></label>

          <button onClick={handleNext}>Next</button>
        </div>
      )}

      {step === 2 && (
        <div className="form-section">
          <h2>Household Information</h2>
          <input
            name="householdSize"
            type="number"
            placeholder="How Many People Live in your Household?"
            onChange={handleChange}
          />

          <select name="dietaryRestrictions" onChange={handleChange}>
            <option value="No">Do you or your household have dietary/cultural preferences? No</option>
            <option value="Yes">Yes</option>
          </select>

          <select name="receivingAssistance" onChange={handleChange}>
            <option value="Yes">Receiving food assistance from other organizations? Yes</option>
            <option value="No">No</option>
          </select>

          <select name="hasInfant" onChange={handleChange}>
            <option value="Yes">Do you have an infant (0–24 months)? Yes</option>
            <option value="No">No</option>
          </select>

          <select name="foodAssistanceFrequency" onChange={handleChange}>
            <option value="Monthly">Monthly</option>
            <option value="Weekly">Weekly</option>
            <option value="Bi-weekly">Bi-weekly</option>
          </select>

          <button onClick={handleSubmit}>Create Profile</button>
        </div>
      )}
    </div>
  );
};

export default ProfileC;
