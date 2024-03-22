import React from "react";
import { useState, useEffect, useCallback} from "react";
import Podium from "./Podium";
import InsertModal from "./InsertModal";
import icons from "../helper/profileIcons";
  
export default function Table() {
    const [data, setData] = useState([]) // expects a sorted array of objects
   
    const url = "http://localhost:8080/getAll";

    const triggerFetch = useCallback(() => {
        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        .then(response=>{
            if(response.ok) return response.json()
        })
        .then(data=>setData(data))
        .catch((err)=>console.log(err))
    })

    useEffect(() => {
        triggerFetch();
    }, [[], data])
    
    return(
        <>
            <InsertModal onTrigger={triggerFetch}/>
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
                        {
                            // server sorts/ranks the data before sending it to the client
                            // shows podium data first if data length is greater than 6
                            data &&
                            data.length > 3?
                            data.slice(3).map((row, index) => {
                                return <Row key={index} {...row} rank = {index+4}/>
                            })
                            :data.map((row, index) => {
                                return <Row key={index} {...row} rank = {index+1}/>
                            })
                        }
                    </tbody>
                </table>
            </section>
        </>
    )
}

function Row({profileIconIndex, name, length, weight, rank}){
    
    return(
        <tr>
            <td> {rank} </td>
            <td> <img src={icons[profileIconIndex]} alt={name} />{name}</td>
            <td>{length}</td>
            <td>{weight}</td>
        </tr>
    )
}