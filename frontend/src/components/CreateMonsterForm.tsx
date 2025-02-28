import React, { useState, useEffect } from "react";
import { createMonster, updateMonster, getMonsterById, getMonstersByName } from "../api/monsterApi";
import { useNavigate, useParams } from "react-router-dom";
import { useRouter } from 'next/navigation'


interface Monster {
  name: string;
  species: string;
  description: string;
  image: File | null;
}
const CreateMonsterForm = () => {
  const [formData, setFormData] = useState<Monster>({
    name: "",
    species: "",
    description: "",
    image: null,
  });
  const [error, setError] = useState<string>("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({...formData, [name] : value});
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      
      setFormData({...formData, image: e.target.files[0]});
    }
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("species", formData.species);
    formDataToSend.append("description", formData.description);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      console.log(formData);
      const response = await createMonster(formDataToSend); 
      setFormData({ name: "", species: "", description: "", image: null });
      setError(""); // Clear any errors
      //navigate("/monsters"); // Redirect after successful creation
    } catch (error) {
      setError("Failed to submit form data while creating monster");
    }
  };
  return (
    <form
        onSubmit={handleSubmit}
        style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px", // Space between form elements
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            maxWidth: "400px", // Width of the form
            margin: "0 auto", // Center form horizontally
        }}
    >
        <input
            type="text"
            name="name"
            placeholder="Monster Name"
            value={formData.name}
            onChange={handleChange}
            style={{
                width: "100%",
                padding: "10px",
                fontSize: "16px",
                border: "1px solid #ccc",
                borderRadius: "4px",
            }}
        />

        <input
            type="text"
            name="species"
            placeholder="Species"
            value={formData.species}
            onChange={handleChange}
            style={{
                width: "100%",
                padding: "10px",
                fontSize: "16px",
                border: "1px solid #ccc",
                borderRadius: "4px",
            }}
        />

        <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            style={{
                width: "100%",
                padding: "10px",
                fontSize: "16px",
                border: "1px solid #ccc",
                borderRadius: "4px",
            }}
        />

        <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            style={{
                padding: "10px",
                fontSize: "16px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                backgroundColor: "#fff", // White background for file input
            }}
        />

        <button
            type="submit"
            style={{
                padding: "10px",
                fontSize: "16px",
                fontWeight: "bold",
                color: "white",
                backgroundColor: "#4CAF50", // Green background
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
            }}
        >
            Submit
        </button>
    </form>
);

}

export default CreateMonsterForm;
