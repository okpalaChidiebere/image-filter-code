import {filterImageFromURL, deleteLocalFiles} from '../../../util/util';
import { Router, Request, Response } from 'express';
  
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
    //let image_url = req.query.image_url //get the query variable in the endpoint. 

    //Check if the image url exists
    if ( !image_url ) {
      return res.status(400).send( `url is required`);
    }

    try {
      console.log(image_url);
      const filtered_url = await filterImageFromURL(image_url);
      res.status(200).sendFile(filtered_url, () => {deleteLocalFiles([filtered_url]);});
    }
    catch (e) {
      res.status(400).send("Invalid url")
    }
    return;
});

//! END @TODO1
  