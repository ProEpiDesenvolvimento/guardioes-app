import { API_URL } from 'react-native-dotenv';

const getSymptoms = async (userToken) => {
  // Get Symptoms
  const symptoms = fetch(`${API_URL}/symptoms`, {
    headers: {
      Accept: 'application/vnd.api+json',
      Authorization: `${userToken}`,
    },
  })
    .then((response) => response.json())
    .then((responseJson) =>
      responseJson.symptoms.sort((a, b) => {
        if (a.description > b.description) return 1;
        if (b.description < a.description) return -1;
        return 0;
      })
    );
  return symptoms;
};

const sendSurvey = async (survey, userToken, userID) => {
  const responseData = await fetch(`${API_URL}/users/${userID}/surveys`, {
    method: 'POST',
    headers: {
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/json',
      Authorization: `${userToken}`,
    },
    body: JSON.stringify({
      survey: {
        household_id: survey.householdID,
        latitude: survey.userLatitude,
        longitude: survey.userLongitude,
        bad_since: survey.today_date,
        traveled_to: survey.hadTraveled,
        went_to_hospital: survey.lookedForHospital,
        contact_with_symptom: survey.contactWithSymptom,
        symptom: survey.symptoms,
      },
    }),
  }).then((response) => response.json());

  return responseData;
};

export { getSymptoms, sendSurvey };
