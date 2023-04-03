// @ts-nocheck
import axios from 'axios';
import React, { useState } from 'react'
import './Cardcomponent.scss';

const Cardcomponent = ({ elem }) => {

    return (
        <>
            <div className='card_container'>
                <div className='card_container_image'>
                    <h4>Avatar</h4>
                    <img src={elem.user.avatar_url} />
                </div>
                <div className='card_container_heading heading1'>
                    <h4>Repo Name</h4>
                    <div>{elem.reponame}</div>
                </div>
                <div className='card_container_heading heading1'>
                    <h4>Stars</h4>
                    <div>{elem.score}</div>
                </div>
                <div className='card_container_heading heading1'>
                    <h4>Description</h4>
                    <div>{elem.description}</div>
                </div>
                <div className='card_container_heading heading1'>
                    <h4>language</h4>
                    <div>{elem.language}</div>
                </div>
            </div>
        </>
    )
}

export default Cardcomponent;