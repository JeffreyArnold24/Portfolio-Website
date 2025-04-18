"use client";

import React, { useState} from "react";
import { Collapse } from "react-collapse";
import { AiOutlineMinus, AiOutlinePlus} from "react-icons/ai"
import styles from "./accordion.css"

export default function Accordion({title, description}){
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen)
    }



    return (
        <div className = "Accordion">
            <div className = "AccordionTitle" onClick = {toggle}>
                <p>{title}</p>
                <div className = "AccordionPlusMinusIcon">
                    {isOpen ? <AiOutlineMinus/> : <AiOutlinePlus/>}
                </div>
            </div>
            <Collapse isOpened={isOpen}>
                <div className="Description">
                    {description.split('\n\n').map((block, blockIndex) => (
                        <span key={blockIndex}>
                            {block.split('\n').map((line, lineIndex) => (
                                <React.Fragment key={`${blockIndex}-${lineIndex}`}>
                                    <span>{line}</span>
                                    {lineIndex < block.split('\n').length - 1 ? <br /> : null}
                                </React.Fragment>
                            ))}
                            {blockIndex < description.split('\n\n').length - 1 && (
                                <>
                                    <br />
                                    <br />
                                    <hr />
                                    <br />
                                </>
                            )}
                        </span>
                    ))}
                </div>
            </Collapse>
        </div>
    );
};