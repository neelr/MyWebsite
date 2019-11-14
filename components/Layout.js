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
                    html {
                        display:flex;
                    }
                    @media screen and (max-width:740px) {
                        body {
                            width:100vw !important;
                        }
                        .cont {
                            width:96vw !important;
                            margin-left:4vw;
                        }
                    }
                    .cont {
                        width:700px;
                    }
                    body {
                        height:100%;
                        display:flex;
                        margin-right:auto;
                        margin-left:auto;
                        width:700px;
                    }
                `}</style>
            </div>
        )
    } 
}