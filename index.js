const express = require('express');
const path = require('path');

const app = express();
const port = 8000;

const projects = [];
const defaultImage = 'foto.webp'; // Nama file gambar default

// app.set
// mendeskripsikan template engine apa yang dipake
app.set("view engine", "hbs");
// ini memberitahu si template engine ngambilnya dari folder mana
app.set("views", path.join(__dirname, "src/views"));

// ini untuk assets
app.use("/assests", express.static(path.join(__dirname, "src/assests")));
// middleware -> yang berfungsi sebagai alat memproses inputan dari form (Request)
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('index', { projects });
});

app.get('/contact', (req, res) => {
    res.render('contact', { projects });
});

app.get('/myProject', (req, res) => {
    res.render('myProject', { projects });
});

app.get('/addProject', (req, res) => {
    res.render('addProject');
});

// Mengedit dan melihat proyek berdasarkan id
app.get('/updateProject/:id', (req, res) => {
    const { id } = req.params;
    const numericId = parseInt(id, 10);
    if (numericId >= 0 && numericId < projects.length) {
        const project = projects[numericId];
        project.id = numericId;
        res.render('updateProject', { project });
    } else {
        res.redirect('/myProject');
    }
});

// Route untuk menampilkan detail project berdasarkan index
app.get('/myProject/:index', (req, res) => {
    const { index } = req.params;
    if (index >= 0 && index < projects.length) {
        res.render('myProject', { project: projects[index] });
    } else {
        res.redirect('/myProject'); // Atau sesuaikan dengan penanganan yang sesuai
    }
});

// Route untuk menerima data form dan menambahkannya ke projects
app.post('/addProject', (req, res) => {
    const { inputProjectName, startDate, endDate, inputDescription, technologies } = req.body;
    console.log('Project Name:', inputProjectName);
    console.log('Description:', inputDescription);
    console.log('Start Date:', startDate);
    console.log('End Date:', endDate);
    console.log('Technologies:', technologies);

    // Simpan informasi proyek dan nama gambar setelah di-upload
    const newProject = {
        inputProjectName,
        startDate,
        endDate,
        inputDescription,
        technologies: Array.isArray(technologies) ? technologies : [technologies],
        image: defaultImage // Gunakan gambar default
    };
    projects.push(newProject);
    res.redirect('/myProject');
});

// Route untuk delete project berdasarkan index
app.post('/delete-project/:index', (req, res) => {
    const { index } = req.params;
    if (index >= 0 && index < projects.length) {
        projects.splice(index, 1);
    }
    res.redirect('/myProject');
});

app.post('/updateProject/:index', (req, res) => {
    const { index } = req.params;
    const { inputProjectName, startDate, endDate, inputDescription, technologies } = req.body;

    if (index >= 0 && index < projects.length) {
        projects[index] = {
            inputProjectName,
            startDate,
            endDate,
            inputDescription,
            technologies: Array.isArray(technologies) ? technologies : [technologies],
            image: projects[index].image // Tetap gunakan gambar yang sudah ada
        };
    }
    res.redirect('/myproject');
});

// Start the server
app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`);
});
