const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const bcrypt = require('bcrypt');

const app = express();
const port = process.env.PORT || 5000;

const db = new sqlite3.Database('./database.db');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const dynamicpost = [
  
  {
    "id": 1,
    "title": "Global Economy Rebounds",
    "image_url": "https://apanews.net/wp-content/uploads/2023/03/EconomicGrowth.jpg",
    "Description": "The global economy shows signs of recovery after a turbulent year.",
    "videourl": "",
    "date": "2024-08-21"
  },
  {
    "id": 2,
    "title": "World Championship Of Legends, 2024 Final",
    "image_url": "",
    "Description": "Legends battle.",
    "videourl": "https://youtu.be/K3Ts55o9NsA?si=ssgm9UPsNlXwwG_q",
    "date": "2024-08-20"
  },
  {
    "id": 3,
    "title": "T20 WC WINNER INDIA",
    "image_url": "https://im.rediff.com/cricket/2024/jul/01india1.jpg",
    "Description": "In the nine editions so far, six teams have won the T20 World Cup.",
    "videourl": "",
    "date": "2024-08-21"
  },
  {
    "id": 4,
    "title": "AI Breakthroughs",
    "image_url": "https://www.edge-ai-vision.com/wp-content/uploads/2024/04/the-rise-of-generative-ai-timeline-of-breakthrough-innovations.jpg",
    "Description": "AI achieves new milestones in natural language processing.",
    "videourl": "",
    "date": "2024-08-19"
  },
  {
    "id": 5,
    "title": "Wildfires in California",
    "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWC8BRAaFdVjR30Q-Oj2lqFSAnCwNIejfSuFn3-MFNMR4eazk6x5DqcgAPh2Co4rBsN7g&usqp=CAU",
    "Description": "Firefighters battle massive wildfires threatening communities.",
    "videourl": "",
    "date": "2024-08-18"
  },
  {
    "id": 6,
    "title": "Health Benefits of Yoga",
    "image_url": "",
    "Description": "Yoga continues to gain popularity for its mental and physical benefits.",
    "videourl": "https://youtu.be/-2IcOOUqNgI?si=vDRZkcoxNfFR1YBT",
    "date": "2024-08-17"
  },
  {
    "id": 7,
    "title": "Tennis Grand Slam Final",
    "image_url": "https://sc0.blr1.cdn.digitaloceanspaces.com/article/175415-pvfbtbhjnz-1654515347.jpg",
    "Description": "The Grand Slam final ends in a nail-biting finish.",
    "videourl": "",
    "date": "2024-08-16"
  },
  {
    "id": 8,
    "title": "Flood in Andhra Pradesh",
    "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwlOgEWgSV_RQLpc1nrKR-J_9Ivc1TGWF21w&s",
    "Description": "For the first time in the last three decades, Vijayawada witnessed over 29 cm of rainfall in a single day which instigated a severe flooding situation in the area, possibly the worst calamity recorded in the history of the Krishna River. Several areas of the Vijayawada city and 411 villages reported submerged due to excessive rainfall and flood in affected districts.While several districts, including neighbouring Palnadu and Guntur, were victims of floods, Vijayawada in NTR was the worst hit",
    "videourl": "",
    "date": "2024-08-15"
  },
  {
    "id": 9,
    "title": "IQOO 13 Smartphone Launch",
    "image_url": "",
    "Description": "The latest smartphone offers groundbreaking features.",
    "videourl": "https://youtu.be/gdEsp9iwTLc?si=gLqZcSB6rsLShtuL",
    "date": "2024-08-14"
  },
  {
    "id": 10,
    "title": "The Rise of Green Energy",
    "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMlmatPXW64czaPn4lj4DeLiiA1X526R2Imw&s",
    "Description": "Green energy is taking the world by storm.",
    "videourl": "",
    "date": "2024-08-13"
  },
  {
    "id": 11,
    "title": "Cricket Test Match Highlights",
    "image_url": "",
    "Description": "The Test series between AUS vs IND incredible performances.",
    "videourl": "https://youtu.be/xgiiwsJ7mOk?si=Lkl_6VcOzVvpgeUo",
    "date": "2024-08-12"
  },
  {
    "id": 12,
    "title": "Market Trends",
    "image_url": "https://bsmedia.business-standard.com/_media/bs/img/article/2024-11/25/full/1732558303-2003.jpg?im=FeatureCrop,size=(826,465)",
    "Description": "Market trends indicate growth in several sectors.",
    "videourl": "",
    "date": "2024-08-11"
  },
  {
    "id": 13,
    "title": "Exploring the Cosmos",
    "image_url": "https://img.artpal.com/040003/27-24-1-15-5-47-8m.jpg",
    "Description": "Scientists discover new mysteries in the cosmos.",
    "videourl": "",
    "date": "2024-08-10"
  },
  {
    "id": 14,
    "title": "50th century ODI",
    "image_url": "https://i.pinimg.com/736x/f2/d1/21/f2d121a5a08366247ad166ffea909898.jpg",
    "Description": "Virat Kohli scored his 50th One-Day International (ODI) century on November 15, 2023, during the 2023 Cricket World Cup semi-final against New Zealand at Wankhede Stadium in Mumbai",
    "videourl": "",
    "date": "2024-08-09"
  },
  {
    "id": 15,
    "title": "The Future of Blockchain",
    "image_url": "https://www2.deloitte.com/content/dam/Deloitte/us/Images/promo_images/abstract/us-connectors-promo.jpg",
    "Description": "Blockchain continues to revolutionize industries.",
    "videourl": "",
    "date": "2024-08-08"
  },
  {
    "id": 16,
    "title": "Floods in South Asia",
    "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmDlb-5f4cjRx4bEWedJGOH4HMdALLROcn5w&s",
    "Description": "Heavy rains lead to severe flooding in South Asia.",
    "videourl": "",
    "date": "2024-08-07"
  },
  {
    "id": 17,
    "title": "IPL Auction 2024",
    "image_url": "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202411/rishabh-pant-121450519-3x4_0.jpg?VersionId=jfD7TJh3dxNEwQURBiLHuHNLdYwJlMb2",
    "Description": "Rishabh Pant is an Indian cricketer who plays for the Lucknow Super Giants in the Indian Premier League (IPL). He was bought by the team in the 2025 IPL auction for a record-breaking ₹27 crore, making him the most expensive player in IPL history.",
    "videourl": "",
    "date": "2024-08-06"
  },
  {
    "id": 18,
    "title": "Marathon Winners Announced",
    "image_url": "https://preview.redd.it/2024-paris-olympics-womens-marathon-v0-9c6v6z3mg0id1.jpg?width=640&crop=smart&auto=webp&s=d24216293f3fcb86778e35214487a13395c0eda6",
    "Description": "Marathon winners inspire with incredible performances.",
    "videourl": "",
    "date": "2024-08-05"
  },
  {
    "id": 19,
    "title": "WPL RCB Lift trophy",
    "image_url": "https://preview.redd.it/rcb-wins-the-wpl-2024-edition-v0-pl90codlfxoc1.jpeg?auto=webp&s=bafc51c93f6eeffab59cd633468e8c05aac28584",
    "Description": " Mandhana and Elyse Perry ensured the first-ever trophy for the franchis",
    "videourl": "",
    "date": "2024-08-04"
  },
  {
    "id": 20,
    "title": "Autonomous Vehicles",
    "image_url": "https://static.euronews.com/articles/stories/08/34/38/20/1200x675_cmsv2_f11ea645-3171-5463-97c2-2dc13e93c2d8-8343820.jpg",
    "Description": "Self-driving cars are closer to reality than ever.",
    "videourl": "",
    "date": "2024-08-03"
  }
]

const posts = () => {
  const sql = `INSERT INTO posts (id, title, image_url, Description, videourl, date) 
               VALUES (?, ?, ?, ?, ?, ?)`;

    dynamicpost.forEach((postdata) => {
      db.run(sql, [postdata.id, postdata.title, postdata.image_url, postdata.Description, postdata.videourl, postdata.date], (err) => {
          if (err) {
              return console.error(err.message);
          }
          console.log(`Row inserted: ${postdata.title}`);
      });
  });
};




db.serialize(() =>{
  db.run(
    `CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY,
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    hashedPassword TEXT NOT NULL
    )`
  )
})

db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY,
      title TEXT NOT NULL,
      image_url TEXT,
      Description TEXT,
      videourl TEXT,
      date DATE NOT NULL
    )`

  );
  posts()
});




app.get('/login',(req,res) =>{
  db.all('SELECT * FROM users',[],(err,rows) =>{
    if(err){
      return res.status(500)
    }
    res.status(201)
  });
})

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ?';
  db.get(query, [email], async (err, user) => {
    if (err) {
      return res.status(500).json({ success: false, error: 'Database error' });
    }

    if (!user) {
      return res.status(401).json({ success: false, error: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    res.json({ success: true, message: 'Login successful!' });
  });
});


app.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  const sql = 'SELECT username FROM users WHERE id = ?';
  db.get(sql, [userId], (err, row) => {
      if (err) {
          res.status(500).send({ error: 'Database error' });
      } else {
          res.send({ username: row?.username || 'User not found' });
      }
  });
});



app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const query = `INSERT INTO users (username, email, hashedPassword) VALUES (?, ?, ?)`;

    db.run(query, [username, email, hashedPassword], function (err) {
      if (err) {
        console.error("Database error:", err.message);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      res.status(201).json({ message: "User registered successfully!" });
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});




app.post('/posts', (req, res) => {
  const { title,image_url, Description, videourl, date } = req.body;
  if (!title ||  !date) {
    return res.status(400).json({ error: 'Required fields are missing' });
  }
  const query =
    'INSERT INTO posts (title, image_url, Description, videourl, date) VALUES (?, ?, ?, ?,  ?)';
  db.run(query, [title, image_url, Description, videourl , date], function (err) {
    if (err) {
      return res.status(500).json({ error: 'Failed to create post' });
    }
    res.status(201).json({ id: this.lastID });
  });
});

// GET method for fetching all posts
app.get('/posts', (req, res) => {
  const sql = 'SELECT * FROM posts';
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ success: false, error: 'Database error' });
    }
    
    res.status(200).json({ success: true, posts: rows });
  });
});

// GET method for fetching a single post by its ID
app.get('/posts/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM posts WHERE id = ?';
  
  db.get(sql, [id], (err, row) => {
    if (err) {
      return res.status(500).json({ success: false, error: 'Database error' });
    }
    
    if (!row) {
      return res.status(404).json({ success: false, error: 'Post not found' });
    }
    
    res.status(200).json({ success: true, post: row });
  });
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
