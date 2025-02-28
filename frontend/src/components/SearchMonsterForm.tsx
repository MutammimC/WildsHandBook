

"use client";

import React, { useState, useEffect } from "react";
import { getMonstersByName } from "../api/monsterApi";
import "@radix-ui/themes/styles.css";
import { Theme, Text } from "@radix-ui/themes";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa"; // Import magnifying glass icon {REMOVE LATER! NOT USING ANYMORE}
import { useRouter } from 'next/navigation';




interface Monster {
    id: string;
    name: string;
    species: string;
    description: string;
    image: string;
}

const SearchMonsterForm = () => {
    const [searchName, setSearchName] = useState("");
    const [query, setQuery] = useState<Monster[]>([]);
    const [error, setError] = useState("");

    const router = useRouter();

    const handleRedirect = (monsterName: string) => {
        if (monsterName) {
            router.push(`/monster/${monsterName}`); // Make sure the route matches the dynamic file [monster].tsx!!!
        }
    };

    const fetchMonsterByName = async (name: string) => {
        try {
            if (name.trim() === "") {
                setQuery([]);
                setError(""); 
                return;
            }
            const response = await getMonstersByName(name);
            if (response.data && response.data.length > 0) {
                setQuery(response.data);
                setError(""); 
            } else {
                setQuery([]);
                setError("No monsters found");
            }
        } catch (error) {
            console.error("Error fetching monsters:", error);
            setQuery([]);
            setError("Failed to fetch monsters");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchName(e.target.value);
        fetchMonsterByName(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        fetchMonsterByName(searchName);
    };

const renderMonsters = () => {
    /*if (query.length === 0) {
        return <p style={{ color: "white" }}>No monsters found.</p>;
    }*/

    return (
        
        <div 
            style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: "20px",
                margin: "0",
                width: "100%",
                padding: "20px",
                background: "black"
            }}
            
        >
            {query.map((monster) => (
                <div key={monster.id}>
                    <div className="group relative h-72 w-48 [perspective:1000px]" style={{ maxWidth: "200px" }}>
                        <div className="absolute duration-1000 w-full h-full [transform-style:preserve-3d] group-hover:[transform:rotateX(180deg)]">
                            {/* Front side */}
                            <div
                                className="absolute w-full h-full rounded-xl bg-gradient-to-br from-violet-400 to-indigo-600 p-4 text-white [backface-visibility:hidden]"
                            >
                                <div className="flex flex-col h-full">
                                    <div className="flex justify-center mb-4">
                                        <img
                                            src={monster.image}
                                            alt={monster.name}
                                            style={{
                                                width: "60px",
                                                height: "60px",
                                                objectFit: "cover",
                                                borderRadius: "8px",
                                            }}
                                        />
                                    </div>
                                    <div className="text-xl font-bold">{monster.name}</div>
                                    <div className="mt-2">
                                        <p className="text-sm">{monster.species}</p>
                                    </div>
                                    <div className="mt-auto">
                                        <p className="text-xs opacity-75">Hover to flip!</p>
                                    </div>
                                </div>
                            </div>

                            {/* Back side */}
                            <div
                                className="absolute w-full h-full rounded-xl bg-gradient-to-br from-pink-400 to-purple-600 p-4 text-white [transform:rotateX(180deg)] [backface-visibility:hidden]"
                            >
                                <div className="flex flex-col h-full">
                                    <div className="text-xl font-bold mb-4">Attributes</div>
                                    <div className="flex-grow">
                                        <p className="text-sm"><strong>Species:</strong> {monster.species}</p>
                                        <p className="text-sm"><strong>Description:</strong> {monster.description}</p>
                                    </div>
                                    <div className="flex justify-between items-center mt-auto">
                                        <button 
                                            onClick={() => handleRedirect(monster.name)} 
                                            className="px-4 py-2 bg-white text-purple-600 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
                                        >
                                            More Info
                                        </button>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div> //Refactor so there's less div containers???
        
    );
};


    return (
        <Theme>
            <div
                style={{
                    padding: "20px",
                    maxWidth: "0 auto",
                    margin: "0 auto",
                    background: "black",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "20px",
                }}
            >
            <form onSubmit={handleSubmit} style={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <div style={{ position: "relative", width: "100%", display: "flex", justifyContent: "center" }}>
                <input
                className="bg-[#222630] px-4 py-3 outline-none text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040]"
                name="text"
                value={searchName}
                onChange={handleChange}
                placeholder="Search for a monster"
                type="text"
                style={{
                    width: "200px", 
                    maxWidth: "100%", // Responsive on small screens, but won't stretch
                    minWidth: "280px", 
                    boxSizing: "border-box", 
                }}
                />
            </div>
            </form>


            {error && (
                <Text as="p" style={{ color: "red", marginTop: "10px" }}>
                    {error}
                </Text>
            )}
            <div style={{ marginTop: "20px" }}>
                {renderMonsters()}
            </div>
            </div>
        </Theme>
    );
};

export default SearchMonsterForm;
