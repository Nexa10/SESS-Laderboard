import icons from "./profileIcons";

// import { MongoClient, ServerApiVersion } from 'mongodb';
// const uri = "mongodb+srv://Nexa10:<password>@cluster0.lu9g8kk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

const athletes = [
    {
      rank: 1,
      profileIconUrl: icons[0],
      name: 'John Doe',
      length: 180, // in centimeters
      weight: 70 // in kilograms
    },
    {
      rank: 2,
      profileIconUrl: icons[2],
      name: 'Jane Smith',
      length: 165, // in centimeters
      weight: 60 // in kilograms
    },
    {
      rank: 3,
      profileIconUrl: icons[3],
      name: 'Alex Johnson',
      length: 175, // in centimeters
      weight: 75 // in kilograms
    },
    {
        rank: 4,
        profileIconUrl: icons[4],
        name: 'Chris Lee',
        length: 170, // in centimeters
        weight: 68 // in kilograms
      },
      {
        rank: 5,
        profileIconUrl: icons[5],
        name: 'Pat Morgan',
        length: 182, // in centimeters
        weight: 76 // in kilograms
      }, 
     
    {
      rank: 6,
      profileIconUrl: icons[6],
      name: 'Sarah Davis',
      length: 160, // in centimeters
      weight: 55 // in kilograms
    },
    {
      rank: 7,
      profileIconUrl: icons[7],
      name: 'Michael Johnson',
      length: 185, // in centimeters
      weight: 80 // in kilograms
    },
    {
      rank: 8,
      profileIconUrl: icons[8],
      name: 'Emily Wilson',
      length: 168, // in centimeters
      weight: 62 // in kilograms
    },
    {
      rank: 9,
      profileIconUrl: icons[9],
      name: 'David Brown',
      length: 175, // in centimeters
      weight: 73 // in kilograms
    },
    {
      rank: 10,
      profileIconUrl: icons[10],
      name: 'Jessica Thompson',
      length: 172, // in centimeters
      weight: 65 // in kilograms
    },
    {
      rank: 11,
      profileIconUrl: icons[11],
      name: 'Ryan Miller',
      length: 180, // in centimeters
      weight: 75 // in kilograms
    },
    {
      rank: 12,
      profileIconUrl: icons[12],
      name: 'Olivia Davis',
      length: 163, // in centimeters
      weight: 58 // in kilograms
    },
    {
      rank: 13,
      profileIconUrl: icons[13],
      name: 'Daniel Wilson',
      length: 178, // in centimeters
      weight: 71 // in kilograms
    },
    {
      rank: 14,
      profileIconUrl: icons[14],
      name: 'Sophia Johnson',
      length: 170, // in centimeters
      weight: 63 // in kilograms
    },
    {
      rank: 15,
      profileIconUrl: icons[15],
      name: 'Matthew Thompson',
      length: 183, // in centimeters
      weight: 77 // in kilograms
    },
    {
      rank: 16,
      profileIconUrl: icons[16],
      name: 'Emma Smith',
      length: 166, // in centimeters
      weight: 60 // in kilograms
    }
  ];

  

  export {athletes};