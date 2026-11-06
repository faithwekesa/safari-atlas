# Safari Atlas

A full-screen travel slider for eight of Africa's most loved destinations. The big photo changes as you move through the places, the title and description rise in, and a stack of cards lets you see what comes next.

Live site: https://safari-atlas.vercel.app

## What it does

- Shows one destination at a time with a large photo, a title, a short description and a link that opens the place in Google Maps
- Moves on by itself every few seconds and pauses while the mouse is over the page
- Lets you jump straight to any place by clicking its card
- Has two card layouts, a fan of cards and a simple row, with a button to switch between them
- Works with the arrow buttons, the left and right arrow keys and swipes on a phone
- Changes photos with a mix of gentle fade, slide and rise transitions and respects the reduced motion setting
- Has a coloured gradient for each place that shows while photos load or if a photo is missing

## Places

Maasai Mara in Kenya, the Pyramids of Giza in Egypt, Victoria Falls on the Zambia and Zimbabwe border, Sossusvlei in Namibia, Zanzibar in Tanzania, Table Mountain in South Africa, Merzouga in Morocco and Mount Kilimanjaro in Tanzania.

## Built with

React and Vite with plain CSS. There are no UI libraries or animation libraries.

## Run it on your computer

Install the packages:

    npm install

Start the site:

    npm run dev

## Photos

The photos are in public/images and are named after the place ids in src/destinations.js. Photographer credits for downloaded photos are in public/images/CREDITS.txt. To swap a photo, save a new one with the same file name.

## Project structure

    src/App.jsx           the slider and its behaviour
    src/destinations.js   the places and their text
    src/index.css         all the styles and animations
    scripts/get-images.mjs  optional helper to download photos

## Deploy

    npm run build

The dist folder can be hosted on any static host. On Vercel it deploys with the default Vite settings.

## Notes

Distances and heights in the descriptions are rounded and come from commonly published figures.
