import React, { Component, useState } from 'react'
import {Link} from 'react-router-dom'

export const Friends = (props) => {

    const [viewUsers, setViewUsers] = useState(false)
    const [raceName, setRaceName] = useState("")
    const [alreadyFollow, setAlreadyFollow] = useState(false)
    const [alreadyFollowMessage, setAlreadyFollowMessage] = useState("You are already following this runner")

    const handleClick = (event) => {
        if(event.target.className === "follow-button"){
            const findFollowing = props.friends.find(friend=>friend["follower"] == localStorage.user && friend["following"] == event.target.value)
            if(!findFollowing){
                setAlreadyFollow(false)
                props.followUser(event.target.value)
            }else {
                setAlreadyFollow(true)
            }
        }else if(event.target.className === "view-profile"){
            console.log(event.target.value)
        }else if(event.target.className === "unfollow-button"){
            props.removeFollowing(event.target.value)
            props.unFollow(event.target.value)
        }
    }

    const sameRaceClick = (name) => {
        setViewUsers(true)
        setRaceName(name)
    }

    const showRunners = () => {
        return props.users.map(user=>{
            if(user["username"] !== "alexischilinski" && user["username"] !== localStorage.username){
                const userPhoto = props.photos.find(photo=>photo["user"] == user["id"])
                if(userPhoto){
                    return [
                        <div className="friend-icon">
                            {/* <img className="friend-photo" src={userPhoto["photo"]}></img> */}
                            <Link to={`/friends/${user["id"]}`}><div className="friend-photo" style={{backgroundImage: `url(${userPhoto["photo"]})`, backgroundSize: "100%", backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundColor: 'black'}}></div></Link>
                            <p>{user["first_name"]} {user["last_name"]}
                            <button className="follow-button" onClick={handleClick} value={user["id"]}>Follow</button>
                            {/* <Link to={`/friends/${user["id"]}`}><button className="view-profile" value={user["id"]}>View Profile</button></Link> */}
                            </p>
                        </div>
                    ]
                }else return [
                        <div className="friend-icon">
                            <Link to={`/friends/${user["id"]}`}><div className="friend-photo" style={{backgroundImage: `url('https://i.imgflip.com/1slnr0.jpg')`, backgroundSize: "100%", backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundColor: 'black'}}></div></Link>
                            {/* <img className="friend-photo" src="https://i.imgflip.com/1slnr0.jpg"></img> */}
                            <p>{user["first_name"]} {user["last_name"]}
                            <button className="follow-button" onClick={handleClick} value={user["id"]}>Follow</button>
                            {/* <Link to={`/friends/${user["id"]}`}><button className="view-profile" value={user["id"]}>View Profile</button></Link> */}
                            </p>
                        </div>
                    ]
                }
            })
    }


    // const showRunners = () => {
    //     return props.users.map(user=>{
    //         if(user["username"] !== "alexischilinski" && user["username"] !== localStorage.username){
    //             return [
    //                 <p>{user["first_name"]} {user["last_name"]} <button className="follow-button" onClick={handleClick} value={user["id"]}>Follow</button></p>
    //             ]
    //         }
    //     })
    // }
    
    const showFollowing = () => {
        return props.friends.map(friend=>{
            if(friend["follower"] == localStorage.user){
                const findFriend = props.users.find(user=>user["id"] === friend["following"])
                if(typeof findFriend !== 'undefined'){
                    const userPhoto = props.photos.find(photo=>photo["user"] == findFriend["id"])
                    if(userPhoto){
                        return <div className="follow-icon">
                                <Link to={`/friends/${findFriend["id"]}`}><div className="friend-photo" style={{backgroundImage: `url(${userPhoto["photo"]})`, backgroundSize: "100%", backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundColor: 'black'}}></div></Link>
                                {/* <img className="friend-photo" src={userPhoto["photo"]}></img> */}
                                <p>{findFriend["first_name"]} {findFriend["last_name"]} 
                                {/* <Link to={`/friends/${findFriend["id"]}`}>
                                <button className="view-profile" value={findFriend["id"]}>View Profile</button>
                                </Link> */}
                                </p>
                                <button onClick={handleClick} className="unfollow-button" value={friend["id"]}>Unfollow</button>
                            </div>
                    }else return<div className="follow-icon">
                                <Link to={`/friends/${findFriend["id"]}`}><div className="friend-photo" style={{backgroundImage: `url('https://i.imgflip.com/1slnr0.jpg')`, backgroundSize: "100%", backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundColor: 'black'}}></div></Link>
                                {/* <img className="friend-photo" src="https://i.imgflip.com/1slnr0.jpg"></img> */}
                                <p>{findFriend["first_name"]} {findFriend["last_name"]}
                                {/* <Link to={`/friends/${findFriend["id"]}`}>
                                <button className="view-profile" value={findFriend["id"]}>View Profile</button>
                                </Link> */}
                                <button onClick={handleClick} className="unfollow-button" value={friend["id"]}>Unfollow</button>
                                </p>
                            </div>
                }
            }
        })
    }

    const showFollowers = () => {
        return props.friends.map(friend=>{
            if(friend["following"] == localStorage.user){
                const findFriend = props.users.find(user=>user["id"] === friend["follower"])
                if(typeof findFriend !== 'undefined'){
                    const userPhoto = props.photos.find(photo=>photo["user"] == findFriend["id"])
                    if(userPhoto){
                        return <div className="follow-icon">
                            <Link to={`/friends/${findFriend["id"]}`}><div className="friend-photo" style={{backgroundImage: `url(${userPhoto["photo"]})`, backgroundSize: "100%", backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundColor: 'black'}}></div></Link>
                            {/* <img className="friend-photo" src={userPhoto["photo"]}></img> */}
                            <p>{findFriend["first_name"]} {findFriend["last_name"]} 
                            {/* <Link to={`/friends/${findFriend["id"]}`}>
                            <button className="view-profile" value={findFriend["id"]}>View Profile</button>
                            </Link> */}
                            </p>
                        </div>
                    }else return <div className="follow-icon">
                            <Link to={`/friends/${findFriend["id"]}`}><div className="friend-photo" style={{backgroundImage: `url('https://i.imgflip.com/1slnr0.jpg')`, backgroundSize: "100%", backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundColor: 'black'}}></div></Link>
                            {/* <img className="friend-photo" src="https://i.imgflip.com/1slnr0.jpg"></img> */}
                            <p>{findFriend["first_name"]} {findFriend["last_name"]} 
                            {/* <Link to={`/friends/${findFriend["id"]}`}>
                            <button className="view-profile" value={findFriend["id"]}>View Profile</button>
                            </Link> */}
                            </p>
                        </div>
                }
            }
        })
    }

    const sameRace = () => {
        const yourRaces = props.userRaces.filter(userRace=>userRace["user"] == localStorage.user && !userRace["completed"])
        return yourRaces.map(yourRace=>{
            return <button onClick={() => sameRaceClick(yourRace["race_name"])} className="same-race" value={yourRace["race_name"]}>{yourRace["race_name"]}</button>
        })
    }

    const showSameRaceRunners = (name) => {
        const otherUsers = props.users.filter(user=>user["id"] != localStorage.user)
        return props.userRaces.map(userRace=>{
            if(userRace["race_name"] == name && !userRace["completed"]){
                const sameRaceUser = otherUsers.find(user=>user["id"] == userRace["user"])
                if(typeof sameRaceUser != "undefined"){
                    const userPhoto = props.photos.find(photo=>photo["user"] == sameRaceUser["id"])
                    if(userPhoto){
                        return <div className="friend-icon">
                                <Link to={`/friends/${sameRaceUser["id"]}`}><div className="friend-photo same-race" style={{backgroundImage: `url(${userPhoto["photo"]})`, backgroundSize: "100%", backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundColor: 'black'}}></div></Link>
                                <p>{sameRaceUser["first_name"]} {sameRaceUser["last_name"]}</p>
                            </div>
                    }else return <div className="friend-icon">
                            <Link to={`/friends/${sameRaceUser["id"]}`}><div className="friend-photo same-race" style={{backgroundImage: `url('https://i.imgflip.com/1slnr0.jpg')`, backgroundSize: "100%", backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundColor: 'black'}}></div></Link>
                            <p>{sameRaceUser["first_name"]} {sameRaceUser["last_name"]}</p>
                        </div>
                }
            }
        })
    }

    // console.log(showRunners())

    return(
        <>
            {alreadyFollow ? <p className="error">{alreadyFollowMessage}</p> : null}
            <div className="friends">
                {localStorage.token ? [
                    <div className="following-followers">
                        <div className="your-friends">
                            <div className="showfollowers">
                            <h1>Following</h1>
                            <div className="followers">{showFollowing()}</div>
                            </div>
                        </div>
                        <div className="your-friends">
                            <div className="showfollowers">
                            <h1>Followers</h1>
                            <div className="followers">{showFollowers()}</div>
                            </div>
                        </div>
                    </div>,
                    <div className="all-users">
                        <div className="showusers">
                        <h1>All Runners</h1>
                        <div className="followers">{showRunners()}</div>
                        </div>
                    </div>
                ]: null}
            </div>
            <div className="same-race-div">
                <h1>Find others training for the same race</h1>
                <div>{sameRace()}</div>
                <div className="same-race-runners">{viewUsers ? showSameRaceRunners(raceName) : null}</div>
            </div>
        </>
    )
}