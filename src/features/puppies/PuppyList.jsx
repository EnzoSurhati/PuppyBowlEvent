import React from "react";
import { useGetPuppiesQuery } from "./puppySlice";

export default function PuppyList({ setSelectedPuppyId }) {
  const { data: puppies, error, isLoading } = useGetPuppiesQuery();
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading...</p>;

  return (
    <article>
      <h2>Roster</h2>
      <ul className="puppies">
        {isLoading && <li>Loading puppies...</li>}
        {puppies?.data?.players.map((p) => (
          <li key={p.id}>
            <h3>
              {p.name} #{p.id}
            </h3>
            <figure>
              <img src={p.imageUrl} alt={p.name} />
            </figure>
            <button onClick={() => setSelectedPuppyId(p.id)}>
              See details
            </button>
          </li>
        ))}
      </ul>
    </article>
  );
}
