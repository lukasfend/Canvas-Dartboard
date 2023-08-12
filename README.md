# Canvas-Dartboard

This is a simple dartboard in a canvas. Written in plain javascript class to copy and paste in anywhere you want.  


![Example](https://s20.directupload.net/images/230812/6c7zlnbm.png)

## Usage
Although the code should be quite simple and self explaining, here's a basic usage guide:

### Initiate a new dartboard
```javascript	
const dbr = new DartBoardRenderer(document.getElementById('canvas'));
```
Plase note that the canvas should be equal in height & width. The class offers an internal function `u` as well as `retr_u` to calculate a percentage of coordinates. (e.g. `dbr.u(50)` returns 50% of the canvas width as absolute coordinates, `retr_u` does the opposite).

### Render the dartboard
```javascript
dbr.render();
```
### Get the score when clicking on it
```javascript	
dbr.on_click = score => alert("Hit: " + score);
```
**Note:** The score is returned as string, prefixed by D or T if its a double or triple. Returns 0 if out of bounds.  
Examples: D25, 12, 0, T20, 25, T19 etc...

### Enable/disable hitmarkers & clear
```javascript
// Enable hit markers
dbr.mark_hits = true;

// Clear all the currently marked hits
dbr.clear_marks();
```

## Want to help?
Feel free to contribute if you got any improvements.  
Stuff that could be improved:
- Rotate the descriptive numbers so they are rotated towards the middle
- Add some configuration like colors etc.