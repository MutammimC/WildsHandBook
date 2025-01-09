import React, { useState, useEffect } from "react";
import { createMonster, updateMonster, getMonsterById } from "../api/monsterApi";
import { useNavigate, useParams } from "react-router-dom";

const MonsterForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    species: "",
    description: "",
  });

  const fetchMonster = async () => {
    try {
      const response = await getMonsterById(id);
      setFormData(response.data);
    } catch (error) {
      console.error("Error fetching monster:", error);
    }
  };

  useEffect(() => {
    if (id) fetchMonster();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateMonster(id, formData);
      } else {
        await createMonster(formData);
      }
      navigate("/");
    } catch (error) {
      console.error("Error saving monster:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>{id ? "Edit Monster" : "Add Monster"}</h1>
      <input
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        name="species"
        placeholder="Species"
        value={formData.species}
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default MonsterForm;
