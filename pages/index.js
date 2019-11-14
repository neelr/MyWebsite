import React from "react";
import Layout from "../components/Layout";

export default class Index extends React.Component {
    render () {
        return(
            <Layout>
                <script defer src="https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=quote"></script>
                <div style={{width:"100%",display:"flex",justifyContent:"center",flexDirection:"column",textAlign:"center"}}>
                    <h1>Neel Redkar</h1>
                    <img src="../static/self.jpg" className="portrait" style={{marginRight:"auto",marginLeft:"auto"}}/>
                    <p style={{fontWeight:700}}>Fullstack Developer</p>
                    <p style={{marginTop:0,color:"#adb2b7"}}>Web Dev, App Dev, ML/AI</p>
                    <p style={{width:"50%",marginLeft:"auto",marginRight:"auto"}} id="quote"></p>
                    <p style={{width:"50%",marginLeft:"auto",marginRight:"auto"}} id="author"></p>
                </div>
                <h2>All about me!</h2>
                <p>Hello!</p>
                <style>{`
                    h1 {
                        font-weight:800;
                    }
                    h2 {
                        font-weight:700;
                    }
                    .portrait {
                        width:200px;
                        border-radius:200px;
                    }
                    html {
                        background-color:#22242b;
                        color:white;
                    }
                `}</style>
            </Layout>
        )
    }
}