# PasientSky assignment

## Prerequisites
- A mongoDB server running on localhost port 27017. 
- You need node. I used version 13.2.0.

## Setting up
Run the following commands:

    cd frontend
    npm install
    cd ../backend
    npm install
    cd ..

## Starting 
Run the following commands:

    cd backend
    npm run start &
    cd ../frontend
    npm run start &

Accept port 3001 for frontend. Then point your browser towards http://localhost:3001.

## Warnings
Developed and tested in Firefox only.

## Things I would have fixed if I did not have three kids:
- Design and UX. This does not look good.
- If you search for a medication and press enter, the patient is saved. This should trigger a search instead.
- Not save medications as a JSON string, but use a relational table instead.
- Implement some kind of caching.
- Save only the medication ID and not the name. I was not able to find a way to use the API to search by ID, so I had to save the name as well.
- Put endpoints and database configuration into a config file instead of hardcoding it.

