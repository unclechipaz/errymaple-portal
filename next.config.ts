import type { NextConfig } from "next";
import fs from "fs";
import path from "path";

// Self-cleaning script to remove the temporary (portal) folder if it exists
const portalDir = path.join(process.cwd(), "app", "(portal)");
if (fs.existsSync(portalDir)) {
  try {
    fs.rmSync(portalDir, { recursive: true, force: true });
    console.log("Successfully cleaned up app/(portal) directory to avoid route conflicts.");
  } catch (error) {
    console.error("Failed to clean up portal directory:", error);
  }
}

// Self-cleaning script to remove static school directories to avoid route conflicts with dynamic route [school]
const schoolDirs = ["high-school", "junior-school", "international-school"];
schoolDirs.forEach((dirName) => {
  const schoolDir = path.join(process.cwd(), "app", dirName);
  if (fs.existsSync(schoolDir)) {
    try {
      fs.rmSync(schoolDir, { recursive: true, force: true });
      console.log(`Successfully cleaned up app/${dirName} directory to avoid route conflicts.`);
    } catch (error) {
      console.error(`Failed to clean up ${dirName} directory:`, error);
    }
  }
});

// Copy all assets from the brain folder to public/images and app folders on configuration load
const brainDir = "C:\\Users\\dell\\.gemini\\antigravity\\brain\\3cfb9d43-c526-489a-bde9-3bb619d10e26";
const publicImagesDir = path.join(process.cwd(), "public", "images");

if (fs.existsSync(brainDir)) {
  try {
    if (!fs.existsSync(publicImagesDir)) {
      fs.mkdirSync(publicImagesDir, { recursive: true });
    }

    // 1. Copy Group of Schools logo to custom locations
    const srcLogo = path.join(brainDir, "media__1782034537033.jpg");
    if (fs.existsSync(srcLogo)) {
      fs.copyFileSync(srcLogo, path.join(publicImagesDir, "egs_logo.jpg"));
      fs.copyFileSync(srcLogo, path.join(process.cwd(), "public", "favicon.ico"));
      fs.copyFileSync(srcLogo, path.join(process.cwd(), "app", "favicon.ico"));
      fs.copyFileSync(srcLogo, path.join(process.cwd(), "app", "icon.png"));
    }

    // 2. Copy and map all other assets from brain folder
    const assetMappings = [
      { src: "media__1782929772633.jpg", dest: "school_hero_bg.png" },
      { src: "high_school_card_1781771994895.png", dest: "high_school_card.png" },
      { src: "junior_school_card_1781772008220.png", dest: "junior_school_card.png" },
      { src: "international_school_card_1781772021577.png", dest: "international_school_card.png" },
      { src: "media__1781797764441.png", dest: "eis_crest.png" },
      { src: "media__1781798582196.png", dest: "ejs_crest.png" },
      { src: "media__1781805727148.jpg", dest: "ehs_crest.jpg" },
      { src: "classrooms_gallery_1781808957315.png", dest: "classrooms_gallery.png" },
      { src: "science_lab_gallery_1781808976895.png", dest: "science_lab_gallery.png" },
      { src: "robotics_gallery_1781808996204.png", dest: "robotics_gallery.png" },
      { src: "sports_gallery_1781809014238.png", dest: "sports_gallery.png" },
      { src: "swimming_gallery_1781809033459.png", dest: "swimming_gallery.png" },
      { src: "golf_gallery_1781809053869.png", dest: "golf_gallery.png" },
      { src: "cultural_gallery_1781809071080.png", dest: "cultural_gallery.png" },
      { src: "leadership_gallery_1781809090530.png", dest: "leadership_gallery.png" },
      { src: "news_cambridge_1781809109380.png", dest: "news_cambridge.png" },
      { src: "news_robotics_1781809129151.png", dest: "news_robotics.png" },
      { src: "news_golf_1781809146519.png", dest: "news_golf.png" },
      { src: "media__1782664718657.jpg", dest: "school_bus.jpg" },
      { src: "media__1782665691549.png", dest: "safe_environment.png" },
      { src: "media__1782666299807.jpg", dest: "dining_hall.jpg" },
      { src: "media__1782674745514.jpg", dest: "school_library.jpg" },
      { src: "media__1782931798316.jpg", dest: "news_ruswa.jpg" }
    ];

    assetMappings.forEach(({ src, dest }) => {
      const srcPath = path.join(brainDir, src);
      const destPath = path.join(publicImagesDir, dest);
      if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
      }
    });
    console.log("Successfully copied all image assets and logos to public and app directories.");
  } catch (error) {
    console.error("Failed to copy assets:", error);
  }
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  /* config options here */
};

export default nextConfig;

