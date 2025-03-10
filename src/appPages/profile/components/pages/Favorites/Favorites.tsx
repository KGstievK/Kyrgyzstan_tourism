"use client"
import { FC, useState, useMemo } from "react"
import Image from "next/image"
import scss from "./Favorites.module.scss"
import { CiSearch } from "react-icons/ci"
import { MdArrowOutward } from "react-icons/md"
import { FcLike } from "react-icons/fc"
import { IoEllipseSharp, IoEllipseOutline } from "react-icons/io5"
import { FaLocationDot } from "react-icons/fa6"
import images from "../../../../../assets/images/Favorites/user.png"
import { useGetFavoriteItemsQuery } from "@/redux/api/auth"

type TabKey = 'attractions' | 'gallery' | 'hotels' | 'regions'

interface FavoriteItem {
  id: string
  attractions?: Attraction
  gallery?: Gallery
  hotels?: Hotel
  popular_region?: Region
}

interface Attraction {
  id: number
  attraction_name: string
  main_image: string
  region_category: string
  avg_rating: number
  rating_count: number
}

interface Gallery {
  id: number
  gallery_name: string
  gallery_image: string
  address: string
  avg_rating: number
  rating_count: number
}

interface Hotel {
  id: number
  name: string
  main_image: string
  region: string
  avg_rating: number
  rating_count: number
}

interface Region {
  id: number
  popular_name: string
  popular_image: string
  region: string
  avg_rating: number
  rating_count: number
}

const TABS = [
  { key: 'attractions', label: 'Attractions' },
  { key: 'gallery', label: 'Gallery' },
  { key: 'hotels', label: 'Hotels' },
  { key: 'regions', label: 'Regions' }
]

const Favorites: FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('attractions')
  const { data = [], isLoading, error } = useGetFavoriteItemsQuery()

  console.log(data[0].attractions);
  
  // const filteredItems = useMemo(() => {
  //   if (!data) return []
  //   return data.filter(item => {
  //     if (activeTab === 'attractions') return item.attractions
  //     if (activeTab === 'gallery') return item.gallery
  //     if (activeTab === 'hotels') return item.hotels
  //     if (activeTab === 'regions') return item.popular_region
  //     return false
  //   })
  // }, [data, activeTab])
  // console.log(data[0]);
  
  // const getItemDetails = (item: FavoriteItem) => {
  //   if (item.attractions) {
  //     return {
  //       name: item.attractions.attraction_name,
  //       image: item.attractions.main_image,
  //       address: item.attractions.region_category,
  //       rating: item.attractions.avg_rating,
  //       reviews: item.attractions.rating_count
  //     }
  //   }
  //   if (item.gallery) {
  //     return {
  //       name: item.gallery.gallery_name,
  //       image: item.gallery.gallery_image,
  //       address: item.gallery.address,
  //       rating: item.gallery.avg_rating,
  //       reviews: item.gallery.rating_count
  //     }
  //   }
  //   if (item.hotels) {
  //     return {
  //       name: item.hotels.name,
  //       image: item.hotels.main_image,
  //       address: item.hotels.region,
  //       rating: item.hotels.avg_rating,
  //       reviews: item.hotels.rating_count
  //     }
  //   }
  //   if (item.popular_region) {
  //     return {
  //       name: item.popular_region.popular_name,
  //       image: item.popular_region.popular_image,
  //       address: item.popular_region.region,
  //       rating: item.popular_region.avg_rating,
  //       reviews: item.popular_region.rating_count
  //     }
  //   }
  //   return null
  // }

  // const renderStars = (rating: number) => {
  //   return Array(5).fill(0).map((_, i) => (
  //     i < Math.round(rating) 
  //       ? <IoEllipseSharp key={i} /> 
  //       : <IoEllipseOutline key={i} />
  //   ))
  // }

  // return (
  //   <section className={scss.Favorites}>
  //     <div className={scss.content}>
  //       {/* Верхняя панель с поиском и пользователем */}
  //       <div className={scss.Users_input}>
  //         <div className={scss.inputs}>
  //           <div className={scss.input_search}>
  //             <input type="text" placeholder="Search..." />
  //             <CiSearch className={scss.search} />
  //           </div>
  //           <MdArrowOutward className={scss.arrow} />
  //         </div>
          
  //         <div className={scss.user}>
  //           <div className={scss.user_text}>
  //             <h3>Charles Deo</h3>
  //             <h4>Moscow, Russia</h4>
  //           </div>
  //           <Image 
  //             src={images} 
  //             alt="User" 
  //             width={42} 
  //             height={42}
  //             className={scss.user_image}
  //           />
  //         </div>
  //       </div>

  //       {/* Основной контент */}
  //       <div className={scss.favorite_content}>
  //         <h1 className={scss.text}>Favorites</h1>
          
  //         {/* Вкладки */}
  //         <div className={scss.tabs}>
  //           {TABS.map(tab => (
  //             <button
  //               key={tab.key}
  //               className={`${scss.tab} ${activeTab === tab.key ? scss.active : ''}`}
  //               onClick={() => setActiveTab(tab.key)}
  //             >
  //               {tab.label}
  //             </button>
  //           ))}
  //         </div>

  //         {/* Список элементов */}
  //         <div className={scss.Favorite_images}>
  //           {isLoading && <div className={scss.loading}>Loading...</div>}
            
  //           {error && <div className={scss.error}>Error loading data</div>}
            
  //           {!isLoading && !error && (
  //             filteredItems.length === 0 
  //               ? <div className={scss.empty}>No items found</div>
  //               : filteredItems.map(item => {
  //                   const details = getItemDetails(item)
  //                   if (!details) return null
                    
  //                   return (
  //                     <div key={item.id} className={scss.Favorite_images_block_1}>
  //                       <div className={scss.images_likes}>
  //                         <FcLike className={scss.like} />
  //                       </div>
  //                       <Image
  //                         src={details.image}
  //                         alt={details.name}
  //                         width={300}
  //                         height={200}
  //                         className={scss.regions_images}
  //                       />
  //                       <div className={scss.info}>
  //                         <h3>{details.name}</h3>
  //                         <div className={scss.reyting}>
  //                           <p>{details.rating.toFixed(1)}/5</p>
  //                           <div className={scss.stars}>
  //                             {renderStars(details.rating)}
  //                           </div>
  //                           <span>{details.reviews} reviews</span>
  //                         </div>
  //                         <div className={scss.address}>
  //                           <FaLocationDot />
  //                           <p>{details.address}</p>
  //                         </div>
  //                       </div>
  //                     </div>
  //                   )
  //                 })
  //           )}
  //         </div>
  //       </div>
  //     </div>
  //   </section>
  // )
  return ""
}

export default Favorites