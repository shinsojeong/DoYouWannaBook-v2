import React from 'react';
import { useSelector } from 'react-redux';

import { IoChevronBackSharp, IoCloseSharp } from 'react-icons/io5';
import { AiOutlineMenu } from 'react-icons/ai';
import '../../styles/top_bar.scss';

export default function TopBar() {
    const { left, right, lfunc, rfunc, size, center } = useSelector(state => state.topBar); //left, center, right, lfunc, rfunc, size

    const getLeft = () => {
        if (left === "back") {
            return (
                <div className="back" onClick={lfunc}>
                    <IoChevronBackSharp />
                </div>
            );
        } else if (left === "null") {
            return (
                <div className="null"></div>
            );
        } else if (left === "menu") {
            return (
                <div className="menu">
                    <AiOutlineMenu />
                </div>
            );
        } else if (left === "cancel") {
            return (
                <div className="cancel" onClick={lfunc}>
                    <p>취소</p>
                </div>
            );
        }
    }

    const getRight = () => {
        if (right === "cancel") {              //x표시
            return (
                <div className="cancel" onClick={rfunc}>
                    <IoCloseSharp />
                </div>
            );
        } else if (right === "create") {
            return (
                <div className="create" onClick={rfunc}>
                    <p>등록</p>
                </div>
            );
        } else if (right === "null") {
            return (
                <div className="null"></div>
            );
        }
    }
    
    return (
        <header className="topBar" id={size}>
            
            {/* left option : {back, null, cancel} */}
            <div className="left">
                {getLeft()}
            </div>

            {/* center option : {title}, {date, null} */}
            <div className="center">
                <p className="title">{center.title}</p>
                {center.data !== null 
                || 
                <p className="data">
                    {center.data}
                </p>
                }
            </div>

            {/* right option : {cancel, plus, create, null} */}
            <div className="right">
                {getRight()}
            </div>

        </header>
    );
}