const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');

// middleware

app.use(cors());
app.use(express.json());

// GadgetGear
// STu2gOSpwsC88fCa
// const uri = "mongodb://localhost:27017";

const products = [
  {
    "id": 1,
    "image": "https://i.ibb.co/PGsLHQ7/samuel-angor-d-OHDjkz7-X3k-unsplash.jpg",
    "name": "Pixel 8 Pro",
    "brandName": "Google",
    "type": "SmartPhone",
    "price": 899,
    "rating": 4.5
  },
  {
    "id": 2,
    "image": "https://i.ibb.co/0rRczyZ/triyansh-gill-Lw32-CA1-PVq4-unsplash.jpg",
    "name": "Pixel Buds",
    "brandName": "Google",
    "type": "EarBuds",
    "price": 249,
    "rating": 4.0
  },
  {
    "id": 3,
    "image": "https://i.ibb.co/KVYF69m/triyansh-gill-Y30-TB1-Pct-Dg-unsplash.jpg",
    "name": "Pixel Watch",
    "brandName": "Google",
    "type": "SmartWatch",
    "price": 499,
    "rating": 4.8
  },
  {
    "id": 4,
    "image": "https://i.ibb.co/NmgbQyx/junjie-tam-FKGkv-Yz-VY7-Y-unsplash.jpg",
    "name": "Pixel 7 Pro",
    "brandName": "Google",
    "type": "Smartphone",
    "price": 799,
    "rating": 3.7
  },
  {
    "id": 5,
    "image": "https://i.ibb.co/bQ8c0kY/mockup-free-ikg-P7-AQs2r4-unsplash.jpg",
    "name": "Iphone 15 Pro Max ",
    "brandName": "Apple",
    "type": "Smartphone",
    "price": 1200,
    "rating": 4.6
  },
  {
    "id": 6,
    "image": "https://i.ibb.co/q9nkG7z/omid-armin-g-SZCLs-E7ysc-unsplash.jpg",
    "name": "Airpods pro 2nd gen ",
    "brandName": "Apple",
    "type": "EarBuds",
    "price": 299,
    "rating": 4.6
  },
  {
    "id": 7,
    "image": "https://i.ibb.co/bFTmyjt/alek-olson-BNJj-Dz3tdq-A-unsplash.jpg",
    "name": "Apple Watch Ultra",
    "brandName": "Apple",
    "type": "SmartWatch",
    "price": 949,
    "rating": 4.1
  },
  {
    "id": 8,
    "image": "https://i.ibb.co/mTWyN4x/daniel-korpai-Hy-Twtsk8-Xq-A-unsplash.jpg",
    "name": "Macbook Pro",
    "brandName": "Apple",
    "type": "Laptop",
    "price": 1499,
    "rating": 4.3
  },
  {
    "id": 9,
    "image": "https://i.ibb.co/y5bPcf4/bbb207a7dfe344d2731b425d1894f8b2.png",
    "name": "Xiaomi Watch 2",
    "brandName": "Xiaomi",
    "type": "SmartWatch",
    "price": 229,
    "rating": 3.9
  },
  {
    "id": 10,
    "image": "https://i.ibb.co/J5VBPvR/pms-1680592255-57284535-1.png",
    "name": "Xiaomi Buds 3",
    "brandName": "Xiaomi",
    "type": "EarBuds",
    "price": 164,
    "rating": 4.7
  },
  {
    "id": 11,
    "image": "https://i.ibb.co/9TJmJb0/thai-nguyen-z-CQT4-Zbxj-MM-unsplash.jpg",
    "name": "Xiaomi 12s Ultra",
    "brandName": "Xiaomi",
    "type": "SmartPhone",
    "price": 1169,
    "rating": 4.2
  },
  {
    "id": 12,
    "image": "https://i.ibb.co/56Mc3xb/amanz-JRK8ts-Vv3y0-unsplash.jpg",
    "name": "Xiaomi Buds Pro",
    "brandName": "Xiaomi",
    "type": "Earbuds",
    "price": 259,
    "rating": 4.5
  },
  {
    "id": 13,
    "image": "https://i.ibb.co/K0897HV/onur-binay-s-Pxk3zxp-Q08-unsplash.jpg",
    "name": "Samsung Fold 5",
    "brandName": "Samsung",
    "type": "SmartPhone",
    "price": 1449,
    "rating": 4.2
  },
  {
    "id": 14,
    "image": "https://i.ibb.co/zX3pcvZ/onur-binay-uk5-Frh-Ktr7-E-unsplash.jpg",
    "name": "Samsung Flip 5",
    "brandName": "Samsung",
    "type": "SmartPhone",
    "price": 1299,
    "rating": 4.3
  },
  {
    "id": 15,
    "image": "https://i.ibb.co/pxhr90x/thai-nguyen-HKwb-LKMLQ1g-unsplash.jpg",
    "name": "Samsung S23 Ultra",
    "brandName": "Samsung",
    "type": "SmartPhone",
    "price": 1199,
    "rating": 4.4
  },
  {
    "id": 16,
    "image": "https://i.ibb.co/6tfhpbh/emiliano-cicero-OKZqs-Vseko-unsplash.jpg",
    "name": "Samsung Watch 5",
    "brandName": "Samsung",
    "type": "Watch",
    "price": 449,
    "rating": 4.6
  },
  {
    "id": 17,
    "image": "https://i.ibb.co/kK2WHNJ/bram-van-oost-6-Wv-Zo5-FOxww-unsplash.jpg",
    "name": "MicroSoft Surface 3",
    "brandName": "MicroSoft",
    "type": "Laptop",
    "price": 1400,
    "rating": 4.8
  },
  {
    "id": 18,
    "image": "https://i.ibb.co/DfDzKwc/workperch-3-SLXlr-C-r-Lg-unsplash.jpg",
    "name": "MicroSoft Surface Go",
    "brandName": "MicroSoft",
    "type": "Tablet",
    "price": 749.99,
    "rating": 4.3
  },
  {
    "id": 19,
    "image": "https://i.ibb.co/X7yZFkk/ashkan-forouzani-5g2dy-Ql9-VTU-unsplash.jpg",
    "name": "MicroSoft Surface Pen",
    "brandName": "MicroSoft",
    "type": "SmartPen",
    "price": 149.99,
    "rating": 4.3
  },
  {
    "id": 20,
    "image": "https://i.ibb.co/0s8Gg7m/clint-patterson-j-CY4o-EMA3o-unsplash.jpg",
    "name": "MicroSoft Windows 11",
    "brandName": "MicroSoft",
    "type": "SoftWare",
    "price": 199,
    "rating": 4.9
  },
  {
    "id": 21,
    "image": "https://i.ibb.co/FxZ8SqM/dmitry-rodionov-Pj-CQ5-4-Owa-I-unsplash.jpg",
    "name": "Huawei Matebook 13",
    "brandName": "Huawei",
    "type": "Laptop",
    "price": 1499,
    "rating": 4.1
  },
  {
    "id": 22,
    "image": "https://i.ibb.co/Zf6MmhK/jonas-leupe-Wmauj-u-L1c8-unsplash.jpg",
    "name": "Huawei Fold 2",
    "brandName": "Huawei",
    "type": "SmartPhone",
    "price": 1299,
    "rating": 4.3
  },
  {
    "id": 23,
    "image": "https://i.ibb.co/PMC52M3/watch-buds.jpg",
    "name": "Huawei Watch Buds",
    "brandName": "Huawei",
    "type": "EarBuds",
    "price": 399,
    "rating": 4.2
  },
  {
    "id": 24,
    "image": "https://i.ibb.co/8N2HSJM/freebuds-pro-3-kv.jpg",
    "name": "Huawei FreeBuds Pro",
    "brandName": "Huawei",
    "type": "SmartWatch",
    "price": 349,
    "rating": 4.4
  }
]


const uri = "mongodb+srv://GadgetGear:STu2gOSpwsC88fCa@cluster0.t245pno.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const brandCollection = client.db("brandDB").collection('brandCollection');

    app.get('/brand', async (req, res) => {
      const cursor = brandCollection.find();
      const result = await cursor.toArray();
      res.send(result)
    })















    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('started a new Product shop')
})

app.get('/brand/products', (req, res) => {
  res.send(products)
})

app.listen(port, () => {
  console.log('new Product shop started successfuly at', port);
})