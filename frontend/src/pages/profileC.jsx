import './ProfileC.css';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const ProfileC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const { t } = useTranslation();

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
          <h2>{t("create.title")}</h2>
          <input name="firstName" placeholder={t("create.firstname")} onChange={handleChange} />
          <input name="lastName" placeholder={t("create.lastname")} onChange={handleChange} />
          <input name="phoneNumber" placeholder={t("create.phone")} onChange={handleChange} />
          <input name="homeAddress" placeholder={t("create.address")} onChange={handleChange} />
          
          <select name="maritalStatus" onChange={handleChange}>
            <option disabled hidden selected>{t("create.marital")}</option>
            <option>{t("create.single")}</option>
            <option>{t("create.married")}</option>
          </select>

          <select name="statusInCanada" onChange={handleChange}>
            <option disabled hidden selected>{t("create.status")}</option>
            <option>{t("create.citizen")}</option>
            <option>{t("create.permanent")}</option>
            <option>{t("create.refugee")}</option>
          </select>

          <select name="ageGroup" onChange={handleChange}>
            <option disabled hidden selected>{t("create.agegroup")}</option>
            <option>18-24</option>
            <option>25-34</option>
            <option>35-44</option>
            <option>45+</option>
          </select>
          <br />
          <p>{t("create.uniqueid")}</p>
          <label><input type="checkbox" name="healthCard" onChange={handleIdChange} /> {t("create.healthcard")}</label>
          <label><input type="checkbox" name="driversLicense" onChange={handleIdChange} /> {t("create.driverslicense")}</label>
          <label><input type="checkbox" name="personalId" onChange={handleIdChange} /> {t("create.personalid")}</label>
          <label><input type="checkbox" name="passport" onChange={handleIdChange} /> {t("create.passport")}</label>
          <label><input type="text" name="other" placeholder={t("create.other")} onChange={handleIdChange} /></label>

          <button onClick={handleNext}>{t("buttons.next")}</button>
        </div>
      )}

      {step === 2 && (
        <div className="form-section">
          <h2>{t("household.title")}</h2>
          <input
            name="householdSize"
            type="number"
            placeholder={t("household.household")}
            onChange={handleChange}
          />

          <select name="dietaryRestrictions" onChange={handleChange}>
            <option disabled hidden selected>{t("household.preferences")}</option>
            <option value="Yes">{t("household.yes")}</option>
            <option value="No">{t("household.no")}</option>
          </select>

          <select name="receivingAssistance" onChange={handleChange}>
          <option disabled hidden selected>{t("household.assistance")}</option>
            <option value="Yes">{t("household.yes")}</option>
            <option value="No">{t("household.no")}</option>
          </select>

          <select name="hasInfant" onChange={handleChange}>
          <option disabled hidden selected>{t("household.infant")}</option>
            <option value="Yes">{t("household.yes")}</option>
            <option value="No">{t("household.no")}</option>
          </select>

          <select name="foodAssistanceFrequency" onChange={handleChange}>
            <option disabled hidden selected>{t("household.often")}</option>
            <option value="Monthly">{t("household.monthly")}</option>
            <option value="Bi-weekly">{t("household.biweekly")}</option>
            <option value="Weekly">{t("household.weekly")}</option>
          </select>

          <button onClick={handleSubmit}>{t("buttons.createprofile")}</button>
        </div>
      )}
    </div>
  );
};

export default ProfileC;
