import React, { useState, useEffect } from "react";
import { getMonsterById, deleteMonster } from "../api/monsterApi";
import { useParams, useNavigate } from "react-router-dom";

const MonsterDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [monster, setMonster] = useState(null);

  const fetchMonster = async () => {
    try {
      const response = await getMonsterById(id);
      setMonster(response.data);
    } catch (error) {
      console.error("Error fetching monster:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteMonster(id);
      navigate("/");
    } catch (error) {
      console.error("Error deleting monster:", error);
    }
  };

  useEffect(() => {
    fetchMonster();
  }, [id]);

  if (!monster) return <p>Loading...</p>;

  return (
    <div>
      <h1>{monster.name}</h1>
      <p>Species: {monster.species}</p>
      <p>Description: {monster.description}</p>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={() => navigate(`/edit-monster/${id}`)}>Edit</button>
    </div>
  );
};

export default MonsterDetail;
