import config from "../Congfig/config";
import {Client,ID,Databases,Storage,Query} from "appwrite";
export class Service 
{
    client=new Client();
    databases;
    bucket;

    //account should be created on Constructor called
    constructor()
    {
        this.client.setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId)

        this.databases=new Databases(this.client);
        //storage or bucket are same things
        this.bucket=new Storage(this.client)
    }
    //create post 

    async createPost({title,slug,content,featuredImage,status,userId})
    {
        try
        {
  return await this.databases.createDocument(config.appwriteDatabaseId,config.appwriteCollectionId,slug,
    {
        title,content,featuredImage,status,userId
    })
        }
        catch(error)
        {
            console.log(error)
        }
    }
    //updatePost
    async updatePost(slug,{title,content,featuredImage,status})
    {
        try
        {
  return await this.databases.updateDocument(config.appwriteDatabaseId,config.appwriteCollectionId,slug,
    {
        title,content,featuredImage,status
    })
        }
        catch(error)
        {
            console.log(error)
        }
    }

    //deletepost
    async deletePost(slug)
    {
        try
        {
       await this.databases.deleteDocument(con.appwriteDatabaseId,config.appwriteCollectionId,slug)
        return true
        }
        catch(error)
        {
            console.log(error);
            return false;
        }
    }
    //get post
    async getPost(slug)
    {
        try{
            return 
        }
        catch(error)
        {
            
        }
    }
// get all post
    async getPosts(queries=[Query.equal("status","active")])
    {
        //if there is to mplement pagination we will modify here
        try
        {
            return  await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries,
              
            )
        }
        catch(error)
        {
            console.log(error)
     return false;
        }
    }

    //upload file
    async uploadFile(file)
    {
        try
         {
            await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
            return true;
            
        } 
        catch (error) {
            console.log(error)
            return false
        }
    }

    //deletefile

    async deleteFile(fileId)
    {
        try
        {
           await this.bucket.deleteFile(
            config.appwriteBucketId,
            fileId
           ) 
           return true
        } 
        catch (error) {
            return false
        }
    }

    //storge Api

    getFilePreview(fileId)
    {
        return this.bucket.getFilePreview(
            config.appwriteBucketId,
            fileId
        )
    }
}

const services=new Service()
export default services;