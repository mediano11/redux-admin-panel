
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import { activeFilterChanged, fetchFilters, selectAll } from './filtersSlice'
import { useSelector, useDispatch } from "react-redux";
import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import Spinner from '../spinner/Spinner';
import store from '../../store';

const HeroesFilters = () => {
  const { filtersLoadingStatus, activeFilter} = useSelector(state => state.filters);
  const filters = selectAll(store.getState());
  const dispatch=  useDispatch();
  const {request} = useHttp(); 
  console.log(filters);
  useEffect(() => {
    dispatch(fetchFilters(request));
  }, []);


  if (filtersLoadingStatus === "loading") {
    return <Spinner/>
  } else if (filtersLoadingStatus === "error") {
    return <h5 className="text-center mt-5">Помилка завантаження</h5>
  }
    
  const renderFilters = (filters) => {
    if(filters.length === 0){
      return <h5 className="text-center mt-5">Елементи не знайдені</h5>
    }

    
    return filters.map(({name, title, className}) => {
      // eslint-disable-next-line
      return <button 
            key={name} 
            className={`btn ${className} ${name===activeFilter ? "active" : ""}`}
            onClick={() => dispatch(activeFilterChanged(name))}
            >
            {title}</button>
    })
  }

  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Отфильтруйте героев по элементам</p>
        <div className="btn-group">
            {renderFilters(filters)}
        </div>
      </div>
    </div>
  )
}

export default HeroesFilters;