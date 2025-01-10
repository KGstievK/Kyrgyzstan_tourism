import scss from './AddSlider.module.scss'

const AddSlider = () => {
  return (
    <section className={scss.AddSlider}>
      <div className="container">
        <div className={scss.content}>
          <h1>AddSlider</h1>
          <div className={scss.funcSlider}>
            <form action="">
              <input type="text" placeholder='Title'/>
              <input type="text" placeholder='Sub Title'/>
              <input type="text" placeholder='Sub Title'/>
              <input type="text" placeholder='button name'/>
              <input type="text" placeholder='link'/>
              <input type="color" value='#000'/>
            </form>
          </div>
          <div className={scss.slider}>

          </div>
          
        </div>
      </div>
    </section>
  )
}

export default AddSlider