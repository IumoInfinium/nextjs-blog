import Layout from "../../components/layout";
import { getPostContent } from "../../lib/posts";
import utilStyles from "../../styles/utils.module.css";
import clsx from 'clsx';
import Head from 'next/head';

export async function getStaticProps(){
    // const postData = await getPostContent('pre-rendering');
    const postData = await getPostContent('ssg-ssr');
    // console.log(postData);
    return {
        props : {
            postData
        }
    };
};

export default function SecondPost({ postData }){
    return (
        <Layout>
            <Head>
                <title> Second Post</title>
            </Head>
        <div>
            <h3> { postData.title }</h3>
            {/* <h3> { console.log(postData) }</h3> */}
            <div dangerouslySetInnerHTML={{__html : postData.date}} />
        </div>
        </Layout>
    )
}