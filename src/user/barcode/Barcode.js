import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BarcodeScannerComponent from 'react-qr-barcode-scanner';

import { borrow } from '../../modules/libBook';
import { changeBar } from '../../modules/topBar';

import '../../styles/barcode.scss';

export default function Barcode() {
    const dispatch = useDispatch();

    const std_num = useSelector(state => state.user.user.std_num);
    const [state, setState] = useState(false);

    useEffect(() => {
        dispatch(
            changeBar(
                "null", 
                { title: "바코드 대출", data: null },
                "null",
                null,
                null,
                "small"
            )
        );
    }, [dispatch]);

    return (
        <div id="barcode" className="contents">
            {/** 바코드 촬영중일 때 표시할 페이지 */}
            {state &&
                <>
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
                    <button onClick={() => setState(false)}>종료</button>
                </>
            }

            {/** 바코드 촬영 전 표시할 페이지 */}
            {!state && 
                <>
                    <div id="container"/>
                    <button onClick={() => setState(true)}>시작</button>
                </>
            }
        </div>
    );
}