import fs from 'fs';
import path from 'path';

// for getting meta data for the markdown file contents
import matter from 'gray-matter';

// for rendering markdown content
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData(){

    // get file names under /posts directory
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {

        // remove .md for making an id
        const id = fileName.replace(/\.md$/,'');

        // read markdown file
        const fullPath = path.join(postsDirectory,fileName);
        const fileContents = fs.readFileSync(fullPath,'utf8');

        // use gray-matter module to parse meta-data
        const matterResult = matter(fileContents);
        
        // group-up every id, with its data
        return {
            id,
            ...matterResult.data,
        };
    });

    // sort posts by date
    return allPostsData.sort((a,b) => {
        if(a.data < b.date){
            return 1;
        }
        else{
            return -1;
        }
    })
}

// custom created for learning and testing
// get Content for a post
export async function getPostContent(id){
    const filePath = path.join(postsDirectory,`${id}.md`);
    const fileContents = fs.readFileSync(filePath, 'utf8');

    // parse metadata
    const matterResult = matter(fileContents);

    // get html string from markdown
    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
    
    const contentHtml = processedContent.toString() ;
    
    return {
        id,
        contentHtml,
        ...matterResult.data,
    }
}

// function to export all the id of a blog , i.e. file name 
export function getAllPostIds(){
    const fileNames = fs.readdirSync(postsDirectory);

    return fileNames.map((fileName) => {
        return {
            params : {
                id : fileName.replace(/\.md$/,'')
            }
        }
    })
}