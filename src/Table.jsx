import React, { useState } from 'react';
import { PEOPLE, CHORES } from './Conditions'

export default function Table() {
    // Get current week number (0-51)
    const currentWeek = Math.floor((new Date()).getTime() / (7 * 24 * 60 * 60 * 1000));
    const tableClass = "p-3 text-3xl";

    // Add state management for radio buttons
    const [completedChores, setCompletedChores] = useState(() => {
        // Try to load saved state from localStorage
        const saved = localStorage.getItem(`chores-week-${currentWeek}`);
        
        // Check if there's a saved last week number
        const lastWeek = localStorage.getItem('lastWeek');
        
        // If it's a new week or no last week saved, clear the chores
        if (!lastWeek || parseInt(lastWeek) !== currentWeek) {
            localStorage.setItem('lastWeek', currentWeek.toString());
            return {};
        }
        
        return saved ? JSON.parse(saved) : {};
    });

    const handleRadioChange = (person) => {
        const newCompletedChores = {
            ...completedChores,
            [person]: !completedChores[person]
        };
        setCompletedChores(newCompletedChores);
        // Save to localStorage
        localStorage.setItem(`chores-week-${currentWeek}`, JSON.stringify(newCompletedChores));
        localStorage.setItem('lastWeek', currentWeek.toString());
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>Person</th>
                    <th>Chore</th>
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