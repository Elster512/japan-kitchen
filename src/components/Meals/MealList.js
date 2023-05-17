import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import styles from './MealList.module.css';
import Mealitem from './Mealitem/Mealitem';

const MealList = () => {
  const [mealList, setMealList] = useState([]);
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    try {
      fetch(
        'https://react-practicing-776b5-default-rtdb.firebaseio.com/Meals.json'
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error('Что то пошло не так...');
          }
          return response.json();
        })
        .then((data) => {
          const rawMeals = [];

          for (let i in data) {
            rawMeals.push({
              id: i,
              name: data[i].name,
              description: data[i].description,
              price: data[i].price,
            });
          }

          setMealList(rawMeals);
          setIsLoad(true);
        });
    } catch (error) {}
  }, []);

  const meals = mealList.map((value) => <Mealitem {...value} key={value.id} />);
  return (
    <div className={styles.meals}>
      {isLoad && (
        <Card>
          <ul>{meals}</ul>
        </Card>
      )}
    </div>
  );
};

export default MealList;
