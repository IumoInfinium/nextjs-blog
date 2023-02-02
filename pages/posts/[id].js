import Layout from '../../components/layout';
import { getAllPostIds, getPostContent } from '../../lib/posts';
import utilStyles from '../../styles/utils.module.css'
import Head from 'next/head';
import Date from '../../components/date';

export async function getStaticPaths(){
    const paths = getAllPostIds();
    return {
        paths,
        fallback : false,
    }
}
export async function getStaticProps({ params }){
    const postData = await getPostContent(params.id);

    return {
        props : { postData},
    }
}


export default function Post({ postData }){
    return (
        <Layout>

            <Head>
                <title> {postData.title}</title>
            </Head>

            <article>
                <h1 className={ utilStyles.headingX1 }> {postData.title} </h1>
                <div  className={ utilStyles.lightText }>
                    <Date dateString={postData.date}> </Date>
                </div>
            
                <div dangerouslySetInnerHTML={{__html : postData.contentHtml}} />
            </article>
        </Layout>
    );
}