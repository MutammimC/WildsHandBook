"use client";

import React, { useState, useEffect } from "react";
import { useParams } from 'next/navigation'; 
import SearchMonsterForm from '@/components/SearchMonsterForm';

import { getMonstersByName } from '@/api/monsterApi';


type Monster = {
    name: string;
    species: string;
    description: string;
    image: string;
};


function DataView({ monster }: { monster: Monster | null }) {
    if (!monster) {
        return <div>No monster data available</div>;
    }

    const viewSection = Object.keys(monster).map((key) => (
        <h1 key={key}>
            {key}: {monster[key as keyof Monster]}
        </h1>
    ));

    return (
        <div style={{ padding: "20px", background: "black", color: "white" }}>
            {viewSection}
            {monster.image && (
                <img
                    src={monster.image}
                    alt={monster.name}
                    style={{ width: "200px", height: "auto" }}
                />
            )}
        </div>
    );
}

export default function MonsterInfo() {
    const { monster } = useParams(); // Get the monster name from the URL
    const [monsterData, setMonsterData] = useState<Monster | null>(null); // Use null initially to handle loading state
    const [error, setError] = useState<string>(""); // For error handling

    // Fetch monster data when the monster name changes in the URL
    useEffect(() => {
        if (monster) {
            const fetchMonsterData = async () => {
                try {
                    const response = await getMonstersByName(monster);
                    if (response.data && response.data.length > 0) {
                        setMonsterData(response.data[0]); // Assuming you're getting one monster
                        setError(""); // Clear any previous error
                    } else {
                        setMonsterData(null); // No monster found
                        setError("Monster not found");
                    }
                } catch (error) {
                    console.error("Error fetching monster data:", error);
                    setMonsterData(null);
                    setError("Failed to fetch monster data");
                }
            };

            fetchMonsterData();
        }
    }, [monster]); // Triggered when the monster name changes

    // Display loading or error message
    if (error) {
        return (<div>
        <p style={{ color: "red" }}>{error}</p>
        <SearchMonsterForm/>
        </div>
    );
    }

    if (!monsterData) {
        return (<div>
                <p>Error finding monster</p>
                    <SearchMonsterForm/>
                </div>);
    }

    // Display the monster information
    return (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
            <SearchMonsterForm />
        </div>
        <div>
            <DataView monster={monsterData} />
        </div>
        </div>
    );
    
    
}
