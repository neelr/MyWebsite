import React from "react";
import Layout from "../components/Layout";
import { FaGithub, FaFacebookSquare, FaLinkedin } from 'react-icons/fa';

export default class Index extends React.Component {
    render() {
        return (
            <Layout>
                <h1 style={{ color: "#e8233e" }}>Error 404!</h1>
                <h2>Seems that page wasn't found....</h2>
            </Layout>
        )
    }
}