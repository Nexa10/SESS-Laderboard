import { useState, useEffect } from "react"
export default function Podium({rankingList}) {
    const [key, setKey] = useState(0);

    // Effect hook to update the key, which triggers re-rendering
    useEffect(() => {
        setKey(prevKey => prevKey + 1); // Increment the key to force re-render
    }, []);
    return(
        <section className="top3" key={key}>
            <div className="top_rank" >
                <span className="rank_num" >{rankingList[0].rank}</span>
                <img src={rankingList[0].profileIconUrl} alt="" />
                <p>{rankingList[0].name}</p>
            </div>
            
            <div className="top_rank">
                <span className="rank_num">{rankingList[1].rank}</span>
                <img src={rankingList[1].profileIconUrl} alt="" />
                <p>{rankingList[1].name}</p>
            </div>

            <div className="top_rank">
                <span className="rank_num">{rankingList[2].rank}</span>
                <img src={rankingList[2].profileIconUrl} alt="" />
                <p>{rankingList[2].name}</p>
            </div>
        </section>
    )
}