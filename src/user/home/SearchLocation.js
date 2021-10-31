import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { changeBar } from '../../modules/topBar';
import '../../styles/home.scss';

export default function SearchLocation() {
    const dispatch = useDispatch();
    const history = useHistory();

    const {
        libb_title,
        libb_author,
        libb_code
    } = useSelector(state => state.libBook.selected_book);
    const { 
        shelf,
        bookshelf
     } = useSelector(state => state.libBook.book_location);

    useEffect(() => {
        dispatch(
            changeBar(
                "back", 
                { title: "도서 위치", data: null }, 
                "null", 
                () => history.goBack(), 
                null, 
                "small"
            )
        );
    }, [dispatch, history]);

    const createRow = (row, num) => {
        return(
            [...Array(row)].map((n, index) => {
                return(<div className="boxRow" key={index}>{createBox(index+1,num)}</div>)
            })
        );
    }

    const createBox = (idx, num) => {
        return(
            [...Array(num)].map((n, index) => {
                return(<div id={(shelf === idx) && (bookshelf === index+1) ? "highlight" : "none"} className="box"/>)
            })
        );
    }

    const createShelf = (num) => { 
        return(
            [...Array(num)].map((n, index) => {
                return(<div id={shelf === index+1 ? "highlight" : "none"} className="shelf"/>)
            })
        );
    }

    return (
        <div id="search_location" className="contents">

            <div id="location1">
                {createRow(4, 6)}
                <div id="door">입구</div>
            </div>
            
            <div id="location2">
                <div id="bookshelf">
                    <div className="shelf">
                        {createShelf(4)}
                    </div>
                </div>
                <table id="book_info">
                    <tbody>
                        <tr><td id="td_title">{libb_title}</td></tr>
                        <tr><td>{libb_author}</td></tr>
                        <tr><td>{libb_code}</td></tr>
                    </tbody>
                </table>
            </div>

        </div>
    );
}