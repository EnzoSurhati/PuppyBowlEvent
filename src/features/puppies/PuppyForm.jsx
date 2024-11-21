import { useState } from "react";
import { useAddPuppyMutation } from "./puppySlice";

export default function PuppyForm() {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [addPuppy, { isLoading, error }] = useAddPuppyMutation();

  const imageUrl =
    "https://i.pinimg.com/736x/e5/b9/81/e5b98110fcd62d6ebe0e636262170175.jpg";

  function postPuppy(event) {
    event.preventDefault();
    addPuppy({ name, breed, imageUrl })
      .unwrap()
      .then(() => {
        setName("");
        setBreed("");
      })
      .catch((err) => {
        console.log("Can't add a puppy: ", err);
      });
  }
  return (
    <>
      <h2>Add a Puppy</h2>
      <form onSubmit={postPuppy}>
        <label>
          Name
          <input
            name="puppyName"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Breed
          <input
            name="breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
          />
        </label>
        <button>Add to Roster</button>
        {isLoading && <output>Uploading puppy information...</output>}
        {error && <output>{error.message}</output>}
      </form>
    </>
  );
}
