import React, { useState, useEffect } from 'react';
import { PEOPLE, CHORES } from './Conditions'
import { ref, onValue, set } from 'firebase/database';
import { db } from './firebase';

export default function Table() {
    // Get current week number (0-51)
    const currentWeek = Math.floor((new Date()).getTime() / (7 * 24 * 60 * 60 * 1000));
    const tableClass = "p-3 text-3xl";
    const headerClass = "p-3 text-1xl";

    // Replace localStorage with Firebase
    const [completedChores, setCompletedChores] = useState({});

    useEffect(() => {
        const choresRef = ref(db, `chores/week-${currentWeek}`);
        
        // Listen for changes
        const unsubscribe = onValue(choresRef, (snapshot) => {
            const data = snapshot.val() || {};
            setCompletedChores(data);
        });

        // Cleanup listener
        return () => unsubscribe();
    }, [currentWeek]);

    const handleRadioChange = (person) => {
        const newCompletedChores = {
            ...completedChores,
            [person]: !completedChores[person]
        };
        
        // Save to Firebase
        const choresRef = ref(db, `chores/week-${currentWeek}`);
        set(choresRef, newCompletedChores);
    };

    return (
        <table>
            <thead>
                <tr>
                    <th className={headerClass}>Person</th>
                    <th className={headerClass}>Chore</th>
                </tr>
            </thead>
            <tbody>
                {PEOPLE.map((person, index) => (
                    <tr key={person}>
                        <td className={tableClass}>{person}</td>
                        <td className={tableClass}>{CHORES[(index + currentWeek) % CHORES.length]}</td>
                        <td className={tableClass}>
                            <input 
                                type="checkbox"
                                name={`chore-${person}`}
                                checked={completedChores[person] || false}
                                onChange={() => handleRadioChange(person)}
                                className="w-5 h-5"
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}