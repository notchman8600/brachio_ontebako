import path from "path";
import * as fs from "fs";


const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map(fileName=>{
        const id = fileName.replace(/\.md$/, '')

    })
}
