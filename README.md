# Safari Atlas

Safari Atlas answers one question for travellers: where in Africa can my budget take me? You set what you have to spend and the number of days and people and the app works out what a trip to each of 15 places would cost. It then sends you to the right sites to book.

Live site: https://safari-atlas.vercel.app

## What it helps you do

- Enter a total budget in US dollars and see which places fit and which do not
- See a breakdown for each place covering stay and food and getting around and park fees
- Choose a travel style from budget to comfortable to treat yourself and watch the totals change
- Get a hint when a trip is over budget such as fewer days or a cheaper style that would fit
- Compare up to three places side by side
- Open booking searches already filled with your dates and number of guests on Booking.com and Airbnb and Google Flights and GetYourGuide
- Switch to Explore mode to browse every place in a full-screen slider and press Plan your visit on any place to see its costs and booking links

## How the prices work

Park and entry fees come from official or published sources and each plan links to its source. Rooms and meals and transport are typical rounded ranges for each place and are marked as estimates. Every plan shows the date the prices were last checked. Visa fees and international flights are not included unless you add a flights amount. Always confirm the final price on the booking site.

## Why I built it

A gallery of nice photos is easy to find anywhere. What travellers struggle with is knowing whether a trip is affordable before they spend hours planning it. This app starts from the budget so the planning begins with places that are realistic.

## Built with

React and Vite and plain CSS. The places and the cost data each live in their own data file so adding a place or updating a price is a small change.

## Run it on your computer

    npm install
    npm run dev

Then open the link it prints in your browser.

## Photos

Photos are fetched with scripts/get-images.mjs using a free Pexels or Pixabay key and credits are listed in public/images/CREDITS.txt.
