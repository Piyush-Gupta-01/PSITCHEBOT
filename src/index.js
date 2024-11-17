const express = require("express");
const cors = require("cors");
const { getStudentByRollNo } = require("./getStudentByRollNo");
const { getCoordinatorBySection } = require("./getCoordinatorBySection");
const { getFacultyByFacultyId } = require("./getFacultyByFacultyId");
const { getFacultyBySection } = require("./getFacultyBySection"); 

const app = express();


app.use(cors({
  origin: ['http://127.0.0.1:5500', 'http://localhost:5500']
}));
app.options('*', cors());


app.get('/student/:universityId', (req, res) => {
    let universityId = req.params.universityId;
    universityId = universityId.replace(/^:/, '');

    getStudentByRollNo(universityId)
        .then(stu => {
            console.log(stu);
            res.json(stu);    
        })
        .catch(err => {
            console.error('Error:', err);
            res.status(500).json({ error: 'Something went wrong' });
        });
});


app.get('/faculty/:section', (req, res) => {
  const section = req.params.section;

  getFacultyBySection(section)
      .then(facultyData => {
          if (!facultyData) {
              return res.status(404).json({ error: 'Section not found' });
          }
          res.json(facultyData);
      })
      .catch(err => {
          console.error('Error fetching faculty data:', err);
          res.status(500).json({ error: 'Internal server error' });
      });
});


app.get('/faculty/:employeeCode', (req, res) => {
  const employeeCode = req.params.employeeCode;
  const facultyData = getFacultyByEmployeeCode(employeeCode);
  
  if (facultyData) {
      res.json(facultyData);
  } else {
      res.status(404).send('Employee not found');
  }
});


app.listen(8000, () => {
    console.log("SERVER UP ON PORT :", 8000);
});