# (better) untis
untis is a web app that uses data from the official webuntis-api
it allows students to view the timetables of teachers and rooms, which is not possible in standard untis.
This works by retrieving each class and storing each lesson in a database. When a teacher or room is retrieved, the database is searched for and displays each lesson for it(s). On the backend, an express-server is used. In the frontend React + Tailwind
