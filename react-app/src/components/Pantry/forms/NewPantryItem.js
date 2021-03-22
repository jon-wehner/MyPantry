import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { loadMeasurements } from '../../../store/items'

export default function NewPantryItem({item, setShowModal}) {
  const dispatch = useDispatch();
  const { id: userId } = useParams();
  const measurements = useSelector(state => state.items.measurements);

  const [loaded, setLoaded] = useState(false);
  const [measurementId, setMeasurementId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expirationDate, setExpirationDate] = useState("")
  const [errors, setErrors] = useState("")

  useEffect(() => {
    dispatch(loadMeasurements())
    setLoaded(true)
  },[dispatch]);

  const handleSubmit = async (e) => {
    setErrors("")
    e.preventDefault();
    const pantryItem = {
      itemId: item.id,
      measurementId,
      quantity,
      userId,
      expirationDate
    }
  }

  if (!loaded) return null;
  return (
    <form style={{ display: 'flex', flexDirection: 'column'}} onSubmit={handleSubmit}>
      {errors && errors.map(error => <li key={error}>{error}</li>)}
      {item.name}
      {item.category}
      <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} />
      <select value={measurementId} onChange={e => setMeasurementId(e.target.value) }>
        {measurements && measurements.map(measurement => <option
                                          value={measurement.id}
                                          key={measurement.id}>
                                            {measurement.unit}
                                          </option>)
                                          }
      </select>
      <input type="date" value={expirationDate} onChange ={e=> setExpirationDate(e.target.value)}/>
      <button>Add To Pantry</button>
    </form>
  )
};
