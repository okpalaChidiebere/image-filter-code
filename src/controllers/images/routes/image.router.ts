import {filterImageFromURL, deleteLocalFiles} from '../../../util/util';
import { Router, Request, Response } from 'express';
import { ImageF } from '../../images/models/Image';
//import * as AWS from '../../../aws';
//import {v4 as uuid } from 'uuid';
  
const router: Router = Router();
  
// @TODO1 IMPLEMENT A RESTFUL ENDPOINT
// GET /filteredimage?image_url={{URL}}
// endpoint to filter an image from a public url.
// IT SHOULD
//    1
//    1. validate the image_url query
//    2. call filterImageFromURL(image_url) to filter the image
//    3. send the resulting file in the response
//    4. deletes any files on the server on finish of the response
// QUERY PARAMATERS
//    image_url: URL of a publicly accessible image
// RETURNS
//   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

/**************************************************************************** */
router.get("/filteredimage", async(req: Request, res: Response) =>{
    
    type MyQuery = {
      image_url: string;
    };
    const { image_url } = req.query as MyQuery;

    //Check if the image url exists
    if ( !image_url ) {
      return res.status(400).send( `url is required`);
    }

    try {
      console.log(image_url);
      const filtered_url = await filterImageFromURL(image_url);
      //const imgKey = await uploadImageToS3Bucket(filtered_url);
      //const imgBuffer = await getImageBuffer(image_url);
      //const imgKey = `${uuid()}.jpg`; //eg: e47d4bf9-1fd1-4617-872f-ddac9f7f9084.jpg
      
      //res.status(200).sendFile(filtered_url, () => {deleteLocalFiles([filtered_url]);});
      deleteLocalFiles([filtered_url]);
      //console.log(imgKey);
      const imgParam = {
        url:  'tempKey.jpg'
      };
      const item = new ImageF(imgParam);
      console.log(item.url);
      //const saved_item = await item.save();
      
      //saved_item.url = AWS.getGetSignedUrl(saved_item.url);
      res.status(200).send(imgParam.url);
      //deleteLocalFiles([filtered_url]);
    }
    catch (e) {
      res.status(400).send(e);
    }
    return;
});

//! END @TODO1

router.get("/test", async(req: Request, res: Response) =>{

  const item = await new ImageF({
    url : "tempKey.jpg"
  });

  res.status(200).send(item);
});

export const ImageRouter: Router = router;
  