const fs = require('fs');
const path = require('path');

const Bot = require("../../modules/Bot.js");
const settings = require("./queue.json");

var data_path = path.join(__dirname, "data", "queue_store.json");

class Queue extends Array {
    constructor(...args) {
        super(...args);
        this._closed = true;
    }
    close() {
        return this._closed = true;
    }
    open() {
        this._closed = false;
        return true;
    }
    next() {
        return super.shift();
    }
    clear() {
        return super.splice(0);
    }
    add(user) {
        user = user.toLowerCase();
        if (!this.inQueue(user)) {
            super.push(user);
        }
        return this.position(user);
    }
    remove(user) {
        return this.leave(user);
    }
    promote(user) {
        let cur_len = this.length;
        let new_len = 0;
        if (this.inQueue(user)) {
            new_len = super.unshift(this.leave(user));
        }
        return new_len === cur_len;
    }
    enqueue(user) {
        if (this.isClosed()) {
            return -1;
        }
        user = user.toLowerCase();
        if (!this.inQueue(user)) {
            super.push(user);
        }
        return this.position(user);
    }
    leave(user) {
        let leaver = "Nobody";
        if (this.inQueue(user)) {
            leaver = super.splice(this.position(user), 1);
        }
        return leaver;
    }
    position(user) {
        return super.indexOf(user.toLowerCase());
    }
    list() {
        return super.join(", ");
    }
    who() {
        return this[0];
    }
    isClosed() {
        return this._closed;
    }
    isEmpty() {
        return this.length === 0;
    }
    inQueue(user) {
        return this.position(user) >= 0;
    }
}

function hasPermission(badges) {
    let permission = false;
    if (badges) {
        permission = /(cre|moder)ator/.test(badges.join(" "));
    }
    return permission;
}

function cleanUser(user) {
    return user.replace("@", "");
}

function sendMessage(client, msg, args = {}) {
    client.sendMessage(Bot.translate(msg, args));
}

function log(msg) {
    Bot.log(Bot.translate(msg));
}

var queue = null;
let adminCommands = ["close", "open", "next", "clear", "add", "remove", "promote"];
let userCommands = ["join", "leave", "pos", "list", "who"];
var commands = [...userCommands, ...adminCommands].join(", ");
var user = "";
var msg = "";
var len = 0;
var pos = 0;

module.exports = {
    name: "Queue",
    description: "A game queue system for TrovoBot",
    author: "unarmedguitar",
    license: "Apache-2.0",
    command: "queue",
    permissions: [],
    cooldown: 0,

    execute(client, data) {
        let is_permitted = hasPermission(data.badges);
        let editted = false;
        msg = "";
        len = 0;
        pos = 0;

        switch (data.args[0]) {
            case "close":
                if (is_permitted) {
                    if (queue.close()) {
                        msg = "The queue has been closed.";
                    }
                }
                break;
            case "open":
                if (is_permitted) {
                    if (queue.open()) {
                        msg = "The queue is now open.";
                    }
                }
                break;
            case "next":
                if (is_permitted) {
                    user = queue.next();
                    if (user === undefined) {
                        msg = "The queue is empty.";
                    } else {
                        msg = `@${user} you can now join my game.`
                        editted = true;
                    }
                }
                break;
            case "clear":
                if (is_permitted) {
                    len = queue.length;
                    if (queue.clear().length === len) {
                        msg = "The queue is now empty.";
                        fs.unlink(data_path, (err) => {
                            if (err) {
                                throw err;
                            }
                        });
                    }
                }
                break;
            case "add":
                if (is_permitted) {
                    if (data.args[1] === undefined) {
                        msg = `Usage: !${this.command} add @user`;
                    } else {
                        user = cleanUser(data.args[1]);
                        pos = queue.add(user);
                        msg = `@${user} is ${pos + 1} in the queue.`;
                        editted = true;
                    }
                }
                break;
            case "remove":
                if (is_permitted) {
                    if (data.args[1] === undefined) {
                        msg = `Usage !${this.command} remove @user`;
                    } else {
                        user = cleanUser(data.args[1]);
                        user = queue.remove(user);
                        msg = `@${user} has been removed.`;
                        editted = true;
                    }
                }
                break;
            case "pos":
            case "position":
                user = cleanUser(data.user);
                pos = queue.position(user);
                if (pos >= 0) {
                    msg = `@${user} is ${pos + 1} in the queue.`;
                } else {
                    msg = `@${user} is not in the queue.`;
                }
                break;
            case "promote":
                if (is_permitted) {
                    if (data.args[1] === undefined) {
                        msg = `Usage: !${this.command} promote @user`;
                    } else {
                        user = cleanUser(data.args[1]);
                        if (queue.promote(user)) {
                            msg = `${user} is now next in line.`
                            editted = true;
                        } else {
                            msg = `${user} is not in the queue.`;
                        }
                    }
                }
                break;
            case "join":
            case "enqueue":
                pos = queue.enqueue(data.user);
                if (pos >= 0) {
                    msg = `@${data.user} is ${pos + 1} in the queue.`;
                    editted = true;
                } else {
                    msg = "The queue is not open.";
                }
                break;
            case "leave":
                user = queue.leave(data.user);
                msg = `${user} has left the queue.`;
                editted = true;
                break;
            case "list":
                user = queue.list();
                if (!user) {
                    msg = "The queue is empty.";
                } else {
                    msg = `Queue: ${user}`;
                }
                break;
            case "who":
                user = queue.who();
                if (!user) {
                    msg = "The queue is empty.";
                } else {
                    msg = `@${user} is next. Please get ready.`;
                }
                break;
            case "help":
            default:
                msg = `Usage: !${this.command} <commands> - commands: ${commands}`;
                break;
        }
        if (msg) {
            sendMessage(client, msg);
        }
        if (editted) {
            fs.writeFile(data_path, JSON.stringify(queue), err => {
                if (err) {
                    throw err;
                }
            });
        }
    },
    activate() {
        fs.readFile(data_path, (err, data) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    fs.mkdir(path.dirname(data_path), { recursive: true }, (err) => {
                        if (err) {
                            throw err;
                        }
                    });
                }
            } else {
                queue = new Queue(...JSON.parse(data));
            }
        });
        if (!queue) {
            queue = new Queue();
        }
        log("plugins.queue.activated");
    },
    deactivate() {
        log("plugins.queue.deactivated");
    }
};