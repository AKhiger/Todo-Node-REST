
import { createServer } from 'http';
import app from './App';

const PORT = 3000;

// Create an HTTP server and integrate the Express app
const server = createServer(app);

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});