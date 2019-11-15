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
                <h2 className="underline">Who am I? 🤔</h2>
                <p>Hi! I'm a freshman in high school and a full stack web developer that lives in San Ramon currently! I love to help people learn to program and code through a <a style={{color:"rgb(255, 38, 38)"}} href="https://hackclub.com">Hack Club</a> hosted at my high school, DVHS! I love math, science, and building stuff with other people!</p>
                <h2 className="underline">What have I done?</h2>
                <p>A few cool things that I've organized and gone to throughout the years:</p>
                <ul>
                    <li>Organized <a style={{color:"yellow"}} href="https://angelhacks.org">AngelHacks LA</a> as a Director of Tech! A great experience overall, some more on it <a href="https://notebook.neelr.dev/stories/angelhacks">here.</a></li>
                    <li>Attended Flagship Summit, a youth leadership conference where I got to learn more about teaching people, organizing hackathons, and gaining sponsors! I also met cool people that helped me a lot like <a href="https://lachlanjc.me">@lachlanjc</a>, <a href="https://zachlatta.com/">@zrl</a>, and <a href="https://tom.preston-werner.com/">@mojombo.</a> Read more in my <a href="https://notebook.neelr.dev/stories/flagship">notebook</a>!</li>
                    <li>I went to the national debate tournament in Public Forum in Dallas TX! It was a great experience where I learned a lot about the topic and met many different people!</li>
                </ul>
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