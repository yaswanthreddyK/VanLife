import { Link, NavLink, useLoaderData, Outlet, defer, Await } from "react-router-dom";
import { Suspense } from "react";
import { getHostVans } from "../../api";
import { requireAuth } from "../../../utils";
export async function loader({params, request}){
  await requireAuth(request)
  const { id } = params
  return defer({van: getHostVans(id)})
}

export default function HostVanDetails() {
    const currentVanPromise = useLoaderData()

    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616",
      };

    function renderHostVan(currentVan){
        
        return(
            <div className="host-van-detail-layout-container">
            <div className="host-van-detail">
              <img src={currentVan.imageUrl} />
              <div className="host-van-detail-info-text">
                <i className={`van-type van-type-${currentVan.type}`}>
                  {currentVan.type}
                </i>
                <h3>{currentVan.name}</h3>
                <h4>${currentVan.price}/day</h4>
              </div>
            </div>
    
            <nav className="host-van-detail-nav">
              <NavLink
                to="."
                end
                style={({ isActive }) => (isActive ? activeStyles : null)}
              >
                Details
              </NavLink>
              <NavLink
                to="pricing"
                style={({ isActive }) => (isActive ? activeStyles : null)}
              >
                Pricing
              </NavLink>
              <NavLink
                to="photos"
                style={({ isActive }) => (isActive ? activeStyles : null)}
              >
                Photos
              </NavLink>
            </nav>
            <Outlet context={{ currentVan }} />
          </div>
        )
    }
  return (
    <section>
      <Link to="/host/vans"  className="back-button">
        &larr; <span>Back to all vans</span>
      </Link>
     <Suspense fallback={<h2>Loading....</h2>}>
      <Await resolve={currentVanPromise.van}>
        {(currentVan)=> renderHostVan(currentVan) }
      </Await>
     </Suspense>
 
    </section>
  );
}
