import { API_URL } from 'react-native-dotenv';

const getTips = async (userToken) => {
  const tips = await fetch(`${API_URL}/contents/`, {
    headers: {
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/json',
      Authorization: `${userToken}`,
    },
  }).then((response) => response.json());

  return tips;
};

export { getTips };
