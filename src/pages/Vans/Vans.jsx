import { getVans } from "../../api";
import { Suspense } from "react";
import {
  useLoaderData,
  useSearchParams,
  defer,
  Await,
  Link,
} from "react-router-dom";
import { requireAuth } from "../../../utils";

export  function loader({request}) {
  return defer({vans: getVans()})
}

export default function Vans() {
  const dataPromise = useLoaderData();

  const [searchParams, setSearchParams] = useSearchParams();

  function handleFilterChange(key, value) {
    setSearchParams((prevParams) => {
      if (value === null) {
        prevParams.delete(key);
      } else {
        prevParams.set(key, value);
      }

      return prevParams;
    });
  }
  const filterType = searchParams.get("type");

  function renderVans(vans) {
    const displayVans = filterType
      ? vans.filter((van) => van.type === filterType)
      : vans;
    const vanElements = displayVans.map((van) => (
      <div className="van-title" key={van.id}>
        <Link
          to={van.id}
          state={{ search: searchParams.toString(), type: filterType }}
        >
          <img className="van-img" src={van.imageUrl} />
          <div className="van-info">
            <h3>{van.name}</h3>
            <p>
              ${van.price}
              <span>/day</span>
            </p>
          </div>
          <i className={`van-type ${van.type} selected`}>{van.type}</i>
        </Link>
      </div>
    ));

    return (
      <div className="van-list-container">

        <div className="van-list-filter-buttons">
          <button
            className={`van-type simple ${
              filterType === "simple" ? "selected" : ""
            }`}
            onClick={() => handleFilterChange("type", "simple")}
          >
            Simple
          </button>
          <button
            className={`van-type luxury ${
              filterType === "luxury" ? "selected" : ""
            }`}
            onClick={() => handleFilterChange("type", "luxury")}
          >
            Luxury
          </button>
          <button
            className={`van-type rugged ${
              filterType === "rugged" ? "selected" : ""
            }`}
            onClick={() => handleFilterChange("type", "rugged")}
          >
            Rugged
          </button>
          {filterType ? (
            <button
              className="van-type clear-filters"
              onClick={() => handleFilterChange("type", null)}
            >
              Clear filter
            </button>
          ) : null}
        </div>
        <div className="van-list">{vanElements}</div>
      </div>
    );
  }

  return (
    <>
    <h1>Explore our van options</h1>
    <Suspense fallback={<h2>Loading....</h2>}>
      <Await resolve={dataPromise.vans}>{(vans) => renderVans(vans)}</Await>
    </Suspense>
    </>
  );
}
