import React, { useState, useRef, useEffect } from "react";
import '../App.css';
import Dropzone, { useDropzone } from "react-dropzone";

// Routing
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// AWS
import { Amplify } from 'aws-amplify';
import awsExports from '../aws-exports';
Amplify.configure(awsExports);



function Grid() {
    const ref = useRef();
    const [NFTImageSuccess, setNFTImageSuccess] = useState();
    const [NFTImage, setNFTImage] = useState();
    

    const NFTMetadataInputs = {
        name: "",
        description: "",
        image: `${NFTImage ? NFTImage : ""}`,
        // image: `${NFTImage ? NFTImage[0] : ""}`,
    }
    
    
    const [nft, setNFT] = useState(NFTMetadataInputs);

    function handleChange(e) {
        const value = e.target.value;
        setNFT(() => ({
            ...nft, [e.target.value]: value
        }))
    }

    useEffect(() => {
        console.log(nft);
    }, [setNFT])

    // useEffect(() => {
    //     setNFT(...nft, nft.image, NFTImage[0] )
    // }, [setNFTImage])

    

    const userAddress = "0x123456790"

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
        canvas.lineWidth = "0.1";
        canvas.stroke();
        }
    }, []);
  return (
    <div className="App">
        <h1>Million Dollar Homepage</h1>
        <div style={{
            display: "flex",
            left: "50%",
            transform: "translateX(-50%)",
            position: "absolute"
        }}>
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
            <div style={{
                width: "400px",
                height: "1000px",
                textAlign: "left",
                padding: "0px 0px 0px 50px"
            }}>
                <h2>Mint an NFT</h2>
                <p>Drag and drop an image:</p>
                
                    <Dropzone 
                        accept={"image/jpeg, image/png, image/webp"}
                        
                        onDrop={(acceptedFiles) => {
                            setNFTImageSuccess([])
                            setNFTImage(
                            acceptedFiles.map((upFile) => 
                                Object.assign(upFile, {
                                    preview: URL.createObjectURL(upFile)
                                }))
                            );
                        }}
                        name="NFTImage"
                        multiple={false}
                    >
                    {({ getRootProps, getInputProps }) => ( 
                    <div style={{
                        width: "200px",
                        height: "200px",
                        outline: "2px solid black"
                        }}
                        {...getRootProps({ className: "dropzone"})}
                    >
                        <input {...getInputProps()} />
                        {NFTImage?.map((upFile) => {
                            return(
                                <>
                                    <div>
                                        <img
                                            src={upFile.preview}
                                            key={upFile.name}
                                            width="200px"
                                            height="200px"
                                            alt="Uploaded Image"
                                        />
                                    </div>
                                </>
                            )
                        })}
                    </div>
                    )}
                    </Dropzone>
                <p>File uploaded locally: {NFTImage ? "True" : "False"}</p>
                {console.log(NFTImage)}
                {NFTImage?.map((upFile) => {
                    return(
                        <div>
                            <image
                                src={upFile.preview}
                                key={upFile.name}
                                width="400px"
                                height="1000px"
                                alt="Uploaded Image"
                                style={{
                                    zIndex: "9999"
                                }}
                            />
                        </div>
                    )
                })}

                <div style={{display: "inline-grid"}}>
                    <input 
                        key="name"
                        name="name"
                        placeholder="Name your NFT..."
                        onChange={handleChange}
                        value={nft.name}
                        // value={"Our test NFT :)"}
                        required
                    />

                    <input 
                        key="description"
                        name="description"
                        placeholder="Add a description..."
                        onChange={handleChange}
                        value={nft.description}
                        // value={"NFT Description"}
                        required
                    />

                    <input 
                        name="name"
                        value={userAddress}
                        readOnly
                    />
                    <input />

                    <button type="submit" onClick={(e) => alert(`nft submitted: ${JSON.stringify(nft)}`)}>MINT</button>
                </div>

                {console.log(nft)}

                </div>
            </div>
        </div>
  );
}

export default Grid;
