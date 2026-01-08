import fs from 'fs';
import path from 'path';

const source = 'C:/Users/ZUXA/.gemini/antigravity/brain/b38189cd-5759-4c1d-8539-24e6a0a2abc9/uploaded_image_1766579341977.jpg';
const dest = 'c:/Users/ZUXA/Downloads/inventory-universal-flexible/public/logo.jpg';

try {
    fs.copyFileSync(source, dest);
    console.log('Logo copied successfully!');
} catch (error) {
    console.error('Error copying logo:', error);
}
