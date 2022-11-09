
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import { filtersFetching, filtersFetched, filtersFetchingError, activeFilterChanged } from '../../actions';
import { useSelector, useDispatch } from "react-redux";
import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import Spinner from '../spinner/Spinner';

const HeroesFilters = () => {
  const {filters, filtersLoadingStatus, activeFilter} = useSelector(state => state.filters);

  const dispatch=  useDispatch();
  const {request} = useHttp(); 

  useEffect(() => {
      dispatch(filtersFetching());
      request("http://localhost:3001/filters")
          .then(data => dispatch(filtersFetched(data)))
          .catch(() => dispatch(filtersFetchingError()))

      // eslint-disable-next-line
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