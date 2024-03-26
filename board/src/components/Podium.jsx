import { useState, useEffect } from "react"
import icons from "../helper/profileIcons";


export default function Podium({rankingList}) {
    const[list, setList] = useState([]);

    useEffect(() => {
        // swaps the first two elements in the array, to make number 1 show in the center
        const swap = (arr, i, j) => {
            const temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }

        const temp_list = [...rankingList].map((item, idx) => {
            item.pos = idx + 1;
            return item;
        })
        
        if(temp_list.length > 1)
            swap(temp_list, 0, 1);

        setList(temp_list);
    
    }, [rankingList]);

    return(
        <section className="top3" >
            {
                list.map((row, index) => {
                    return <PodiumRow key={index} {...row} />
                })
            }
        </section>
    )
};


const style = {
    1:{
        div: { backgroundColor: '#8542d1', minHeight: '200px'},
        span: {fontSize: '100px'}
    },
    2:{
        div: {backgroundColor: '#ffae00', minHeight: '180px'},
        span: {fontSize: '80px'}
    },
    3:{
        div: {backgroundColor: '#ff4d4d', minHeight: '160px'},
        span: {fontSize: '60px'}
    }
}

function PodiumRow({name, length, weight, profileIconIndex, pos}){
 
    return(
        <div className="top_rank" style={style[pos].div}>
            <span className="rank_num" style={style[pos].span}>
                {pos}
            </span>
            <img 
                src={icons[profileIconIndex]} 
                alt="" 
            />
            <p style={{
                fontSize: 'clamp(20px, calc(20px + 1vw), 45px)',
            }}
            >   
                {name}
            </p>
            <span style={{color:"white", fontSize:"15px", opacity:"70%"}}>
                {`L: ${length}`}
            </span>
            <span style={{color:"white", fontSize:"15px", opacity:"70%"}}>
                {`W: ${weight}`}
            </span>
        </div>
    )
};