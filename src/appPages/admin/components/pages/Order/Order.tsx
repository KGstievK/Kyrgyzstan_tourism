import scss from './Order.module.scss'

const Order = () => {
  return (
    <section className={scss.Order}>
      <div className="container">
        <div className={scss.content}>
          <h1>Order</h1>
        </div>
      </div>
    </section>
  )
}

export default Order