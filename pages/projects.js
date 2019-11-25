import React from "react";
import Layout from "../components/Layout";

export default class Index extends React.Component {
    render () {
        return(
            <Layout>
                <h1 className="underline">Projects</h1>
                <h2>ScrapeMail ✉️</h2>
                <p>While I was looking for sponsorship emails, I decided to give up and look for a email scraper. As I went looking around, I realized literally all of them costed an amount of money! This is why I ended up creating ScrapeMail! ScrapeMail is an npm global module that can scrape email's from a website and scrapes one page deep! You can <a href="https://npmjs.org/~hacker719/scrapemail">find it on npm!</a></p>
                <hr/>
                <h2>The Debate Timer 👔</h2>
                <p>While looking around school, I realized that I hated using my phone timer in debate tournaments, and needing a new piece of paper for every debate! This is why I make The Debate Timer! It's a debate laptop app, to time a debate and flow one! <a href="https://github.com/neelr/thedebatetimer/releases">Check out the latest release on GitHub!</a></p>
                <hr/>
                <h2>Marker 🖊️</h2>
                <p>Marker is a nice little webpage that allows you to shorten your URL's and create your own website! All you need to do is add an ID, and then you're new URL will be at <code style={{backgroundColor:"grey"}}>https://marker.now.sh/id</code>! You can also edit your URL or markdown page later on with the password you put in at the start! <a href="https://marker.now.sh">Try it out at the webiste</a></p>
                <hr/>
                <h2>DayScraper 🎉</h2>
                <p>When emailing sponsors for emails, I love to put something nice and quirky at the end, and I decided National Holdiays would work! I then quickly made a National Holday scraper to speed emailing up, and thats how I got DayScraper! It scrapes off all national holiday's into one simple api! You can also find today's national holiday <a href="https://dayscraper.glitch.me">on the website!</a></p>
                <hr/>
                <h2>Find 🔎</h2>
                <p>This is a <a href="https://find.neelr.dev">fun little website</a> which updates my location and where I am through an IOS shortcut! This is a quirky fun way for people to get to know me!</p>
                <hr/>
                <h2>Gamblot 🃏</h2>
                <p>This is a slack bot that is meant for the Hack Club Slack workspace! It includes a blackjack game, normal partial doubling game, a lottery, and a roulette game! It is a fun project that helped me with my slack api skills! The current stack is <a href="https://glitch.com" style={{color:"#dd59dd"}}>Glitch</a>, Slack API, and <a style={{color:"rgb(97, 203, 255)"}} href="https://airtable.com">Airtable</a></p>
                <hr/>
                <h2>Notebook 📖</h2>
                <p>A cool project that I started to help me write more! <a href="https://notebook.neelr.dev">An online notebook</a> to type notes, thoughts articles, or whatever into, while improving my own JS Web Framework skills! This is really cool because it has CSS animations, uses Next.js, and has light/dark mode!</p>
                <hr/>
                <h2>RegHack 📝</h2>
                <p>A self host registration system with many capabilities and very detailed documentation! This automatically manages signups, storing data, sending emails, and even using secure qr codes to check people in and out! This is also equipped with a GUI with all of this! This is mostly to automate the registration process for some hackathons and other small events for quality registration without a ton of money! You can <a href="https://reghack.js.org">find its website here!</a></p>
                <hr/>
                <h2>terapeut 😥</h2>
                <p>terapeut is the online therapist open to all people <a style={{color:"orange"}} href="https://terapeut.enenra.org">through a simple website!</a>. terapeut enables you to speak your feelings, without having to have someone on the other side. This enables more people to access therapy at a time without waiting for live asssistance. terapeut also allows people to do this anonymously. One of the other great advantages of terapeut is that for people who feel anxiety and dont feel safe confessing to a human, a robot will not judge you and will always be accepting!</p>
                <hr/>
                <h2>HackClub Emoji 😝</h2>
                <p>Fun <a href="https://hackclub-emoji.now.sh">little side project</a> using the Slack API to make the backend to the website. Basically gathers all emoji's from the slack workspace and gives them in a readable website! The stack I used for this project was the Slack API, and <a href="https://now.sh">Now</a> for hosting.</p>
                <hr/>
                <h2>SmartRecycle ♻️</h2>
                <p>SmartRecycle is an machine learning app that sorts your waste into recycling, compost, and trash! This was made for my local science fair, and has gone aboveand beyond, to winning 2nd in states! You can actually <a href="https://apps.apple.com/us/app/smartrecycle/id1460199868?app=itunes&ign-mpt=uo%3D4">find this app on the app store</a>! The stack that I used is Google Cloud to host the machine learning bits and swift to integrate! Its also <a href="https://github.com/neelr/recyclesmartapp">on my GitHub!</a></p>
                <hr/>
                <h2>ExtempWebDownloader 📰</h2>
                <p>This is a resource where you can mass download and update articles for extemp. All you need to do is run the updater.py file and it will downlaod all the html files on many websites. This will take some time so be able to wait. you just have to run it again to update all the articles! This is good if you like to read the news of if you are in Extemp and need to mass download articles for a competition! <a href="https://github.com/neelr/extempwebdownloader">Check it out on my GitHub!</a></p>
            </Layout>
        )
    }
}