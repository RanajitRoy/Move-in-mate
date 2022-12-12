import { useEffect, useState } from "react"
import "./home.css"

import { getUsers } from "../services/listing-service"


const port = process.env.PORT_ENV || "5001"
const host = window.location.host || "localhost"
const url = "http://" + host + ":" + port + "/img/"


function Home() {
    const [users, setUsers] = useState([])
    const [checked, setChecked] = useState(false)
    const [food, setFood] = useState("all")
    const [pet, setPet] = useState("all")
    const [smoke, setSmoke] = useState("all")

    const asycGetUsers = async () => {
        const data = await getUsers(food,pet,smoke)
        setUsers(data)
    }

    useEffect(()=>{
        asycGetUsers()
    },[]);

    const handleFoodChange = (e) => {
        setFood(e.target.value)
    }

    const handlePetChange = (e) => {
        setPet(e.target.value)
    }

    const handleSmokeChange = (e) => {
        setSmoke(e.target.value)
    }

    console.log(users)
    const listItems = users.map((user) =>
        <div key={user._id} style={{padding: 50}}>
            <img src={`${url}${user.pic}`} style={{width: 100}} />
            <div>Name: {user.name}</div>
            <div>Email: {user.email}</div>
            <div>Food: {user.food}</div>
            <div>Pet: {user.pet}</div>
            <div>Smoke: {user.smoke}</div>
        </div>
    );

    return (
        <div className="RegisterBody">
            <div className="RegisterBox"  style={{marginTop:30}}>
                <select value={food}  style={{padding: 5, margin:3}} onChange={handleFoodChange}>
                    <option value="all">all</option>
                    <option value="veg">veg</option>
                    <option value="non-veg">non-veg</option>
                </select>
                <select value={pet}  style={{padding: 5, margin:3}} onChange={handlePetChange}>
                    <option value="all">all</option>
                    <option value="pet">pets allowed</option>
                    <option value="non-pet">pets not allowed</option>
                </select>
                <select value={smoke}  style={{padding: 5, margin:3}} onChange={handleSmokeChange}>
                    <option value="all">all</option>
                    <option value="non-smoke">no smoking</option>
                </select>
                <button  style={{padding: 5, margin:3}} onClick={asycGetUsers}>search</button>
            </div>
            <div>
                {listItems}
            </div>
        </div>
    );
}

export default Home;