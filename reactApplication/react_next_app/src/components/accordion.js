"use client";

import { useState } from "react";
import { Collapse } from "react-collapse";
import { AiOutlineMinus, AiOutlinePlus} from "react-icons/ai"
import styles from "./styles/accordion.css"

export default function Accordion({description}){
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen)
    }



    return (
        <div className = "Accordion">
            <div className = "AccordionTitle" onClick = {toggle}>
                <p>Description</p>
                <div className = "AccordionPlusMinusIcon">
                    {isOpen ? <AiOutlineMinus/> : <AiOutlinePlus/>}
                </div>
            </div>
            <Collapse isOpened = {isOpen}>
                <div className = "Description">
                    {description}
                </div>
            </Collapse>
        </div>
    );
};