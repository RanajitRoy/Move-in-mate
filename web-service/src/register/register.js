import { Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import './register.css'

import { handleUserRegistration } from "../services/login-service"


function Register(){
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState("")
    const [pass, setPass] = useState("")
    const [email, setEmail] = useState("")
    const [food, setFood] = useState("veg")
    const [pet, setPet] = useState("pet")
    const [smoke, setSmoke] = useState("smoke")
    const [registered, setRegistered] = useState(false)


    const handleRegisterClick = async () => {
        setLoading(true);
        try{
            const res = await handleUserRegistration({
                name: name,
                email: email,
                pass: pass,
                smoke: smoke,
                pet: pet,
                food: food
            })
            setRegistered(true)
        } finally {
            setLoading(false);
        }
    }

    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePassChange = (e) => {
        setPass(e.target.value)
    }

    const handleFoodChange = (e) => {
        setFood(e.target.value)
    }

    const handlePetChange = (e) => {
        setPet(e.target.value)
    }

    const handleSmokeChange = (e) => {
        setSmoke(e.target.value)
    }

    if(registered) {
        return <Navigate to="/login"/>
    } else return (
        <div className="RegisterBody">
            <div className="RegisterBox">
                <input type="text" placeholder='name' value={name} onChange={handleNameChange} />
                <input type="email" placeholder='email' value={email} onChange={handleEmailChange} />
                <input type="password" placeholder='password' value={pass} onChange={handlePassChange} />
                <div onChange={handleFoodChange}>
                    <input type="radio" value="veg" name="food" checked={food === "veg"} /> Veg
                    <input type="radio" value="non-veg" name="food" checked={food === "non-veg"}/> Non-veg
                </div>
                <div onChange={handlePetChange}>
                    <input type="radio" value="pet" name="pet" checked={pet === "pet"} /> Pets allowed
                    <input type="radio" value="no-pet" name="pet" checked={pet === "no-pet"}/> Pets not allowed
                </div>
                <div onChange={handleSmokeChange}>
                    <input type="radio" value="smoke" name="smoke" checked={smoke === "smoke"} /> Smoking allowed
                    <input type="radio" value="no-smoke" name="smoke" checked={smoke === "no-smoke"}/> Smoking not allowed
                </div>
                <input type="button" value="Register" disabled={loading} onClick={handleRegisterClick}/>
            </div>
        </div>
    );
}

export default Register;