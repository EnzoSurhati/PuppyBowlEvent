import React from "react";
import {
  useGetPuppyQuery,
  useDeletePuppyMutation,
  useGetPuppiesQuery,
} from "./puppySlice";

export default function PuppyDetails({ selectedPuppyId, setSelectedPuppyId }) {
  console.log("Selected puppy id: ", selectedPuppyId);

  const {
    data: puppy,
    error,
    isLoading,
  } = useGetPuppyQuery(selectedPuppyId, {
    skip: !selectedPuppyId,
  });
  const [deletePuppy, { isLoading: isDeleting }] = useDeletePuppyMutation();

  const handleDeletePuppy = async (id) => {
    try {
      await deletePuppy(id).unwrap();
      setSelectedPuppyId(null);
      window.location.reload();
    } catch (err) {
      console.error("Failed to delete a pretty puppy:", err);
    }
  };

  let $details;
  if (!selectedPuppyId) {
    $details = <p>Please select a puppy to see more details.</p>;
  } else if (isLoading) {
    $details = <p>Loading puppy information...</p>;
  } else {
    const player = puppy.data.player;
    $details = (
      <>
        <img id="side" src={player.imageUrl} alt={player.name} />
        <h3>
          {player.name} #{player.id}
        </h3>
        <p>{player.breed}</p>
        <p>Team {player.team?.name ?? "Unassigned"}</p>

        <div className="remove-button">
        <button onClick={() => handleDeletePuppy(player.id)}>
          Remove from roster
        </button>
        </div>
        
        <figure></figure>
      </>
    );
  }

  return (
    <aside>
      {selectedPuppyId && puppy && (
        <div style={{ marginBottom: "20px", textAlign: "center" }}>
          <h3 style={{ margin: "10px 0", fontSize: "1.5rem", color: "#555" }}>
            {puppy.name}
          </h3>
        </div>
      )}
      <h2>Selected Puppy</h2>
      {$details}
    </aside>
  );
}
