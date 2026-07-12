import { decrement, increment, reset } from '../store/slices/counterSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import './HomePage.css'

export function HomePage() {
  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()

  return (
    <section className="page">
      <h1>Home</h1>
      <p className="page__lead">
        Demo page wired to the <code>counter</code> Redux slice.
      </p>

      <div className="counter-demo">
        <p className="counter-demo__value">Count: {count}</p>
        <div className="counter-demo__actions">
          <button type="button" onClick={() => dispatch(decrement())}>
            −
          </button>
          <button type="button" onClick={() => dispatch(increment())}>
            +
          </button>
          <button type="button" onClick={() => dispatch(reset())}>
            Reset
          </button>
        </div>
      </div>
    </section>
  )
}
