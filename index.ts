import axios from 'axios';
import * as fs from 'fs';

const apiUrl = 'https://api.gatcg.com/cards/search'; // Replace with your API endpoint URL
const downloadDirectory = './downloads'; // Replace with your desired directory path

async function downloadImages() {
  try {
    // Make an API call to get the image URLs

    // Create the download directory if it doesn't exist
    if (!fs.existsSync(downloadDirectory)) {
      fs.mkdirSync(downloadDirectory);
    }

    let page = 1;
    let response;
    while(page == 1 || response?.data.has_more) {
      response = await axios.get(`${apiUrl}?page=${page++}`);

      const imageUrls = response.data;

      

      for (const card of imageUrls.data) {
          console.log(`${card.name}:`);
          for (const edition of card.result_editions) {
            const setDir = `${downloadDirectory}/${edition.set.prefix}`;
            if (!fs.existsSync(setDir)) {
              fs.mkdirSync(setDir);
            }
            
            const imagePath = `${setDir}/${edition.slug}.jpg`;
            if (fs.existsSync(imagePath)) {
              continue; // Move to the next image
            }

            console.log(`   ${edition.slug}`);
            const imageUrl = `https://ga-index-public.s3.us-west-2.amazonaws.com/cards/${edition.slug}.jpg`
            const imageResponse = await axios.get(imageUrl, { responseType: 'stream' });

            

            imageResponse.data.pipe(fs.createWriteStream(imagePath));
      
            // Wait for the image to finish downloading
            await new Promise((resolve) => imageResponse.data.on('end', resolve));
          }
      }

    }
// ------------------------------------


    // // Download each image
    // for (const imageUrl of imageUrls) {
    //   const imageFileName = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
    //   const imagePath = `${downloadDirectory}/${imageFileName}`;

    //   const imageResponse = await axios.get(imageUrl, { responseType: 'stream' });
    //   imageResponse.data.pipe(fs.createWriteStream(imagePath));

    //   // Wait for the image to finish downloading
    //   await new Promise((resolve) => imageResponse.data.on('end', resolve));
    // }

    // console.log('Images downloaded successfully!');
  } catch (error) {
    console.error('Error downloading images:', error);
  }
}

downloadImages();
