const readline = require("readline"),
    rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: true
    });
rl.on("close", function() {
    console.log("\nEnderHelper has been closed!");
    process.exit(0);
});
rl.on('SIGINT', () => {
    rl.question('Are you sure you want to exit? ', (answer) => {
        if (answer.match(/^y(es)?$/i)) rl.close();
    });
});
rl.pause();
module.exports = {
    ask: function(q, callback) {
        rl.question(`EnderHelper: ${q} `, callback);
    }
};