const fs = require('fs');

// Функція для зчитування графу з файлу
function readGraphFromFile(filename) {
    const data = fs.readFileSync(filename, 'utf8');
    const lines = data.trim().split('\n');
    const vertices = parseInt(lines[0].split(' ')[0]);
    const edges = parseInt(lines[0].split(' ')[1]);

    let adjacencyList = Array.from({ length: vertices }, () => []);
    for (let i = 1; i <= edges; i++) {
        const [start, end] = lines[i].trim().split(' ').map(Number);
        adjacencyList[start - 1].push(end - 1); // Виправлення на індекси, які починаються з 0
        adjacencyList[end - 1].push(start - 1); // Додавання зворотнього ребра
    }

    return adjacencyList;
}

// Функція для обходу графу пошуком у ширину
function BFS(graph, startVertex) {
    let visited = Array(graph.length).fill(false);
    let queue = [];
    let protocol = [];

    queue.push(startVertex);

    while (queue.length) {
        let currentVertex = queue.shift();
        if (!visited[currentVertex]) {
            visited[currentVertex] = true;
            protocol.push({
                vertex: currentVertex + 1, // Відображення вершини в оригінальному форматі
                bfsNumber: protocol.length + 1,
                queueContents: [...queue]
            });
            for (let neighbor of graph[currentVertex]) {
                if (!visited[neighbor]) {
                    queue.push(neighbor);
                }
            }
        }
    }

    return protocol;
}

// Головна функція
function main() {
    const graph = readGraphFromFile('PDC.txt');
    const startVertex = 0; // Початкова вершина для обходу

    const protocol = BFS(graph, startVertex);

    console.log('Протокол обходу:');
    console.log('Вершина\tBFS-номер\tВміст черги');
    for (let entry of protocol) {
        console.log(`${entry.vertex}\t${entry.bfsNumber}\t\t${entry.queueContents.join(', ')}`);
    }
}

// Виклик головної функції
main();
