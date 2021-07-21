import React from "react"
import { MainBreadcrumbs } from "./index";

const MainSmartphones: React.FC = () => {
   const bc = [
      { to: "/smartphones-mobiles-accessories/", label: "Телефони та аксесуари" },
      { to: "/smartphones/", label: "Смартфони" }
   ]

   return (
      <main>
         <div className="container">
            <div className="main">
               <div className="breadcrumbs">
                  <MainBreadcrumbs items={bc} />
               </div>
               <h2 className="main-title">Смартфони</h2>
               <div className="wrapper">
                  <section className="filter">
                     Фільтр
                     <details>
                        <summary>Вопрос 1</summary>
                        <p>Население превышает широкий кристаллический фундамент.</p>
                        <details>
                           <summary>Приложенные документы</summary>
                           <ul>
                              <li><a href="#">Болгары очень дружелюбны;</a></li>
                              <li>Скумбрия неумеренно перевозит вулканизм;</li>
                              <li>Дождливая погода, куда входят Пик-Дистрикт;</li>
                              <li>Белый саксаул дегустирует живописный утконос;</li>
                           </ul>
                        </details>
                     </details>
                  </section>
               </div>
            </div>
         </div>
      </main>
   )
}

export default MainSmartphones
