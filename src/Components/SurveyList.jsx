import React, { useEffect, useState } from 'react';

const SurveyList = () => {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/surveys');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('API Response:', data); // Verify that `data` is an array

        if (Array.isArray(data)) {
          setSurveys(data);
        } else {
          throw new Error('API response is not an array');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSurveys();
  }, []);

  if (loading) {
    return <p>Loading surveys...</p>;
  }

  if (error) {
    return <p>Error loading surveys: {error}</p>;
  }

  return (
    <div>
      <h1>Survey List</h1>
      <table>
        <thead>
          <tr>
          		<th>ID</th>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
         <tbody>
          {surveys.map((survey) => (
            <tr key={survey.id}>
              <td>{survey.id}</td>
              <td>
                <a href={`/edit-survey/${survey.id}`}>{survey.name}</a>
              </td>
              <td>{survey.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SurveyList;
