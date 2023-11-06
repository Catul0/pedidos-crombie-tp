"use client"
import { createContext, useContext, useState } from "react";
import { Score } from "@prisma/client";
import { CreateScore } from "@/interfaces/Score";
interface Children {
    children: React.ReactNode;
}

//ACA ES DONDE SE CREA EL CONTEXTO EN SI Y SE EXPORTAN TODAS LAS FUNCIONES QUE ABAJO DECLARAREMOS EN EL PROVIDER
export const ScoreContext = createContext<{
    scores: Score[];
    puntaje:number;
    createSellerScore: (score: Score, id: number) => Promise<void>;
    updateScore: (id: number, score: CreateScore) => Promise<void>;
    loadDeliveryScore: (id: number) => Promise<void>;
    loadSellerScores: (id: number) => Promise<void>;
    selectedScore: Score | null;
    setSelectedScore: (score: Score | null) => void;
}>({
    scores: [],
    puntaje:23,
    loadDeliveryScore: async (id: number) => { },
    createSellerScore: async (score: Score, id: number) => { },
    updateScore: async (id: number, score: CreateScore) => { },
    loadSellerScores: async (id: number) => { },
    selectedScore: null,
    setSelectedScore: (score: Score | null) => { }
})

export const useScores = () => {
    const context = useContext(ScoreContext)
    if (!context) {
        throw new Error('useScores must be used whithin a ScoresProviders')
    }
    return context
}

export const ScoresProvider = ({ children }: Children) => {
    const [scores, setScores] = useState<Score[]>([]);
    const [sumatoria, setSumatoria]=useState(0);
    const [puntaje, setPuntaje]=useState(0);
    const [selectedScore, setSelectedScore] = useState<Score | null>(null);

    async function loadDeliveryScore(id: number) {
        const res = await fetch("/api/score/" + id);
        const data = await res.json();
        let contador=0;
        setScores(data);
        for(let i=0; i<scores.length; i++){
            setSumatoria(sumatoria+scores[i].score)
            contador++;
        } 
        setPuntaje(sumatoria/contador);

    }

    //funcion para cargar los scoreos de 1 vendedor-----------------------------------------------------------------------------------------------------
    async function loadSellerScores(id: number) {
        try {
            const res = await fetch("/api/score/" + id);
            const data = await res.json();
            setScores(data);
        } catch (error) {
            console.log(error)
        }

    }
    async function loadSellerScore(id: number) {
        try {
            const res = await fetch("/api/orderScore/" + id);
            const data = await res.json();
            setScores(data);
        } catch (error) {
            console.log(error)
        }

    }

    //esta funcion lo que hace es crear un nuevo scoreo, y ademas agrega al estado donde estan todos los scoreos el nuevo
    //despues uno tiene que mostrar el estado ese nomas y se muestra actualizado
    async function createSellerScore(score: Score, id: number) {
        score.localId = id;
        score.deliveryId = null;
        const res = await fetch('/api/score', {
            method: 'POST',
            body: JSON.stringify(score),
            headers: {
                'content-Type': 'application/json'
            }
        })
        const newScore: Score = await res.json()
        setScores([...scores, newScore]);
    }


    //esta funcion es para actualizar la informacion de un scoreo
    async function updateScore(id: number, score: CreateScore) {
        const res = await fetch('/api/score/' + id, {
            body: JSON.stringify(score),
            method: 'PUT',
            headers: {
                'content-Type': 'application/json'
            }
        })
        const data = await res.json()
        setScores(scores.map(score => score.id === id ? data : score));
    }
    return (
        <ScoreContext.Provider
            value={{
                scores,
                puntaje,
                loadDeliveryScore,
                createSellerScore,
                updateScore,
                loadSellerScores,
                selectedScore,
                setSelectedScore
            }}>{children}
        </ScoreContext.Provider>
    )
}
