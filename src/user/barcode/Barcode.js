import React, { useState, useEffect } from 'react';
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { useDispatch, useSelector } from 'react-redux';
import { borrow } from '../../modules/libBook';
import { changeBar } from '../../modules/topBar';
import '../../styles/barcode.scss';

const Barcode = () => {
    const dispatch = useDispatch();

    const std_num = useSelector(state => state.user.user.std_num);
    const [state, setState] = useState(false);

    useEffect(() => {
        dispatch(changeBar("null", {title:"바코드 대출", data:null}, "null", null, null, "small"));
    }, [dispatch]);

    return (
        <div id="barcode" className="contents">
            {state ? 
            <div id="scanner-container">
                <BarcodeScannerComponent
                width={500}
                height={400}
                onUpdate={(err, result) => {
                    if (result) {
                        setState(false);
                        dispatch(borrow(result.text, std_num));
                    }
                  }}
                />
            </div> 
            : <div id="container"/>}
            {state ? <button onClick={() => setState(false)}>종료</button>
            : <button onClick={() => setState(true)}>시작</button>}
        </div>
    );
};

export default Barcode;