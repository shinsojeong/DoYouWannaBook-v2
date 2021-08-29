import React from 'react';
import { useSelector } from 'react-redux';

import '../../styles/user_home.scss';

const SearchLocation = () => {
    const info = useSelector(state => state.libBook.selected_book);
    const location = useSelector(state => state.libBook.book_location);

    const createRow = (row, num) => {
        return(
            [...Array(row)].map((n, index) => {
                return(<div className="boxRow" key={index}>{createBox(index+1,num)}</div>)
            })
        );
    };

    const createBox = (idx, num) => {
        return(
            [...Array(num)].map((n, index) => {
                return(<div id={location.shelf===idx&&location.bookshelf===index+1?"highlight":"none"} className="box"/>)
            })
        );
    };

    const createShelf = (num) => { 
        return(
            [...Array(num)].map((n, index) => {
                return(<div id={location.shelf===index+1?"highlight":"none"} className="shelf"/>)
            })
        );
    };

    return (
        <div id="search_location">

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
                        <tr>
                           <td>{info.libb_title}</td>
                           <td>{info.libb_author}</td>
                           <td>{info.libb_code}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default SearchLocation;