import React from "react"
import Head from "next/head";

export default class Layout extends React.Component {
    render () {
        return(
            <div style={{minWidth:"700px"}}>
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
                    body {
                        display:flex;
                        flex-direction:row;
                        margin-right:auto;
                        margin-left:auto;
                        min-width:700px;
                        padding:20px;
                    }
                `}</style>
            </div>
        )
    } 
}