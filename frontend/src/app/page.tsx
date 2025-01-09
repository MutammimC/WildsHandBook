"use client";

import { useState, useEffect } from "react";
import { getMonsters, getMonsterById, createMonster } from "../api/monsterApi";

export default function Page() {
    const [monsters, setMonsters] = useState([]);  // List of monsters
    const [monsterName, setMonsterName] = useState("");  // Name to search monsters
    const [monsterDetails, setMonsterDetails] = useState<any | null>(null);  // Monster details for view
    const [newMonster, setNewMonster] = useState({ name: "", species: "", description: "" });  // New monster data
    const [error, setError] = useState("");  // Error message

    // Fetch monsters by name
    const fetchMonsters = async () => {
        try {
            const response = await getMonsters(monsterName);  // Assuming getMonsters fetches by name
            setMonsters(response.data);  // Set the fetched monsters
            setError("");  // Clear error
        } catch (err) {
            setError("Failed to fetch monsters.");
        }
    };

    // Fetch monster details by ID
    const fetchMonsterById = async (id: string) => {
        try {
            const response = await getMonsterById(id);
            setMonsterDetails(response.data);  // Set monster details
            setError("");  // Clear error
        } catch (err) {
            setError("Failed to fetch monster details.");
        }
    };

    // Create a new monster
    const handleCreateMonster = async () => {
        try {
            await createMonster(newMonster);  // Send request to create monster
            setNewMonster({ name: "", species: "", description: "" });  // Reset form
            fetchMonsters();  // Refresh the monster list
            setError("");  // Clear error
        } catch (err) {
            setError("Failed to create monster.");
        }
    };

    // Fetch monsters on initial load (empty search)
    useEffect(() => {
        fetchMonsters();
    }, []);

    return (
        <div>
            <h1>Monster Management</h1>

            {/* Monster Search */}
            <div>
                <h2>Search Monsters</h2>
                <input
                    type="text"
                    placeholder="Search by name"
                    value={monsterName}
                    onChange={(e) => setMonsterName(e.target.value)}  // Update monsterName state on input change
                />
                <button onClick={fetchMonsters}>Search</button>
            </div>

            {/* Monster List */}
            <div>
                <h2>Monster List</h2>
                {monsters.length > 0 ? (
                    <ul>
                        {monsters.map((monster: any) => (
                            <li key={monster.id}>
                                {monster.name} -{" "}
                                <button onClick={() => fetchMonsterById(monster.id)}>View Details</button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No monsters found.</p>
                )}
            </div>

            {/* Monster Details */}
            {monsterDetails && (
                <div>
                    <h2>Monster Details</h2>
                    <p>ID: {monsterDetails.id}</p>
                    <p>Name: {monsterDetails.name}</p>
                    <p>Description: {monsterDetails.description}</p>
                </div>
            )}

            {/* Add Monster */}
            <div>
                <h2>Add Monster</h2>
                <input
                    type="text"
                    placeholder="Monster Name"
                    value={newMonster.name}
                    onChange={(e) => setNewMonster({ ...newMonster, name: e.target.value })}  // Handle name change
                />
                <input
                    type="text"
                    placeholder="Monster Species"
                    value={newMonster.species}
                    onChange={(e) => setNewMonster({ ...newMonster, species: e.target.value })}  // Handle species change
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={newMonster.description}
                    onChange={(e) => setNewMonster({ ...newMonster, description: e.target.value })}  // Handle description change
                />
                <button onClick={handleCreateMonster}>Add Monster</button>
            </div>

            {/* Error Message */}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}
