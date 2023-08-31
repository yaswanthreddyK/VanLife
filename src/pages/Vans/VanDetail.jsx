import { getVans } from "../../api";
import { Suspense } from "react";
import { Link, useLoaderData, useLocation, defer, Await } from "react-router-dom";

export function loader({ params }) {
  const { id } = params;
  return defer({van: getVans(id)});
}

export default function VanDetail() {
  const location = useLocation();
  const vanPromise = useLoaderData();
  const type = location.state?.type || "";
  const search = location.state?.search || "";
function renderVanDetails(van){
                
                
          return <div className="van-detail">
                    <img src={van.imageUrl} />
                    <i className={`van-type ${van.type} selected`}>
                        {van.type}
                    </i>
                    <h2>{van.name}</h2>
                    <p className="van-price"><span>${van.price}</span>/day</p>
                    <p>{van.description}</p>
                    <button className="link-button">Rent this van</button>
                </div>
}
  return (
    <div className="van-detail-container">
      <Link to={`/vans?${search}`} relative="path" className="back-button">
        &larr; <span>Back to {type} vans</span>
      </Link>
      <Suspense fallback={<h2>Loading....</h2>}>
        <Await resolve={vanPromise.van}>
          {(vanData)=> {
             return renderVanDetails(vanData)
            }}
        </Await>
      </Suspense>
    </div>
  );
}
