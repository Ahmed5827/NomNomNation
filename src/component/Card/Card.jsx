import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import fetchMealDetails from '../../services/fetchMealDetails';
function MealCard({ title, text, imageUrl , mealid }) {
    const navigate = useNavigate();
    const handlegetrecepie = async (id="") => {
        try {
            const mealData = await fetchMealDetails(id);
            navigate("/Meal", { state: { Meal: mealData } }); // Navigate to the meals page with the data as state
        } catch (error) {
            console.error("Error fetching random meal:", error);
        }
      };
  return (
    <Card style={{ width: '22rem', height:'31rem' }}>
      <Card.Img variant="top" src={imageUrl} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        
        <Button variant="primary" onClick={() => handlegetrecepie(mealid)}>{text}</Button>
      </Card.Body>
    </Card>
  );
}
// PropTypes validation
MealCard.propTypes = {
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    mealid:PropTypes.string.isRequired
  };
export default MealCard;
