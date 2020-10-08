# queue

![A queue of 5 people standing behind each other in a line.](https://github.com/unarmedguitar/queue/blob/master/img/queue.png)

This is a viewer game **queue** plugin developed for [TrovoBot](https://github.com/unarmedguitar/TrovoBot/). Now you can organise playing games with your friends and viewers in your [Trovo](https://trovo.live/) chat while you stream.

## Content
1. [Quick Install](#quick-install)
2. [Command](#command)
3. [Viewer Options](#viewer-options)
4. [Moderator Options](#moderator-options)
5. [Gettings Started](#getting-started)
6. [Reporting A Bug](#reporting-a-bug)
7. [License](#license)

## Quick Install
1. **Install** [TrovoBot](https://github.com/unarmedguitar/TrovoBot/)
2. **Download** [queue-master.zip](https://github.com/unarmedguitar/queue/archive/master.zip)
3. **Extract** *queue-master.zip* into your **TrovoBot/plugins/** folder.
4. **Rename** `queue-master` folder to `queue` inside your **TrovoBot/plugins/** folder.
    - Alternative [INSTALL](https://github.com/unarmedguitar/queue/blob/master/INSTALL.md) instructions in more details.

### Command
    !queue [OPTION [[@]user]]

#### Viewer Options
**These options can be invoked by *any* user including the streamer or the moderators of the channel:**
- **join** - Joins the queue.
- **leave** - Leaves the queue.
- **pos** - Shows your current position in the queue
- **list** - Displays everyone that is in the queue.
- **who** - Shows who is the next person in the queue.

#### Moderator Options
**These options can *only* be invoked by the streamer or moderators of the channel:**
- **open** - Opens the queue.
- **close** - Closes the queue.
- **next** - Call the next person in the queue.
- **clear** - Remove everyone from the queue.
- **add *@user*** - Adds *user* into the queue.
- **remove *@user*** - Removes *user* from the queue.
- **promote *@user*** - Promotes *user* to front of the queue.

## Getting Started
The queue is **closed** by default each time you *load* your TrovoBot. To start accepting viewers into the queue you must **open** the queue or **add *@users*** which streamers/moderataors can insert *users* into a closed queue.
- To **open** the queue: 
    - *Moderator:* `!queue open` 
    - *TrovoBot:* The queue is now open.
- To **join** the queue: 
    - *Viewer1:* `!queue join` 
    - *TrovoBot:* @Viewer1 is 1 in the queue.
- To see your **pos**ition the queue: 
    - *Viewer5:* `!queue pos` 
    - *TrovoBot:* @Viewer5 is 5 in the queue.
- To see **who** is next in the queue: 
    - *Viewer3:* `!queue who` 
    - *TrovoBot:* @Viewer1 is next in the queue. Please get ready.
- To get the **next** person in the queue: 
    - *Moderator:* `!queue next` 
    - *TrovoBot:* @Viewer1 you can now join in my game.
- To **leave** the queue: 
    - *Viewer5:* `!queue leave` 
    - *TrovoBot:* @Viewer5 has left the queue.
- To **add** a user to the queue: 
    - *Moderator:* `!queue add @Viewer6` 
    - *TrovoBot:* @Viewer6 is 4 in the queue.
- To **remove** a user from the queue: 
    - *Moderator:* `!queue remove @Viewer3` 
    - *TrovoBot:* @Viewer3 has been removed from the queue.
- To **list** everyone in the queue: 
    - *Viewer4:* `!queue list` 
    - *TrovoBot:* Queue: Viewer2, Viewer4, Viewer6
- To **promote** a viewer to the front of the queue: 
    - *Moderator:* `!queue promote @Viewer4` 
    - *TrovoBot:* @Viewer4 is now next in line.
- To **close** the queue: 
    - *Moderator:* `!queue open` 
    - *TrovoBot:* The queue has been closed.
- To **clear** the queue:
    - *Moderator:* `!queue clear`
    - *TrovoBot:* The queue is now empty.

## Reporting A Bug
Bugs are very annoying and can be found by anyone. You could have a unique case too, so it is very important to let the developer know.

### Before reporting a bug.
- Make sure you are running the latest version.
    - It is quite possible the bug was fixed in the newest version if you have not updated.
- Check to make sure the bug has not already been reported. Check all the opened [issues](issues).
    - If it has been reported you can subscribe to the issue to be notified and/or post any relevant information you may have on the bug.

## License
The queue plugin is licensed under the terms of the [![License](https://img.shields.io/badge/license-Apache--2.0-blue](https://opensource.org/licenses/Apache-2.0)
