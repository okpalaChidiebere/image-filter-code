import fs from 'fs';
import Jimp = require('jimp');
var Path = require('path');
import Axios from 'axios';
import * as AWS from '../../src/aws';

// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file
export async function filterImageFromURL(inputURL: string): Promise<string>{
    return new Promise( async resolve => {
        const photo = await Jimp.read(inputURL);
        const outpath = '/tmp/filtered.'+Math.floor(Math.random() * 2000)+'.jpg';
        await photo
        .resize(256, 256) // resize
        .quality(60) // set JPEG quality
        .greyscale() // set greyscale
        .write(__dirname+outpath, (img)=>{
            resolve(__dirname+outpath);
        });
    });
}

// deleteLocalFiles
// helper function to delete files on the local disk
// useful to cleanup after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files
export async function deleteLocalFiles(files:Array<string>){
    for( let file of files) {
        fs.unlinkSync(file);
    }
}

/*export async function getImageBuffer(inputURL: string): Promise<Buffer>{
    return new Promise(async imgBuffer =>{
        const img = await Jimp.read(inputURL);
        await img.getBuffer(Jimp.MIME_JPEG, (err, buffer) => {
            console.log(buffer);
            imgBuffer(buffer);
        });
    });
}*/

export async function uploadImageToS3Bucket(filePath: string): Promise<String>{
    return new Promise(async imgKey =>{
        var key = Path.basename(filePath);
        //console.log(key);
        const file = fs.readFileSync(filePath);
        const axios = Axios.create();
        const url = AWS.getPutSignedUrl(key);
        const config = {
            onUploadProgress: function(progressEvent: any) {
                var percentCompleted = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                );
            console.log(percentCompleted);
            },
             header: {
            'Content-Type': 'multipart/form-data'
            }
        };
    
        axios.put(url, file, config)
        .then(async res => {
            //callback({res, key})
            console.log(res.status);
            imgKey(key);
        })
        .catch(err => {
            console.log(err);
        });
    });
}