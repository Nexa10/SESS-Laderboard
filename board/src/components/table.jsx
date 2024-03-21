import React from "react";
import { useState, useEffect } from "react";
import {athletes} from "../api/api";
import Podium from "./Podium";
  
export default function Table() {
    const [data, setData] = useState([])

    useEffect(() => {
        setData(athletes)
    }, [])
    
    return(
        <section className="table__body">
            {
                data.length > 3 && <Podium rankingList={data.slice(0, 3)} />
            }
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Bridge Length</th>
                        <th>Weight Held</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => {
                        return <Row key={index} {...row} />
                    })}
                </tbody>
            </table>
        </section>
    )
}

function Row({rank, profileIconUrl, name, length, weight}){
    
    return(
        <tr>
            <td> {rank} </td>
            <td> <img src={profileIconUrl} alt={name} />{name}</td>
            <td>{length}</td>
            <td>{weight}</td>
        </tr>
    )
}