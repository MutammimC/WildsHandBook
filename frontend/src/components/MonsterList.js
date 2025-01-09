import React, { useState, useEffect } from "react";
import { getMonsters } from "../api/monsterApi";
import { Link } from "react-router-dom";

const MonsterList = () => {
  const [monsters, setMonsters] = useState([]);
  const [search, setSearch] = useState("");

  const fetchMonsters = async () => {
    try {
      const response = await getMonsters(search);
      setMonsters(response.data);
    } catch (error) {
      console.error("Error fetching monsters:", error);
    }
  };

  useEffect(() => {
    fetchMonsters();
  }, [search]);

  return (
    <div>
      <h1>Monster List</h1>
      <input
        type="text"
        placeholder="Search monsters by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {monsters.map((monster) => (
          <li key={monster.id}>
            <Link to={`/monster/${monster.id}`}>{monster.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MonsterList;
