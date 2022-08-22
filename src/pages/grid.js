import React, { useState, useRef, useEffect } from "react";
import '../App.css';

// Routing
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// AWS
import { Amplify } from 'aws-amplify';
import awsExports from '../aws-exports';
Amplify.configure(awsExports);

function Grid() {
    const ref = useRef();

  useEffect(() => {
    // const cnv=document.getElementById("MillionDollarHomepage")
    const canvas = ref.current.getContext("2d");
    // small units
    for (var i = 5; i <= 1000; i = i + 5) {
      // verticals
      canvas.moveTo(i, 0);
      canvas.lineTo(i, 1000);

      // horizontals
      canvas.moveTo(0, i);
      canvas.lineTo(1000, i);

      canvas.strokeStyle = "lightgrey";
      canvas.lineWidth = "0.5";
      canvas.stroke();
    }
  }, []);
  return (
    <div className="App">
      
        <h1>Million Dollar Homepage</h1>
        <canvas
            id="MillionDollarHomepage"
            ref={ref}
            className="Canvas"
            width={1000}
            height={1000}
            // width={window.innerWidth}
            // height={window.innerHeight}
            onClick={(e) => {
            alert(
                // `TokenID: ${e.clientX * e.clientY} -- 
                // X-Value: ${e.clientX - e.screenX}, 
                // Y-Value: ${e.clientY}`

                `x*y: ${e.clientX * e.clientY} -- 
                X-Client: ${e.clientX}, 
                X-Screen:${e.screenX},
                Y-Value: ${e.clientY}`

                // `TokenID: ${e.screenX * e.screenY} --
                // X-Value: ${e.screenX},
                // Y-Value: ${e.screenY}`
            );
            // alert(e);
            }}
        />
      
    </div>
  );
}

export default Grid;
