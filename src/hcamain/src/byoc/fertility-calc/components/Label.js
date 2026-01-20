'use client';
import { useState } from 'react';
//import parse from '../js/react-parser/react-parser.js';
import parse from 'html-react-parser';
import InfoText from './InfoText';

export default function Label({ headerTitle, helpText, id, isLabel, rightAligned }) {
    const [visible, setIsVisible] = useState(false);
    const helpTextInfo = parse(helpText);

    return (
        <>
            <div className="label-container">
                <div className="label-title">
                    {!isLabel && headerTitle}
                    {isLabel && <label className="select__label" htmlFor={id}>{headerTitle}</label>}
                    <button
                        className="select__info"
                        onClick={(e) => {
                            e.preventDefault();
                            setIsVisible(true);
                        }}
                        title={headerTitle + " Additional Information"}
                        aria-label={headerTitle + " Additional Information"}
                    >
                        <span className="select__info-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
                                <defs>
                                    <clipPath id="clipPath">
                                        <rect id="Rectangle_1701" data-name="Rectangle 1701" width="30" height="30" transform="translate(0 -0.26)" fill="none" stroke="#04cac7" strokeWidth="1" />
                                    </clipPath>
                                </defs>
                                <g id="Group_2627" data-name="Group 2627" transform="translate(-831.061 -419.809)">
                                    <text id="_" data-name="?" transform="translate(840.997 441.928)" fill="#04cac7" fontSize="20" fontFamily="BrownStd-Bold, BrownStd" fontWeight="700"><tspan x="0" y="0">?</tspan></text>
                                    <g id="Group_2595" data-name="Group 2595" transform="translate(831.061 420.069)">
                                        <g id="Group_2496" data-name="Group 2496" clipPath="url(#clipPath)">
                                            <path id="Ellipse_34" data-name="Ellipse 34" d="M6.87-8A14.87,14.87,0,1,1-8,6.87,14.887,14.887,0,0,1,6.87-8Zm0,28.5A13.631,13.631,0,1,0-6.761,6.87,13.646,13.646,0,0,0,6.87,20.5Z" transform="translate(8 8)" fill="#072342" />
                                        </g>
                                    </g>
                                </g>
                            </svg>
                        </span>
                    </button>
                </div>
            </div>

            {visible && <InfoText headerTitle={headerTitle} helpTextInfo={helpTextInfo} setIsVisible={setIsVisible} rightAligned={rightAligned} />}
        </>
    );
}