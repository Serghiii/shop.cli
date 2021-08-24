import React from "react"
import { MainBreadcrumbs, MainFilters, MainProducts } from ".";

const MainSmartphones: React.FC = () => {
   return (
      <main>
         <div className="container">
            <div className="main">
               <div className="breadcrumbs">
                  <MainBreadcrumbs />
               </div>
               <h2 className="main-title">Смартфони</h2>
               <div className="main-products">
                  <div>
                     <section className="filters">
                        <MainFilters />
                     </section>
                  </div>
                  <div className="products">
                     <MainProducts group={'smartphones'} />
                  </div>
               </div>
            </div>
         </div>
      </main>
   )
}
export default MainSmartphones
