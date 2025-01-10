import scss from './AdminSection.module.scss'

const AdminSection = () => {
  return (
    <section className={scss.AdminSection}>
      <div className="container">
        <div className={scss.content}>
          <h1>AdminSection</h1>
        </div>
      </div>
    </section>
  )
}

export default AdminSection