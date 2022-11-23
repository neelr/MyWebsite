import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Box, Text } from 'theme-ui'
import styles from '../styles/Home.module.css'
import { getQuote, Data } from './api/quote'

export default function Home({ quote, ...props }: { quote: Data }) {
  return (
    <Box sx={{ display: "flex", mt: "100px" }}>
      <Box sx={{
        mx: "auto",
        width: ["90vw", "65vw"],
        flexDirection: "column",
      }}>
        <Text variant="heading">Hi, I&rsquo;m Neel.</Text>
        <Text as='p' sx={{ fontStyle: "italic" }}>{quote.quote}</Text>
        <Text as='p' sx={{ fontStyle: "italic" }}>- {quote.author}</Text>
        <Box>
          <Image src={"/hippo.png"} width={200} height={200} alt="hippo" />
        </Box>
      </Box>
    </Box >
  )
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  let data = await getQuote();
  return {
    props: {
      quote: data
    }
  }
}
