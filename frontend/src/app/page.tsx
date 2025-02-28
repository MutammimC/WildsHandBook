"use client";

import { useState, useEffect } from "react";
import { getMonstersByName, getMonsterById, createMonster } from "../api/monsterApi";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { File } from "buffer";
import CreateMonsterForm from "../components/CreateMonsterForm";
import SearchMonsterForm from "../components/SearchMonsterForm";
import HorizontalBarChart from "@/components/MostFought"
import SignUpForm from "@/components/SignUpForm";
type Monster = {
    name: string;
    species: string;
    description: string;
    image: File | null;
};

export default function Home() {
    
    
    return (
        
        <div
            style={{
                padding: "20px",
                width: "100%",
                minHeight: "100vh", // Full height but only as needed
                background: "black", // Fixed gradient syntax
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "20px", // Space between forms
                justifyContent: "flex-start", // Stack at the top
            }}
        >
            {/* Search Monster */}
            <SearchMonsterForm />

            {/* Create Monster */}
            <CreateMonsterForm />

            <HorizontalBarChart />

            
        </div>
    );
}