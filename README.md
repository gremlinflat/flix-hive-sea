# FlixHive Documentation

## Getting Started

FlixHive is a web application that allows users to effortlessly browse through a collection of movies, choose a seats, and book a ticket.

It is built with Next.js, React, Tailwind CSS, and powered by Firestore. This project is dedicated [Compfest 15](https://www.compfest.id) SEA Technical Challenge.

### Live Demo
You can view the live demo of the app [here](https://flix-hive-sea.vercel.app/).

## Installation

First, clone this repository:

```bash
git clone https://github.com/gremlinflat/flix-hive-sea.git
```

Then, install the dependencies:

```bash
npm install
# or
yarn install
```

Finally, create a `.env.local` file in the root directory and add the following environment variables:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=

FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
FIREBASE_DATABASE_URL=
```

### Running the app

To run the development server, run the following command:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Key Features

### Authentication

- [x] Users can sign in using their GitHub or Google accounts.
- [x] Authenticated users can view their profile information, including credit balance and age.
- [x] Users can sign out from the platform.

### Movie Catalog

- [x] Users can browse a list of available movies.
- [x] Movie details, including title, poster, age rating, release date, and description, are displayed.
- [x] Users can select movie seats using the Seat Picker component.
- [x] Ticket prices are shown for each movie.
  
### Ticket Booking

- [x] Users can book a ticket for a movie.
- [x] The Seat Picker component allows users to select seats for a movie.
- [x] Available seats are displayed for selection.
- [x] Selected seats are highlighted and can be deselected.
- [x] The number of selected seats and the total price are updated dynamically.

### Balance Top-Up and Withdrawal

- [x] Users can top up their balance.
- [x] Users can withdraw their balance.

### Ticket History and Recent Orders

- [x] Users can view their ticket history.
- [x] The Recent Orders component displays a list of recent ticket orders.
- [x] The customer name, seat number, and order status are shown.
- [x] User can cancel an order and the credit should be refunded.

## Technical Specifications

### Tech Stack

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Firebase](https://firebase.google.com/)
- [DaisyUI](https://daisyui.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [JS-Cookie](https://github.com/js-cookie/js-cookie)
- [SWR](https://swr.vercel.app/)

### Folder Structure

``` bash
flix-hive-sea
├── components
│   ├── ...
├── lib
│   ├── ...
├── pages
│   ├── ...
├── public
│   ├── ...
├── styles
│   ├── ...
├── .env.local
├── .gitignore
├── next.config.js
├── package.json
├── README.md
└── tailwind.config.js
```

### Data Structure

#### Firestore Collections

``` bash
flix-hive-sea
├── users
│   ├── uid: String (auto-generated, identifier)
│   ├── name: String
│   ├── email: String
│   ├── photoUrl: String
│
├── user-profile
│   ├── uid: String (linked to users collection, identifier)
│   ├── age: Number
│   ├── balance: Number
│
├── movies
│   ├──... (directly linked to COMPFESt API, no need to store in Firestore)
│
├── tickets
│   ├── uid: String (auto-generated, identifier)
│   ├── movieId: String
│   ├── movieTitle: String
│   ├── price: Number
│   ├── seats: Array
│       ├── [] (array of seat numbers)
│   ├── status: String (default: "booked", enum ["booked", "cancelled"])
│   ├── created_at: String (auto-generated, timestamp with ISO format)
│   ├── total: Number (derrived, price * seats.length)
│   ├── user_id: String (linked to users collection)
│   ├── user_name: String (derived, user's name from users collection)
│

```

## License

The FlixHive project is open-source and released under the [MIT License](https://choosealicense.com/licenses/mit/).

Feel free to customize the documentation according to your project's specific features, guidelines, and requirements.
