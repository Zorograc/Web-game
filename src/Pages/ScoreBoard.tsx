import React, { useState, useEffect } from 'react';
import { getFirestore, collection, query, orderBy, limit, getDocs } from "firebase/firestore";

const ScoreBoard: React.FC = () => {
    const db = getFirestore();
    const [scores, setScores] = useState<any[]>([]);

    useEffect(() => {
        const fetchScores = async () => {
            try {
                const scoresRef = collection(db, "scores");
                const q = query(scoresRef, orderBy("score", "desc"), limit(10));
                const querySnapshot = await getDocs(q);
                const scoreData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setScores(scoreData);
            } catch (error) {
                console.error("Error fetching scores: ", error);
            }
        };
        fetchScores();
    }, []);

    return (
        <div className = "app">
        <center>
        <div className='transparent'>
            <h2>Lestvica</h2>
            <table>
                <thead>
                    <tr>
                        <th>Mesto</th>
                        <th>Uporabnik</th>
                        <th>Rezultat</th>
                    </tr>
                </thead>
                <tbody>
                    {scores.map((score, index) => (
                        <tr key={score.id}>
                            <td>{index + 1}</td>
                            <td>{score.user}</td>
                            <td>{score.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <a href='/game'><h1>Nazaj na meni</h1></a>
        </div>
        
        
        
        </center>
        </div>
    );
};

export default ScoreBoard;
