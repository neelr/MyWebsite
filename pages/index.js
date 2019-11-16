import React from "react";
import Layout from "../components/Layout";
import Link from "next/link";

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
                <h2 className="underline">Who am I? <span aria-hidden="true">🤔</span></h2>
                <p>Hi! I'm a freshman in high school and a full stack web developer that lives in San Ramon currently! I love to help people learn to program and code through a <a style={{color:"rgb(255, 38, 38)"}} href="https://hackclub.com">Hack Club</a> hosted at my high school, DVHS! I love math, science, and building stuff with other people!</p>
                <h2 className="underline">What have I done?</h2>
                <p>A few cool things that I've organized and gone to throughout the years:</p>
                <ul>
                    <li>Organized <a style={{color:"yellow"}} href="https://angelhacks.org">AngelHacks LA</a> as a Director of Tech! A great experience overall, <a href="https://notebook.neelr.dev/stories/angelhacks">check it out on my notebook!</a></li>
                    <li>Attended <a style={{color:"red"}} href="https://flagshipsummit.com">Flagship Summit</a>, a youth leadership conference where I got to learn more about teaching people, organizing hackathons, and gaining sponsors! I also met cool people that helped me a lot like <a href="https://lachlanjc.me">@lachlanjc</a>, <a href="https://zachlatta.com/">@zrl</a>, and <a href="https://tom.preston-werner.com/">@mojombo.</a> Read more <a href="https://notebook.neelr.dev/stories/flagship">in my notebook</a>!</li>
                    <li>I went to the national debate tournament in Public Forum in Dallas TX! It was a great experience where I learned a lot about the topic and met many different people!</li>
                    <li>I had the wonderful oppertuinity to win 1st place in my local science fair, and 2nd place statewide for an app that used machine learning to classify waste into recycling, trash, and compost! It was a great experience where I learned more about app development and machine learning! You can check the cool code over <a style={{color:"green"}} href="https://github.com/neelr/recyclesmartapp">at the github</a> and the actual app over <a href="https://apps.apple.com/us/app/smartrecycle/id1460199868?app=itunes&ign-mpt=uo%3D4">on the app store!</a></li>
                    <li>At <a href="https://cloud.withgoogle.com/next/sf/" style={{color:"#4285f4"}}>Next19</a> was the real realization, that even though I was a kid, I can still do things to affect people, and that shouldn't hold me back. This is when Google reached out and offered me a free pass to a Google conference in San Fransisco. This exploded my mind, because I was just tinkering and home, and the fact that this big huge dream company of mine had asked me to attend was unreal. When I got there, I was so nervous, but I ended up making a lot of friends, and learned a lot about ML that would help me with my science fair!</li>
                </ul>
                <h2 className="underline">Projects</h2>
                <p>This is going to be pretty long, so <Link href="/projects"><a>I'll link to it here!</a></Link></p>
                <h2 className="underline">Contact Me!</h2>
                <p>If you're interested in talking and you're an interesting person, feel free to email me at <a href="mailto:neel.redkar@outlook.com">neel.redkar@outlook.com</a> or hit me up at my slack handle at <strong>@neelr</strong>!</p>
            </Layout>
        )
    }
}