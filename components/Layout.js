import React from "react"
import Head from "next/head";

export default class Layout extends React.Component {
    render () {
        return(
            <div className="cont">
                <Head>
                    <title>neelr</title>
                    <script src="../static/script.js"></script>
                </Head>
                {this.props.children}
                <style jsx global>{`
                    @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,700,800&display=swap');
                    body,html {
                        font-family: 'Open Sans', sans-serif;
                        font-weight:400;
                        height:100%;
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
                    }
                    a {
                        text-decoration:none;
                        font-weight:700;
                        color:#00abff;
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
                            width:96vw;
                            margin-left:4vw;
                        }
                    }
                `}</style>
            </div>
        )
    } 
}