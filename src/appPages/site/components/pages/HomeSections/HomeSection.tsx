import { useGetRegionListQuery } from '@/redux/api/regions';
import scss from './HomeSection.module.scss'

const HomeSection = () => {
  const { data, isLoading, isError } = useGetRegionListQuery()
      console.log(data);
  return (
    <section className={scss.HomeSection}>
      <div className="container">
        <div className={scss.content}>
          <h1>HomeSection</h1>
        </div>
      </div>
    </section>
  )
}

export default HomeSection