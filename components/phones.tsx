import Link from "next/link"

const Phones: React.FC = () => {
   return (
      <div className="top-phones">
         <svg
            className="top-phones__ico"
            height="11"
            width="11"
            viewBox="0 0 482 482"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M465.5,349.9c21.5,21.5,21.5,49.7,0.2,71.9c-4.6,4.8-9.4,9.5-14.1,14c-6.9,6.7-13.5,13-19.3,20c-0.1,0.2-0.3,0.4-0.4,0.5
      c-16.3,17.7-36.3,26.3-61.2,26.3c-2.3,0-4.5-0.1-6.8-0.2c-37.1-2.4-70.4-16.4-95.3-28.2c-65.4-31.7-122.7-76.5-170.3-133.4
      c-39.2-47.1-65.6-91.2-83.1-138.7C3.8,151.4-0.6,126,1.3,102.1C2.9,83,10.6,66.5,24.2,52.9l37.4-37.4C72.3,5.3,84.5,0,97.2,0
      c12.8,0,24.9,5.3,35.2,15.4c6.8,6.3,13.7,13.3,20.3,20.1c3.4,3.5,6.7,6.9,10.2,10.4l29.8,29.8c10.9,10.8,16.6,23.3,16.6,36
      s-5.8,25.2-16.6,36c-3.1,3.1-6.2,6.2-9.2,9.3c-8.5,8.7-17.3,17.6-26.7,26.1c6.7,15.5,16.3,30.7,30.6,48.8
      c28.3,34.7,57.9,61.7,90.5,82.4c3.3,2.1,7,4,11,6c3.2,1.6,6.6,3.3,9.9,5.2l35.8-35.8c10.5-10.5,22.8-16.1,35.6-16.1
      c12.8,0,25,5.6,35.2,16.2L465.5,349.9z"/>
         </svg>
         <Link href="tel:+380633821947">
            <a className="top-phones__phone">(063) 382-19-47</a>
         </Link>
      </div>
   )
}

export default Phones