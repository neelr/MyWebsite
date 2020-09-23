import React from "react"
import Head from "next/head";
import Link from "next/link";
import { FaGithub, FaFacebookSquare, FaLinkedin } from 'react-icons/fa';
/**
 * @
 */
export default class Layout extends React.Component {
    render() {
        return (
            <div style={{ height: "100%", marginTop: "20px" }}>
                <div style={{ backgroundColor: "#00abff", height: "10px", position: "absolute", top: 0, left: 0, width: "100vw" }}></div>
                <div className="cont">
                    <Head>
                        <title>neelr</title>
                        <script src="../static/script.js"></script>
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <meta name="og:title" content="neelr" />
                        <meta name="og:description" content="All about @neelr(Neel Redkar)!" />
                        <meta name="og:image" content="https://deploy-preview-1--neelr.netlify.com/static/self.jpg" />
                    </Head>
                    <div className="header">
                        <a href="/" style={{ flex: 1, textAlign: "center" }}>@neelr</a>
                        <a style={{ flex: 3 }}></a>
                        <div style={{ flex: 2, display: "flex" }}>
                            <Link href="/projects"><a>Projects</a></Link>
                            <a style={{ marginRight: "10px", marginLeft: "10px" }} href="https://notebook.neelr.dev">Notebook</a>
                            <a href="../static/resume.pdf">Resume</a>
                        </div>
                    </div>
                    <div id="main" style={{ display: "inline" }}>
                        {this.props.children}
                    </div>
                    <footer>
                        <p style={{ margin: "auto", fontWeight: "700" }}>Check out the <a href="https://github.com/neelr/mywebsite">source code!</a></p>
                        <div style={{ margin: "auto" }}>
                            <a style={{ color: "white" }} href="https://www.facebook.com/neel.redkar.16"><FaFacebookSquare size="2em" className="icon" /></a>
                            <a style={{ color: "white" }} href="https://github.com/neelr"><FaGithub size="2em" className="icon" /></a>
                            <a style={{ color: "white" }} href="https://www.linkedin.com/in/neel-redkar-1b8b1418b/"><FaLinkedin size="2em" className="icon" /></a>
                        </div>
                    </footer>
                    <style jsx global>{`
                        @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,700,800&display=swap');
                        body,html {
                            font-family: 'Open Sans', sans-serif;
                            font-weight:400;
                            height:100%;
                        }
                        .header {
                            width:100%;
                            display:flex;
                            top:0;
                            left:0;
                        }
                        .underline {
                            border-bottom:4px solid #6c7c84;
                            display:inline-block;
                            margin-bottom:10px;
                        }
                        html {
                            display:flex;
                        }
                        .cont {
                            width:700px;
                            height:100%;
                            display:flex;
                            flex-direction:column;
                        }
                        a {
                            text-decoration:none;
                            font-weight:700;
                            color:#00abff;
                        }
                        a:hover {
                            color:grey;
                            text-decoration:underline;
                        }
                        li {
                            margin:10px;
                        }
                        body {
                            height:100%;
                            display:flex;
                            margin-right:auto;
                            margin-left:auto;
                            width:700px;
                        }
                        @media screen and (max-width:740px) {
                            body {
                                width:100vw;
                            }
                            .cont {
                                width:93vw;
                                margin-left:4vw;
                                margin-right:3vw;
                            }
                        }
                        .icon:hover {
                            color:grey;
                            cursor:pointer;
                        }
                        .icon {
                            margin:10px;
                            color:white;
                            
                        }
                        footer {
                            height:50px;
                            display: flex;
                            flex-direction:column;
                            margin-top:auto;
                        }
                        h1 {
                            font-weight:800;
                        }
                        h2 {
                            font-weight:700;
                        }
                        .portrait {
                            width:150px;
                            border-radius:200px;
                        }
                        html {
                            background-color:#22242b;
                            color:white;
                        }
                    `}</style>
                </div>
            </div>
        )
    }
    componentDidMount() {
        let letters = ""
        document.onkeypress = e => {
            letters += e.key.toLowerCase();
            if (letters.includes("shrek")) {
                document.getElementById("main").innerHTML = "<img src='/static/yes.svg'/>"
            }
        };
    }
}